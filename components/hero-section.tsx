"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowDown, Mail } from "lucide-react"
import { HeroBackground } from "@/components/hero-background"
import { SplitFlapDisplay } from "@/components/split-flap"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-[1]" />
      
      <div className="container relative z-10 px-4 md:px-6 pt-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-foreground/70 font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
              Digital Transformation Partner
            </span>
          </motion.div>

          {/* Split Flap Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <SplitFlapDisplay text="RCS" />
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            <span className="text-foreground">PROVIDING</span>
            <br />
            <span className="text-foreground/90">
              VALUABLE RESULTS<span className="text-foreground">.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 text-pretty leading-relaxed"
          >
            Ruang Cipta Solusi. We bring together strategy, 
            technology implementation, and deep domain expertise to drive transformation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <a
              href="mailto:ruangciptasolusi@gmail.com"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all hover:scale-105 glow-white"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-foreground/20 rounded-full font-medium hover:bg-foreground/5 hover:border-foreground/40 transition-all"
            >
              View Our Work
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 md:gap-20 w-full max-w-3xl"
          >
            {[
              { value: "79.5%", label: "Internet Penetration in Indonesia" },
              { value: "353M", label: "Active Mobile Connections" },
              { value: "44.2%", label: "E-Money Growth YoY" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-3xl md:text-5xl font-bold text-foreground mb-2" 
                  style={{ fontFamily: "var(--font-bebas-neue)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => scrollToSection("about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="w-6 h-12 rounded-full border border-foreground/20 flex items-start justify-center p-2">
            <span className="w-1 h-2 rounded-full bg-foreground/60" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  )
}
