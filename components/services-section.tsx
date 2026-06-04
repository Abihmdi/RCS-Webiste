"use client"

import { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Zap, BarChart3, Lightbulb, Server, Search, MessageSquare, Wrench, Shield, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-context"

const services = [
  {
    id: 1,
    icon: Zap,
    title: "Technology Modernization",
    desc: "End-to-end business transformation — management systems, automation, customer data management, and more.",
    color: "#ECFF8A",
    hotkey: "⌘1",
    actions: ["System Auditing", "Workflow Automation", "CRM/ERP Development", "API Integrations"]
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Data Analysis & AI",
    desc: "Identifying patterns, trends, and opportunities using AI to provide insights that drive better decisions.",
    color: "#FFFFFF",
    hotkey: "⌘2",
    actions: ["Data Pipeline Engineering", "Predictive Analytics", "Custom ML Models", "BI Dashboarding"]
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Product & Service Innovation",
    desc: "Conceiving, developing, and launching new digital products — from apps to full-stack web platforms.",
    color: "#ECFF8A",
    hotkey: "⌘3",
    actions: ["MVP Rapid Prototyping", "Fullstack SaaS Platforms", "Mobile App Development", "UI/UX System Design"]
  },
  {
    id: 4,
    icon: Server,
    title: "Technology Infrastructure",
    desc: "Planning, implementation, and management of networks, servers, hardware, CCTV, and software.",
    color: "#FFFFFF",
    hotkey: "⌘4",
    actions: ["Cloud Infrastructure Setup", "Network Architecture Design", "Cybersecurity Audits", "Hardware Provisioning"]
  },
]

const processSteps = [
  { icon: Search,        num: "01", title: "Business Diagnosis",       desc: "Thoroughly diagnosing your business to identify opportunities." },
  { icon: MessageSquare, num: "02", title: "Discussion & Solutions",    desc: "Engaging in deep discussions to find the most effective solutions." },
  { icon: Wrench,        num: "03", title: "Technology Implementation", desc: "Taking full responsibility for pixel-perfect implementation." },
  { icon: Shield,        num: "04", title: "Monitoring & Maintenance",  desc: "Long-term monitoring to ensure our systems deliver value." },
]

export function ServicesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIdx, setActiveIdx] = useState(0)
  const activeSvc = services[activeIdx]

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Ambient glowing orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#3B82F6]/2 top-1/3 right-10" />

      <div ref={ref} className="container relative mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <div className="mb-4">
            <span className="section-pill">
              <span className="section-pill-dot" />
              {t("services_pill")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" style={{ fontFamily: "var(--font-bebas-neue)" }}>
            {t("services_heading_1")} <span className="gradient-text">{t("services_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance mx-auto md:mx-0">
            {t("services_description")}
          </p>
        </motion.div>

        {/* Raycast Services Console Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass noise rounded-2xl border border-border/80 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:grid md:grid-cols-10 md:h-[600px]"
        >
          {/* Header Row */}
          <div className="col-span-10 h-12 border-b border-border/70 flex items-center justify-between px-4 bg-secondary/30 relative z-20 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            <div className="text-[11px] font-mono text-muted-foreground font-medium tracking-wide">
              rcs-services-palette -- Commands Directory
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Left Column: Services Commands List (Col span 5) */}
          <div className="col-span-5 border-b md:border-b-0 md:border-r border-border/70 flex flex-col justify-between bg-[#0a0a0a]/50 md:h-[calc(100%-48px)] overflow-hidden">
            <div>
              {/* Fake Search bar inside palette list */}
              <div className="p-4 border-b border-border/60 flex items-center gap-2">
                <span className="text-muted-foreground font-mono text-xs">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search capabilities..." 
                  disabled
                  className="bg-transparent text-xs font-mono text-foreground placeholder:text-muted-foreground/45 border-none outline-none w-full"
                />
                <span className="text-[9px] font-mono bg-secondary/80 border border-border px-1.5 py-0.5 rounded text-muted-foreground">⌘F</span>
              </div>

              {/* Commands list */}
              <div className="p-3 space-y-1.5 overflow-y-auto no-scrollbar">
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest px-2 mb-2 font-semibold">
                  Service Actions
                </div>
                {services.map((svc, index) => {
                  const isSelected = activeIdx === index
                  const SvcIcon = svc.icon
                  return (
                    <button
                      key={svc.title}
                      onClick={() => setActiveIdx(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 border text-left cursor-pointer ${
                        isSelected 
                          ? "bg-secondary border-border/80 shadow-md" 
                          : "bg-transparent border-transparent hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-border/60 flex-shrink-0"
                          style={{ 
                            background: `radial-gradient(circle, ${svc.color}15, transparent 80%)`
                          }}
                        >
                          <SvcIcon size={14} style={{ color: svc.color }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-mono font-bold text-foreground truncate">
                            {svc.title}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-mono truncate leading-normal">
                            {svc.desc}
                          </div>
                        </div>
                      </div>
                      
                      <span className="text-[9px] font-mono bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground ml-2">
                        ⌥ {index + 1}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quick Summary bottom */}
            <div className="p-4 border-t border-border/50 bg-[#0a0a0a]/30 hidden md:block">
              <div className="text-[9px] font-mono text-muted-foreground tracking-wider uppercase mb-2 font-semibold">
                Capability Framework
              </div>
              <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-sans">
                We diagnose, design, implement, and monitor. Every system is built to maximize cost efficiency and boost operational output.
              </p>
            </div>
          </div>

          {/* Right Column: Execution Workspace & Timeline Flow (Col span 5) */}
          <div className="col-span-5 flex flex-col justify-between md:h-[calc(100%-48px)] bg-[#0d0d0e]/60 overflow-hidden relative">
            
            {/* Ambient glow matching selected service */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-20"
              style={{
                background: `radial-gradient(circle at 80% 25%, ${activeSvc.color}25, transparent 65%)`
              }}
            />

            <div className="p-6 md:p-8 overflow-y-auto flex-grow relative z-10 space-y-6 no-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSvc.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Service Header */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-border/80 shadow-md"
                      style={{ 
                        background: `radial-gradient(circle, ${activeSvc.color}25, transparent 80%)`
                      }}
                    >
                      {(() => {
                        const SvcIcon = activeSvc.icon
                        return <SvcIcon size={20} style={{ color: activeSvc.color }} />
                      })()}
                    </div>
                    <div>
                      <div className="text-xl font-bold tracking-wide text-foreground font-display leading-tight">
                        {activeSvc.title}
                      </div>
                      <div className="text-[9px] font-mono text-muted-foreground mt-0.5">
                        Operation Code: active_service_0{activeSvc.id}
                      </div>
                    </div>
                  </div>

                  {/* Desc */}
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans text-justify">
                    {activeSvc.desc}
                  </p>

                  {/* Core Actions checklist */}
                  <div className="space-y-2.5">
                    <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                      Executed Modules
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeSvc.actions.map((act) => (
                        <div key={act} className="flex items-center gap-2 p-2.5 bg-secondary/35 border border-border/50 rounded-lg text-[10px] font-mono text-foreground/80">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: activeSvc.color }} />
                          <span className="truncate">{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process workflow steps */}
                  <div className="space-y-3">
                    <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                      Execution Lifecycle (4-Step Pipeline)
                    </div>
                    
                    <div className="space-y-2">
                      {processSteps.map((step, sIdx) => {
                        const StepIcon = step.icon
                        return (
                          <div 
                            key={step.title} 
                            className="flex gap-3 p-3 bg-[#050505]/75 border border-border/80 rounded-xl hover:border-foreground/10 transition-colors group/step"
                          >
                            <div className="w-7 h-7 rounded-lg bg-secondary/80 border border-border/80 flex items-center justify-center text-muted-foreground group-hover/step:border-[#ECFF8A]/40 shrink-0">
                              <StepIcon size={12} className="text-muted-foreground group-hover/step:text-[#ECFF8A] transition-colors" />
                            </div>
                            <div>
                              <div className="text-[10px] font-mono font-bold text-foreground flex items-center gap-2 leading-none mb-1">
                                <span>{step.num} / {step.title}</span>
                              </div>
                              <p className="text-[10px] text-muted-foreground leading-normal font-sans">{step.desc}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className="h-10 border-t border-border/70 bg-[#0a0a0a]/65 flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground relative z-10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">↵</span> Execute</span>
                <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">Tab</span> Switch Pane</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">⌥ 1-4</span> Select
              </div>
            </div>

          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4 text-xs font-mono">Need a custom technical roadmap? Let&apos;s interface.</p>
          <a href="mailto:ruangciptasolusi@gmail.com" className="btn-brand inline-flex text-xs font-mono">
            {t("services_cta")} →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
