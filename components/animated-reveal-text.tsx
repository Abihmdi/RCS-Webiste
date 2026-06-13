"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-context"

interface HighlightTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  textClassName?: string
  highlightClassName?: string
  duration?: number
  highlightColor?: string
  ease?: "easeIn" | "easeOut" | "easeInOut" | "linear"
}

const HighlightText = React.forwardRef<HTMLDivElement, HighlightTextProps>(
  ({
    text,
    as: Component = "h1",
    className,
    textClassName,
    highlightClassName,
    duration = 1.2,
    highlightColor = "#ECFF8A", // Lime Green brand accent color
    ease = "easeInOut",
    ...props
  }, ref) => {
    const internalRef = React.useRef(null)
    const isInView = useInView(internalRef, { once: true, amount: 0.3 })

    return (
      <div 
        ref={ref}
        className={cn("text-center flex justify-center w-full select-none", className)} 
        {...props}
      >
        <Component 
          ref={internalRef}
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.3] tracking-tight max-w-4xl text-center",
            textClassName
          )}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <motion.span
            className={cn(
              "relative inline-block py-[8px] px-[16px] sm:py-[12px] sm:px-[24px] rounded-[16px]",
              "text-black dark:text-black font-black shadow-lg",
              highlightClassName
            )}
            initial={{
              clipPath: "inset(0% 100% 0% 0%)",
              backgroundColor: highlightColor
            }}
            animate={isInView ? {
              clipPath: "inset(0% 0% 0% 0%)",
            } : {
              clipPath: "inset(0% 100% 0% 0%)",
            }}
            transition={{
              duration,
              ease
            }}
          >
            {text}
          </motion.span>
        </Component>
      </div>
    )
  }
)
HighlightText.displayName = "HighlightText"

const content = {
  en: {
    badge: "Digital Transformation Partner",
    tagline: "Ruang Cipta Solusi"
  },
  id: {
    badge: "Digital Transformation Partner",
    tagline: "Ruang Cipta Solusi"
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
      className="relative w-full py-28 md:py-36 overflow-hidden bg-black flex flex-col items-center justify-center border-t border-[#141414]"
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

      <div className="w-full max-w-5xl px-6 flex flex-col items-center justify-center gap-6 relative z-10">
        
        {/* Section Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-pill"
        >
          <span className="section-pill-dot" />
          <span className="text-xs font-semibold tracking-widest">{translation.badge}</span>
        </motion.div>

        {/* Animated Highlight Text Reveal */}
        <HighlightText 
          text={translation.tagline} 
          className="mt-2"
        />

      </div>

      {/* Gradients for smooth section transitions */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
