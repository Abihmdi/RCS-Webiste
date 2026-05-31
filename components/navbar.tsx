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
          className={`pointer-events-auto mt-4 mx-4 w-full max-w-[900px] rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-[#141415]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              : "bg-white/[0.03] backdrop-blur-md border border-white/[0.04]"
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
                RCS<span className="text-[#C3E633]">.</span>
              </span>
            </a>

            {/* Desktop nav links — centered */}
            <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3 py-1.5 text-[14px] rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-white font-medium"
                        : "text-white/45 hover:text-white/80 font-normal"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                )
              })}
            </div>

            {/* Right: Lang toggle + CTA */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              {/* Language toggle */}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "id" : "en")}
                className="flex items-center text-[11px] font-mono font-bold tracking-wide rounded-lg overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-colors"
                aria-label="Toggle language"
              >
                <span className={`px-2 py-1 transition-all duration-200 ${lang === "en" ? "bg-[#C3E633] text-black" : "text-white/35"}`}>EN</span>
                <span className={`px-2 py-1 transition-all duration-200 ${lang === "id" ? "bg-[#C3E633] text-black" : "text-white/35"}`}>ID</span>
              </button>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="text-[13px] font-medium px-4 py-1.5 rounded-lg bg-[#C3E633] text-black hover:bg-[#d4f044] transition-colors"
              >
                {t("nav_get_started")}
              </a>
            </div>

            {/* Hamburger — mobile */}
            <button
              type="button"
              className="md:hidden p-1.5 text-white/60 hover:text-white transition-colors active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </motion.header>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
          style={{ background: "rgba(8,8,9,0.97)", backdropFilter: "blur(20px)" }}
        >
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(195,230,51,0.06), transparent)", filter: "blur(60px)" }}
          />

          <nav className="flex flex-col items-center gap-5 z-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[28px] font-black tracking-widest transition-colors cursor-pointer ${
                  activeSection === link.href.slice(1) ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile lang toggle */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "id" : "en")}
              className="flex items-center text-sm font-mono font-bold tracking-wider rounded-xl overflow-hidden border border-white/10 mt-3"
            >
              <span className={`px-5 py-2.5 transition-colors ${lang === "en" ? "bg-[#C3E633] text-black" : "text-white/35"}`}>EN</span>
              <span className={`px-5 py-2.5 transition-colors ${lang === "id" ? "bg-[#C3E633] text-black" : "text-white/35"}`}>ID</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="mt-3 text-[15px] font-medium px-8 py-2.5 rounded-xl bg-[#C3E633] text-black hover:bg-[#d4f044] transition-colors"
            >
              {t("nav_get_started")} →
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
