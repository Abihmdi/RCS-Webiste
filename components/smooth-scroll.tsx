"use client"

import React, { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // physics-based easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 1.2, // optimized for touch swipe responsiveness
      infinite: false,
    })

    // Scroll update loop (requestAnimationFrame binds to device refresh rate, e.g. 120/144Hz)
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Intercept anchor hash navigation for physics-based scroll transitions
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetEl = document.getElementById(href.substring(1))
        if (targetEl) {
          lenis.scrollTo(targetEl, {
            offset: -110, // offset navigation header height
            duration: 1.1,
          })
        }
      } else if (href && href.startsWith("/#")) {
        const hash = href.substring(2)
        const targetEl = document.getElementById(hash)
        if (targetEl) {
          e.preventDefault()
          lenis.scrollTo(targetEl, {
            offset: -110,
            duration: 1.1,
          })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
