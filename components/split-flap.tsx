"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SplitFlapCharacterProps {
  char: string
  delay?: number
}

function SplitFlapCharacter({ char, delay = 0 }: SplitFlapCharacterProps) {
  const [displayChar, setDisplayChar] = useState(" ")
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
    let currentIndex = 0
    const targetIndex = chars.indexOf(char.toUpperCase())
    
    if (targetIndex === -1) {
      setDisplayChar(char)
      return
    }

    const flipInterval = setInterval(() => {
      if (currentIndex <= targetIndex) {
        setIsFlipping(true)
        setDisplayChar(chars[currentIndex])
        currentIndex++
      } else {
        clearInterval(flipInterval)
        setIsFlipping(false)
      }
    }, 50)

    const startDelay = setTimeout(() => {
      // Animation starts after delay
    }, delay)

    return () => {
      clearInterval(flipInterval)
      clearTimeout(startDelay)
    }
  }, [char, delay])

  return (
    <div className="relative inline-block w-[0.8em] h-[1.2em] mx-[2px]">
      <div
        className={`
          absolute inset-0 bg-card rounded-sm
          flex items-center justify-center
          font-mono font-bold text-foreground
          border border-foreground/10
          ${isFlipping ? "animate-pulse" : ""}
        `}
        style={{ 
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.3)",
          perspective: "1000px"
        }}
      >
        <span className="relative z-10">{displayChar}</span>
        {/* Center line */}
        <div className="absolute left-0 right-0 h-[1px] top-1/2 bg-background/20" />
      </div>
    </div>
  )
}

interface SplitFlapDisplayProps {
  text: string
  className?: string
}

export function SplitFlapDisplay({ text, className = "" }: SplitFlapDisplayProps) {
  return (
    <div className={`flex flex-wrap justify-center text-7xl md:text-9xl lg:text-[10rem] ${className}`}>
      {text.split("").map((char, index) => (
        <SplitFlapCharacter key={index} char={char} delay={index * 80} />
      ))}
    </div>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const words = text.split(" ")

  return (
    <motion.span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                ease: "easeOut"
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  )
}

const headlines = [
  "DIGITAL TRANSFORMATION",
  "WEB DEVELOPMENT",
  "MOBILE SOLUTIONS",
  "ENTERPRISE SOFTWARE",
]

export function RotatingHeadline() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[1.5em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="block gradient-text"
        >
          {headlines[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
