"use client"

import React, { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize Lenis on desktop/non-touch devices to ensure native, smooth 120Hz scrolling on mobile
    const isTouchDevice = 
      typeof window !== "undefined" && 
      (window.matchMedia("(pointer: coarse)").matches || 
       "ontouchstart" in window || 
       navigator.maxTouchPoints > 0)

    if (isTouchDevice) {
      // Intercept anchor clicks on mobile/touch for native smooth scroll behavior
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const anchor = target.closest("a")
        if (!anchor) return

        const href = anchor.getAttribute("href")
        if (href && href.startsWith("#")) {
          e.preventDefault()
          const targetEl = document.getElementById(href.substring(1))
          if (targetEl) {
            const offset = 110
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = targetEl.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })
          }
        } else if (href && href.startsWith("/#")) {
          const hash = href.substring(2)
          const targetEl = document.getElementById(hash)
          if (targetEl) {
            e.preventDefault()
            const offset = 110
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = targetEl.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })
          }
        }
      }

      document.addEventListener("click", handleAnchorClick)
      return () => {
        document.removeEventListener("click", handleAnchorClick)
      }
    }

    // Initialize Lenis smooth scroll for desktop
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // physics-based easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 1.2, 
      infinite: false,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

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
            offset: -110,
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
