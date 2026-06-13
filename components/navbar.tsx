"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/components/language-context"

export function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [isOpen, setIsOpen]               = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  // Dark mode is default, light mode completely disabled.
  useEffect(() => {
    document.documentElement.classList.remove("light")
  }, [])

  const navLinks = [
    { href: "#home",      label: t("nav_home") },
    { href: "#about",     label: t("nav_about") },
    { href: "#services",  label: t("nav_services") },
    { href: "#team",      label: t("nav_team") },
    { href: "#portfolio", label: t("nav_portfolio") },
    { href: "#contact",   label: t("nav_contact") },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ["home", "about", "services", "team", "portfolio", "contact"]
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const targetId = href.replace("#", "")
    window.history.pushState(null, "", href)
    setTimeout(() => {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }, 50)
  }

  return (
    <>
      {/* Outer wrapper — centers the floating bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`pointer-events-auto mt-4 mx-4 w-full max-w-[900px] rounded-lg transition-all duration-500 ${
            scrolled
              ? "bg-black border border-white/10 md:glass-strong"
              : "bg-transparent border border-transparent"
          }`}
        >
          <nav className="flex items-center justify-between h-[52px] px-4 md:px-5">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center shrink-0 select-none transition-opacity hover:opacity-70"
            >
              <span
                className="text-[22px] font-black text-white leading-none tracking-[0.08em]"
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                RCS<span className="text-accent">.</span>
              </span>
            </a>

            {/* Desktop nav links — centered */}
            <div className="hidden md:flex items-center gap-0 lg:gap-0.5 justify-center flex-grow mx-2 lg:mx-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-2 lg:px-3 py-1.5 text-[11px] lg:text-[13px] font-medium tracking-[-0.011em] rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-[#f3f3f3]"
                        : "text-[#949494] hover:text-[#f3f3f3]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-[#242424]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                )
              })}
            </div>

            {/* Right: Lang toggle + CTA */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5 shrink-0">

              {/* Language toggle */}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "id" : "en")}
                className="flex items-center h-8 text-[11px] font-mono font-bold tracking-wide rounded-lg overflow-hidden border border-border hover:border-muted-foreground/40 transition-colors"
                aria-label="Toggle language"
              >
                <span className={`px-2.5 h-full flex items-center transition-all duration-200 ${lang === "en" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>EN</span>
                <span className={`px-2.5 h-full flex items-center transition-all duration-200 ${lang === "id" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>ID</span>
              </button>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="text-[11px] lg:text-[13px] font-bold tracking-[-0.011em] px-2.5 lg:px-4 rounded-lg bg-accent text-accent-foreground hover:bg-[#f2ffa2] hover:text-accent-foreground transition-colors flex items-center gap-1 lg:gap-1.5 h-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ECFF8A]" />
                {t("nav_get_started")}
              </a>
            </div>

            {/* Hamburger — mobile */}
            <button
              type="button"
              className="md:hidden p-2 text-[#f3f3f3]/80 hover:text-[#f3f3f3] transition-colors active:scale-95 bg-black border border-white/10 rounded-lg flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </motion.header>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
          style={{ background: "rgba(16,16,16,0.98)", backdropFilter: "blur(20px)" }}
        >
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(231,197,154,0.04), transparent)", filter: "blur(60px)" }}
          />

          <nav className="flex flex-col items-center gap-5 z-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[28px] font-black tracking-widest transition-colors cursor-pointer ${
                  activeSection === link.href.slice(1) ? "text-[#f3f3f3]" : "text-[#949494] hover:text-[#f3f3f3]"
                }`}
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile toggles container */}
            <div className="flex items-center gap-3 mt-3">
              {/* Mobile lang toggle */}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "id" : "en")}
                className="flex items-center text-sm font-mono font-bold tracking-wider rounded-lg overflow-hidden border border-border"
              >
                <span className={`px-5 py-2 transition-colors ${lang === "en" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>EN</span>
                <span className={`px-5 py-2 transition-colors ${lang === "id" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>ID</span>
              </button>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="mt-3 text-[13px] font-bold tracking-[-0.011em] px-8 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-[#f2ffa2] hover:text-accent-foreground transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ECFF8A]" />
              {t("nav_get_started")}
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
