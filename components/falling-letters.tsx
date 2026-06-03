"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Letter {
  id: number
  char: string
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  colorClass: string
}

export function FallingLetters() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [letters, setLetters] = useState<Letter[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const chars = ["R", "C", "S"]
    const colors = [
      "text-foreground/45", 
      "text-[#C3E633]/25", 
      "text-[#FFFFFF]/25", 
      "text-muted-foreground/30"
    ]
    const newLetters: Letter[] = []
    let id = 0

    // Create streams of letters - optimized from 30x15 down to 8x4 to save performance
    const numStreams = 8
    const lettersPerStream = 4

    for (let s = 0; s < numStreams; s++) {
      const streamX = (s / numStreams) * dimensions.width * 1.5 - dimensions.width * 0.25
      
      for (let i = 0; i < lettersPerStream; i++) {
        const progress = i / lettersPerStream
        
        // Diagonal positioning
        const x = streamX + progress * dimensions.width * 0.4 + (Math.random() - 0.5) * 80
        const y = progress * dimensions.height * 1.2 - dimensions.height * 0.1 + (Math.random() - 0.5) * 60

        if (x > -100 && x < dimensions.width + 100 && y > -100 && y < dimensions.height + 100) {
          // Calculate opacity based on position
          const centerX = dimensions.width / 2
          const centerY = dimensions.height / 2
          const distFromCenter = Math.sqrt(
            Math.pow((x - centerX) / dimensions.width, 2) + 
            Math.pow((y - centerY) / dimensions.height, 2)
          )
          const baseOpacity = 0.15 + (1 - distFromCenter) * 0.6

          newLetters.push({
            id: id++,
            char: chars[Math.floor(Math.random() * chars.length)],
            x,
            y,
            size: 16 + Math.random() * 24,
            opacity: Math.max(0.1, Math.min(0.8, baseOpacity + Math.random() * 0.15)),
            duration: 4 + Math.random() * 5,
            delay: Math.random() * 5,
            colorClass: colors[Math.floor(Math.random() * colors.length)],
          })
        }
      }
    }

    setLetters(newLetters)
  }, [dimensions])

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-background">
      {/* Self-contained CSS for hardware-accelerated animations */}
      <style>{`
        @keyframes customFall {
          0% {
            opacity: 0;
            transform: translate3d(0, -50px, 0);
          }
          10% {
            opacity: var(--letter-opacity);
          }
          75% {
            opacity: var(--letter-opacity);
            transform: translate3d(0, 50px, 0);
          }
          85%, 100% {
            opacity: 0;
            transform: translate3d(0, 100px, 0);
          }
        }
        .falling-letter-node {
          animation: customFall var(--fall-duration) linear infinite;
          animation-delay: var(--fall-delay);
          will-change: transform, opacity;
        }
      `}</style>

      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
      <div ref={containerRef} className="absolute inset-0">
        {letters.map((letter) => (
          <span
            key={letter.id}
            className={`absolute font-mono font-semibold select-none pointer-events-none falling-letter-node ${letter.colorClass}`}
            style={{
              fontSize: letter.size,
              left: letter.x,
              top: letter.y,
              "--letter-opacity": letter.opacity,
              "--fall-duration": `${letter.duration}s`,
              "--fall-delay": `${letter.delay}s`,
            } as React.CSSProperties}
          >
            {letter.char}
          </span>
        ))}
      </div>
      
      {/* Central text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 
            className="font-bold text-foreground tracking-widest text-7xl md:text-9xl lg:text-[12rem] glow-text"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            RCS
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground font-mono tracking-wider">
            Ruang Cipta Solusi
          </p>
        </motion.div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
    </section>
  )
}

