"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { HeroBackground } from "@/components/hero-background"
import { useLanguage } from "@/components/language-context"

const commands = [
  "rcs init --project-solutions",
  "rcs deploy --domain ruangciptasolusi.com",
  "rcs run data-analysis --model=ai",
  "rcs optimize --performance",
  "rcs status --check-systems",
]

export function HeroSection() {
  const { t } = useLanguage()
  const [commandIdx, setCommandIdx] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter
  useEffect(() => {
    let timer: NodeJS.Timeout
    const full = commands[commandIdx]

    if (isDeleting) {
      timer = setTimeout(() => setTypedText(full.substring(0, typedText.length - 1)), 40)
    } else {
      timer = setTimeout(() => setTypedText(full.substring(0, typedText.length + 1)), 80)
    }

    if (!isDeleting && typedText === full) {
      timer = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false)
      setCommandIdx((prev) => (prev + 1) % commands.length)
    }

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, commandIdx])

  // Stagger animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <HeroBackground />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-25 z-[1] pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-[2] pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 px-5 md:px-6 pt-28 pb-20 max-w-5xl"
      >
        <div className="grid md:grid-cols-10 gap-8 items-center">

          {/* Left — Text + CTA (span 6) */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">

            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white/60 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="beacon-ping absolute inline-flex h-full w-full rounded-full bg-[#C3E633] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C3E633]" />
                </span>
                {t("hero_pill")}
              </span>
            </motion.div>

            {/* Heading — BIG */}
            <motion.h1
              variants={fadeUp}
              className="text-[52px] sm:text-[68px] md:text-[80px] lg:text-[96px] xl:text-[110px] font-black tracking-tight leading-[0.92] mb-7"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              <span className="text-white">{t("hero_heading_1")}</span>
              <br />
              <span className="shimmer-text">{t("hero_heading_accent")}</span>
              <br />
              <span className="text-white">{t("hero_heading_2")}</span>
              <span className="text-white/25">.</span>
            </motion.h1>

            {/* Sub-description — bumped to 16px */}
            <motion.p
              variants={fadeUp}
              className="text-[15px] md:text-[17px] text-white/45 max-w-lg mb-10 leading-[1.7] font-normal"
            >
              {t("hero_description")}
            </motion.p>

            {/* Command bar */}
            <motion.div
              variants={fadeUp}
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
              className="w-full max-w-lg bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 flex items-center justify-between mb-9 group hover:border-white/[0.12] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-white/25 font-mono text-sm shrink-0">$</span>
                <span className="text-sm font-mono text-white/80 font-medium truncate">
                  {typedText}
                  <span className="animate-pulse text-[#C3E633] select-none ml-0.5">▎</span>
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/20 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded shrink-0">
                ⌘K
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <a
                href="mailto:ruangciptasolusi@gmail.com"
                className="inline-flex items-center justify-center gap-2.5 text-[14px] font-semibold px-7 py-3 rounded-xl bg-[#C3E633] text-black hover:bg-[#d4f044] transition-all hover:shadow-[0_0_30px_rgba(195,230,51,0.25)] active:scale-[0.97]"
              >
                {t("hero_cta_primary")}
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2.5 text-[14px] font-medium px-7 py-3 rounded-xl bg-white/[0.04] text-white/70 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all active:scale-[0.97]"
              >
                <Play className="w-3.5 h-3.5 text-[#C3E633]" />
                {t("hero_cta_secondary")}
              </a>
            </motion.div>
          </div>

          {/* Right — 3D space (span 4) */}
          <div className="hidden md:block md:col-span-4 h-64 pointer-events-none" />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 group cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center pt-1.5 group-hover:border-white/30 transition-colors">
            <motion.span
              className="w-1 h-2 rounded-full bg-[#C3E633]"
            />
          </span>
        </motion.a>
      </motion.div>
    </section>
  )
}
