"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram, ArrowUp, Mail, MapPin, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-context"

const footerLinks = {
  services: [
    { label: "Technology Modernization", href: "#services" },
    { label: "Data Analysis", href: "#services" },
    { label: "Product Innovation", href: "#services" },
    { label: "Infrastructure", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Portfolio", href: "#portfolio" },
  ],
}

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/company/ruangciptasolusi", label: "LinkedIn", color: "#0077B5" },
  { icon: Instagram, href: "https://instagram.com/ruangciptasolusi", label: "Instagram", color: "#E1306C" },
]

export function Footer() {
  const { t } = useLanguage()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative pt-20 border-t border-border/80 overflow-hidden bg-background">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      {/* Ambient glowing orbs */}
      <div className="orb w-80 h-80 bg-[#FFFFFF]/4 -bottom-20 -left-20" />
      <div className="orb w-80 h-80 bg-[#C3E633]/4 -top-20 -right-20" />

      <div className="container relative mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-16 items-start">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            {/* Font-only logo */}
            <div className="flex items-center">
              <span
                className="text-2xl font-black tracking-widest text-white leading-none"
                style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.12em" }}
              >
                RCS<span className="text-[#C3E633]">.</span>
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {t("footer_tagline")}
            </p>
            
            <p className="text-[10px] text-muted-foreground/60 leading-normal max-w-sm">
              Komplek Bank Niaga No 38, Pejaten Barat, Pasar Minggu, Jakarta Selatan
            </p>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <div className="text-[10px] font-mono text-foreground mb-4 uppercase tracking-widest font-bold">Services</div>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href}
                    whileHover={{ x: 2 }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block font-sans"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <div className="text-[10px] font-mono text-foreground mb-4 uppercase tracking-widest font-bold">Company</div>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href}
                    whileHover={{ x: 2 }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block font-sans"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* IDE Bottom Status Bar Mockup */}
        <div className="min-h-12 py-4 sm:py-0 border-t border-border/70 bg-[#0a0a0a]/60 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 text-[10px] font-mono text-muted-foreground -mx-4 sm:-mx-0 rounded-t-xl relative z-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5">
            <span>&copy; {new Date().getFullYear()} PT Ruang Cipta Solusi. {t("footer_rights")}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Ready</span>
            </span>
            <span className="text-muted-foreground/40">|</span>
            <a 
              href="mailto:ruangciptasolusi@gmail.com" 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Mail size={10} />
              ruangciptasolusi@gmail.com
            </a>
            <span className="text-muted-foreground/40">|</span>
            <div className="flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-110 active:scale-95 opacity-85 hover:opacity-100"
                  style={{ color: social.color }}
                  aria-label={social.label}
                >
                  <social.icon size={13} />
                </a>
              ))}
            </div>
            <span className="text-muted-foreground/40">|</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowUp size={11} className="text-[#C3E633]" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
