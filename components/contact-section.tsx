"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Send, Terminal as TermIcon, ArrowRight, Copy, Compass } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-context"

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

export function ContactSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  
  const [logs, setLogs] = useState<string[]>([
    "RCS Terminal Console active. Ready for messaging.",
    "Submit the form below or trigger quick shortcuts."
  ])
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`])
  }

  // Handle system logging events from command palette
  useEffect(() => {
    const handleLogEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        addLog(customEvent.detail)
      }
    }
    const handleClearEvent = () => {
      setLogs(["Console cleared."])
    }
    
    window.addEventListener("console-log", handleLogEvent)
    window.addEventListener("console-clear", handleClearEvent)
    
    return () => {
      window.removeEventListener("console-log", handleLogEvent)
      window.removeEventListener("console-clear", handleClearEvent)
    }
  }, [])

  // Keyboard shortcuts (Alt+M to copy email, Alt+L to open map, Cmd/Ctrl+Enter to send message)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + M (Copy Email)
      if (e.altKey && e.key.toLowerCase() === "m") {
        e.preventDefault()
        handleCopyEmail()
      }
      
      // Alt + L (Office Map)
      if (e.altKey && e.key.toLowerCase() === "l") {
        e.preventDefault()
        addLog("[LOCATION] Launching Google Maps for Pejaten office.")
        window.open("https://maps.google.com/?q=Pejaten+Barat+Pasar+Minggu+Jakarta+Selatan", "_blank")
      }

      // Cmd/Ctrl + Enter (Send Message)
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        const isFormFocused = document.activeElement && 
          (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")
        if (isFormFocused) {
          e.preventDefault()
          handleSubmit(new Event("submit") as any)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [formData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCopyEmail = () => {
    const email = "ruangciptasolusi@gmail.com"
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
      addLog("[COPY] Email PT Ruang Cipta Solusi copied to clipboard.")
    } else {
      const tempInput = document.createElement("input")
      tempInput.value = email
      document.body.appendChild(tempInput)
      tempInput.select()
      try {
        document.execCommand("copy")
        addLog("[COPY] Email PT Ruang Cipta Solusi copied (fallback).")
      } catch (err) {
        addLog("[ERROR] Failed to copy. Manual copy: " + email)
      }
      document.body.removeChild(tempInput)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    addLog("[INQUIRY] Initializing form submission process...")
    
    setTimeout(() => {
      addLog("[VALIDATION] Checking fields: Name, Email, Details... Passed.")
      addLog("[COMPILE] Packaging inquiry schema to payload...")
      
      // Create mailto link with form data
      const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
      )
      
      addLog("[LAUNCH] Launching client mail application...")
      window.location.href = `mailto:ruangciptasolusi@gmail.com?subject=${subject}&body=${body}`
      
      setIsSubmitting(false)
      addLog("[SUCCESS] Form submission redirected successfully.")
    }, 1000)
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Ambient glowing orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#FFFFFF]/3 top-1/4 -left-20" />
      <div className="orb w-[500px] h-[500px] bg-[#ECFF8A]/3 bottom-1/4 -right-20" />

      <div ref={ref} className="container relative mx-auto px-4 max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <div className="mb-4">
            <span className="section-pill">
              <span className="section-pill-dot" />
              {t("contact_pill")}
            </span>
          </div>

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            {t("contact_heading_1")} <span className="gradient-text">{t("contact_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance mx-auto md:mx-0">
            {t("contact_description")}
          </p>
        </motion.div>

        {/* Raycast Command Form Launcher Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass noise rounded-2xl border border-border/80 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:grid md:grid-cols-10"
        >
          {/* Header Row - Col span 10 */}
          <div className="col-span-10 h-12 border-b border-border/70 flex items-center justify-between px-4 bg-secondary/30 relative z-20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            <div className="text-[11px] font-mono text-muted-foreground font-medium tracking-wide">
              rcs-contact-palette -- Create Inquiry
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Form Area Left Column (Col span 7) */}
          <div className="col-span-7 p-6 border-b md:border-b-0 md:border-r border-border/70 bg-[#0d0d0e]/60">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-[10px] font-mono text-muted-foreground mb-2 tracking-wider uppercase font-semibold"
                  >
                    {t("contact_name_label")} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t("contact_name_placeholder")}
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary/40 border-border/80 focus:border-[#ECFF8A]/65 focus:ring-2 focus:ring-[#ECFF8A]/15 text-foreground font-sans rounded-xl h-10 placeholder:text-muted-foreground/35 transition-all duration-300"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-[10px] font-mono text-muted-foreground mb-2 tracking-wider uppercase font-semibold"
                  >
                    {t("contact_email_label")} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("contact_email_placeholder")}
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary/40 border-border/80 focus:border-[#ECFF8A]/65 focus:ring-2 focus:ring-[#ECFF8A]/15 text-foreground font-sans rounded-xl h-10 placeholder:text-muted-foreground/35 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="company" 
                  className="block text-[10px] font-mono text-muted-foreground mb-2 tracking-wider uppercase font-semibold"
                >
                  {t("contact_company_label")}
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder={t("contact_company_placeholder")}
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-secondary/40 border-border/80 focus:border-[#ECFF8A]/65 focus:ring-2 focus:ring-[#ECFF8A]/15 text-foreground font-sans rounded-xl h-10 placeholder:text-muted-foreground/35 transition-all duration-300"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-[10px] font-mono text-muted-foreground mb-2 tracking-wider uppercase font-semibold"
                >
                  {t("contact_message_label")} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder={t("contact_message_placeholder")}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-secondary/40 border border-border/80 px-3.5 py-3 text-xs placeholder:text-muted-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#ECFF8A]/15 focus:border-[#ECFF8A]/65 text-foreground font-sans transition-all duration-300 resize-none h-28"
                />
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-brand py-3 flex items-center justify-center font-mono font-semibold tracking-wider text-xs cursor-pointer disabled:opacity-50 shadow-md transition-all duration-300"
              >
                <Send size={14} className="mr-2" />
                {isSubmitting ? t("contact_submitting") : t("contact_submit")}
              </button>

            </form>
          </div>

          {/* Quick Action Side Panel Right Column (Col span 3) */}
          <div className="col-span-3 flex flex-col justify-between bg-[#0a0a0a]/50 h-full">
            
            {/* Quick Actions List */}
            <div className="p-4 space-y-4">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold">
                Quick Actions
              </div>

              <div className="space-y-2.5">
                {/* Action 1: Copy Email */}
                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary border border-border/50 hover:border-border transition-all duration-300 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-background flex items-center justify-center border border-border text-muted-foreground group-hover:text-foreground">
                      <Copy size={13} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold text-foreground">Copy Email</div>
                      <div className="text-[9px] text-muted-foreground font-mono">ruangciptasolusi@gmail.com</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground">⌥ M</span>
                </button>

                {/* Action 2: View Office Location */}
                <a
                  href="https://maps.google.com/?q=Pejaten+Barat+Pasar+Minggu+Jakarta+Selatan"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => addLog("[LOCATION] Launching Google Maps for Pejaten office.")}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary border border-border/50 hover:border-border transition-all duration-300 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-background flex items-center justify-center border border-border text-muted-foreground group-hover:text-foreground">
                      <Compass size={13} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold text-foreground">Office Map</div>
                      <div className="text-[9px] text-muted-foreground font-mono">Pasar Minggu, Jakarta</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground">⌥ L</span>
                </a>
              </div>
            </div>

            {/* Simulated Live Console Output */}
            <div className="p-4 border-t border-border/50 bg-[#050505] flex-grow md:flex-grow-0">
              <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-semibold mb-2.5 flex items-center gap-1.5">
                <TermIcon size={12} className="text-[#ECFF8A]" />
                CONSOLE LOGGER
              </div>
              <div className="font-mono text-[10px] text-green-400 space-y-1 overflow-y-auto max-h-[110px] pr-2 no-scrollbar leading-relaxed">
                {logs.map((log, index) => (
                  <div key={index} className="truncate select-none">
                    <span className="text-muted-foreground/40 font-mono select-none">&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Keyboard Shortcuts status bar - Col span 10 */}
          <div className="col-span-10 h-10 border-t border-border/70 bg-[#0a0a0a]/65 flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">Tab</span> Navigate</span>
              <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">⌘↵</span> Send Message</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">⌥ M</span> Copy Email</span>
              <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">⌥ L</span> Map</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
