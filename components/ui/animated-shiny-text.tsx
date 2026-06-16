"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  children?: React.ReactNode
  gradientColors?: string
  gradientAnimationDuration?: number
  hoverEffect?: boolean
  className?: string
  textClassName?: string
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      children,
      gradientColors = "linear-gradient(90deg, #000, #fff, #000)",
      gradientAnimationDuration = 1,
      hoverEffect = false,
      className,
      textClassName,
      style,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn("flex justify-center items-center py-2", className)}
        {...props}
      >
        <h1
          className={cn(
            "text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-normal shimmer-bg",
            textClassName
          )}
          style={{
            ...style,
            background: gradientColors,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: isHovered ? "0 0 8px rgba(255,255,255,0.3)" : "none",
            animationDuration: `${gradientAnimationDuration}s`,
          }}
          onMouseEnter={() => hoverEffect && setIsHovered(true)}
          onMouseLeave={() => hoverEffect && setIsHovered(false)}
        >
          {children || text}
        </h1>
      </div>
    )
  }
)

AnimatedText.displayName = "AnimatedText"

export { AnimatedText }
