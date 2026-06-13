"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-context"
import { AnimatedText } from "@/components/ui/animated-shiny-text"

const content = {
  en: {
    badge: "Digital Transformation Partner",
    tagline: "RCS"
  },
  id: {
    badge: "Digital Transformation Partner",
    tagline: "RCS"
  }
}

export function AnimatedRevealText() {
  const { lang } = useLanguage()
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const currentLang = (lang === "en" || lang === "id") ? lang : "en"
  const translation = content[currentLang]

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full py-5 md:py-6 overflow-hidden bg-black flex flex-col items-center justify-center border-t border-[#141414]"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      {/* Static ambient gradient glowing halo */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#ECFF8A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Interactive mouse-move spotlight glow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full blur-[100px] transition-opacity duration-300"
          style={{
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(236, 255, 138, 0.08) 0%, transparent 70%)",
            left: `${mousePosition.x - 175}px`,
            top: `${mousePosition.y - 175}px`,
          }}
        />
      )}

      <div className="w-full max-w-5xl px-6 flex flex-col items-center justify-center gap-2 md:gap-3 relative z-10">
        
        {/* Section Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-pill animate-fade-in"
        >
          <span className="section-pill-dot" />
          <span className="text-xs font-semibold tracking-widest">{translation.badge}</span>
        </motion.div>

        {/* Animated Shiny Text */}
        <AnimatedText 
          gradientColors="linear-gradient(90deg, #18181b, #ffffff, #18181b)" // A gorgeous shiny metallic look on black background!
          hoverEffect={true}
          textClassName="font-black tracking-[0.08em] uppercase select-none flex items-baseline justify-center"
          style={{ fontFamily: "var(--font-display)" }} // Use Bebas Neue display font
        >
          <span>{translation.tagline}</span>
          <span className="text-accent" style={{ background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "var(--accent)", color: "var(--accent)" }}>.</span>
        </AnimatedText>

      </div>

      {/* Gradients for smooth section transitions */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
