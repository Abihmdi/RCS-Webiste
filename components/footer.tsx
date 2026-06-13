"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram, ArrowUp, Mail, MapPin, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-context"

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/company/ruangciptasolusi", label: "LinkedIn", color: "#0A66C2" },
  { icon: Instagram, href: "https://instagram.com/ruangciptasolusi", label: "Instagram", color: "#E1306C" },
]

export function Footer() {
  const { t } = useLanguage()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative pt-6 overflow-hidden bg-background">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      {/* Ambient glowing orbs */}
      <div className="orb w-80 h-80 bg-[#FFFFFF]/4 -bottom-20 -left-20" />
      <div className="orb w-80 h-80 bg-[#ECFF8A]/4 -top-20 -right-20" />

      <div className="container relative mx-auto px-4 max-w-5xl">
        {/* IDE Bottom Status Bar Mockup */}
        <div className="min-h-12 py-4 sm:py-0 border-t border-white/10 bg-[#0a0a0a]/60 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 text-[10px] font-mono text-muted-foreground -mx-4 sm:-mx-0 rounded-t-xl relative z-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5">
            <span
              className="text-[13px] font-black tracking-[0.08em] text-white leading-none flex items-center select-none"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              RCS<span className="text-accent">.</span>
            </span>
            <span>&copy; {new Date().getFullYear()} PT Ruang Cipta Solusi. {t("footer_rights")}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Ready</span>
            </span>
            <span className="text-muted-foreground/70">|</span>
            <a 
              href="mailto:ruangciptasolusi@gmail.com" 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Mail size={10} />
              ruangciptasolusi@gmail.com
            </a>
            <span className="text-muted-foreground/70">|</span>
            <div className="flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
                  style={{ color: social.color }}
                  aria-label={social.label}
                >
                  <social.icon size={13} />
                </a>
              ))}
            </div>
            <span className="text-muted-foreground/70">|</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowUp size={11} className="text-[#ECFF8A]" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
