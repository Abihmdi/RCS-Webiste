"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [showPreloader, setShowPreloader] = useState(false)
  const [isAnimationDone, setIsAnimationDone] = useState(false)

  useEffect(() => {
    // Check if the preloader has run in the current session
    const hasRun = sessionStorage.getItem("rcs_preloader_run")
    if (!hasRun) {
      setShowPreloader(true)
      // Block body scrolling during loading
      document.body.style.overflow = "hidden"

      // Trigger preloader fadeout after animations finish
      const timer = setTimeout(() => {
        handleAnimationComplete()
      }, 1800)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAnimationComplete = () => {
    setIsAnimationDone(true)
    sessionStorage.setItem("rcs_preloader_run", "true")
    document.body.style.overflow = "unset"
    setTimeout(() => {
      setShowPreloader(false)
    }, 800) // Fade out delay
  }

  if (!showPreloader) return null

  // Animation configurations matching Bebas Neue font styling
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 150, damping: 12 }
    }
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.8, type: "spring" as const, stiffness: 300, damping: 15 }
    }
  }

  return (
    <AnimatePresence>
      {!isAnimationDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -20,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
        >
          {/* Subtle background dot grid matching layout */}
          <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

          {/* Glowing background halo */}
          <div className="absolute w-[400px] h-[400px] bg-gradient-to-b from-[#ECFF8A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center justify-center gap-4 z-10">
            {/* Animated Logo matching header */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-baseline font-black tracking-[0.08em] select-none uppercase"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              <motion.span variants={letterVariants} className="text-[64px] sm:text-[80px] text-white">R</motion.span>
              <motion.span variants={letterVariants} className="text-[64px] sm:text-[80px] text-white">C</motion.span>
              <motion.span variants={letterVariants} className="text-[64px] sm:text-[80px] text-white">S</motion.span>
              <motion.span variants={dotVariants} className="text-[64px] sm:text-[80px] text-[#ECFF8A]">.</motion.span>
            </motion.div>

            {/* Sub-bar load status */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: 120, 
                opacity: 0.7,
                transition: { duration: 1.3, ease: "easeInOut" }
              }}
              className="h-[1.5px] bg-[#ECFF8A]/85 rounded-full"
            />

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[9px] font-mono tracking-[0.2em] text-[#949494] uppercase select-none"
            >
              Initializing Systems
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
