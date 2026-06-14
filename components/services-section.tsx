"use client"

import { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from "framer-motion"
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

const servicesTranslations = {
  en: [
    {
      title: "Technology Modernization",
      desc: "End-to-end business transformation — management systems, automation, customer data management, and more.",
      actions: ["System Auditing", "Workflow Automation", "CRM/ERP Development", "API Integrations"]
    },
    {
      title: "Data Analysis & AI",
      desc: "Identifying patterns, trends, and opportunities using AI to provide insights that drive better decisions.",
      actions: ["Data Pipeline Engineering", "Predictive Analytics", "Custom ML Models", "BI Dashboarding"]
    },
    {
      title: "Product & Service Innovation",
      desc: "Conceiving, developing, and launching new digital products — from apps to full-stack web platforms.",
      actions: ["MVP Rapid Prototyping", "Fullstack SaaS Platforms", "Mobile App Development", "UI/UX System Design"]
    },
    {
      title: "Technology Infrastructure",
      desc: "Planning, implementation, and management of networks, servers, hardware, CCTV, and software.",
      actions: ["Cloud Infrastructure Setup", "Network Architecture Design", "Cybersecurity Audits", "Hardware Provisioning"]
    }
  ],
  id: [
    {
      title: "Modernisasi Teknologi",
      desc: "Transformasi bisnis menyeluruh (end-to-end) — sistem manajemen, otomatisasi alur kerja, pengelolaan data pelanggan, dan lainnya.",
      actions: ["Audit Sistem", "Otomatisasi Alur Kerja", "Pengembangan CRM/ERP", "Integrasi API"]
    },
    {
      title: "Analisis Data & AI",
      desc: "Mengidentifikasi pola, tren, dan peluang menggunakan AI untuk memberikan wawasan yang mendorong keputusan lebih baik.",
      actions: ["Rekayasa Pipa Data", "Analisis Prediktif", "Model ML Kustom", "Dashboard Intelijen Bisnis"]
    },
    {
      title: "Inovasi Produk & Layanan",
      desc: "Merancang, mengembangkan, dan meluncurkan produk digital baru — mulai dari aplikasi hingga platform web full-stack.",
      actions: ["Prototipe Cepat MVP", "Platform SaaS Full-Stack", "Pengembangan Aplikasi Mobile", "Desain Sistem UI/UX"]
    },
    {
      title: "Infrastruktur Teknologi",
      desc: "Perencanaan, implementasi, dan pengelolaan jaringan, server, perangkat keras, CCTV, serta perangkat lunak.",
      actions: ["Penyusunan Infrastruktur Cloud", "Desain Arsitektur Jaringan", "Audit Keamanan Siber", "Penyediaan Perangkat Keras"]
    }
  ]
}

const processTranslations = {
  en: [
    { title: "Business Diagnosis", desc: "Thoroughly diagnosing your business to identify opportunities." },
    { title: "Discussion & Solutions", desc: "Engaging in deep discussions to find the most effective solutions." },
    { title: "Technology Implementation", desc: "Taking full responsibility for pixel-perfect implementation." },
    { title: "Monitoring & Maintenance", desc: "Long-term monitoring to ensure our systems deliver value." }
  ],
  id: [
    { title: "Diagnosis Bisnis", desc: "Mendiagnosis bisnis Anda secara mendalam untuk mengidentifikasi peluang perkembangan." },
    { title: "Diskusi & Solusi", desc: "Melakukan diskusi mendalam untuk menemukan solusi yang paling efektif." },
    { title: "Implementasi Teknologi", desc: "Mengambil tanggung jawab penuh atas implementasi teknis yang sempurna." },
    { title: "Pemantauan & Pemeliharaan", desc: "Pemantauan jangka panjang untuk memastikan sistem kami terus memberikan nilai bagi Anda." }
  ]
}

export function ServicesSection() {
  const { lang, t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIdx, setActiveIdx] = useState(0)

  const localizedServices = useMemo(() => {
    return services.map((svc, idx) => ({
      ...svc,
      title: servicesTranslations[lang][idx].title,
      desc: servicesTranslations[lang][idx].desc,
      actions: servicesTranslations[lang][idx].actions,
    }))
  }, [lang])

  const localizedSteps = useMemo(() => {
    return processSteps.map((step, idx) => ({
      ...step,
      title: processTranslations[lang][idx].title,
      desc: processTranslations[lang][idx].desc,
    }))
  }, [lang])

  const activeSvc = localizedServices[activeIdx]

  // Spring-based 3D tilt logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Ambient glowing orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#ECFF8A]/2 top-1/3 right-10" />

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

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            {t("services_heading_1")} <span className="gradient-text">{t("services_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance mx-auto md:mx-0">
            {t("services_description")}
          </p>
        </motion.div>

        {/* Raycast Services Console Window */}
        <div style={{ perspective: 1200 }} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass noise rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-10 md:h-[600px] will-change-transform"
          >
          {/* Header Row */}
          <div className="col-span-10 h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#242424]/30 relative z-20 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            <div className="text-[10px] xs:text-[11px] font-mono text-muted-foreground font-medium tracking-wide truncate max-w-[200px] xs:max-w-none">
              <span className="inline sm:hidden">rcs-services</span>
              <span className="hidden sm:inline">rcs-services-palette -- Commands Directory</span>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Left Column: Services Commands List (Col span 5) */}
          <div className="col-span-5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-[#080808]/40 md:h-[calc(100%-48px)] overflow-hidden">
            <div>
              {/* Fake Search bar inside palette list */}
              <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <span className="text-muted-foreground font-mono text-xs">🔍</span>
                <input 
                   type="text" 
                  placeholder={lang === "en" ? "Search capabilities..." : "Cari keahlian/layanan..."} 
                  disabled
                  className="bg-transparent text-sm md:text-xs font-mono text-foreground placeholder:text-muted-foreground/60 border-none outline-none w-full"
                />
                <span className="hidden sm:inline-block text-[10px] font-mono bg-[#242424] border border-white/10 px-1.5 py-0.5 rounded text-muted-foreground">⌘F</span>
              </div>

              {/* Commands list */}
              <div className="p-3 space-y-1.5 overflow-y-auto no-scrollbar">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-2 mb-2 font-semibold">
                  {lang === "en" ? "Service Actions" : "Aksi Layanan"}
                </div>
                {localizedServices.map((svc, index) => {
                  const isSelected = activeIdx === index
                  const SvcIcon = svc.icon
                  return (
                    <button
                      key={svc.title}
                      onClick={() => setActiveIdx(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 border text-left cursor-pointer ${
                        isSelected 
                          ? "bg-[#242424] border-white/10" 
                          : "bg-transparent border-transparent hover:bg-[#242424]/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0"
                          style={{ 
                            background: `radial-gradient(circle, ${svc.color}15, transparent 80%)`
                          }}
                        >
                          <SvcIcon size={14} style={{ color: svc.color }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm md:text-xs font-mono font-bold text-foreground truncate">
                            {svc.title}
                          </div>
                          <div className="text-xs md:text-[10px] text-muted-foreground font-mono truncate leading-normal">
                            {svc.desc}
                          </div>
                        </div>
                      </div>
                      
                      <span className="hidden sm:inline-block text-[10px] font-mono bg-background border border-white/10 px-1.5 py-0.5 rounded text-muted-foreground ml-2">
                        ⌥ {index + 1}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quick Summary bottom */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]/30 hidden md:block">
              <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mb-2 font-semibold">
                {lang === "en" ? "Capability Framework" : "Kerangka Kerja Kapabilitas"}
              </div>
              <p className="text-xs md:text-[10px] text-muted-foreground/80 leading-relaxed font-sans">
                {lang === "en" 
                  ? "We diagnose, design, implement, and monitor. Every system is built to maximize cost efficiency and boost operational output."
                  : "Kami mendiagnosis, merancang, mengimplementasikan, dan memantau. Setiap sistem dibangun untuk memaksimalkan efisiensi biaya dan meningkatkan hasil operasional."}
              </p>
            </div>
          </div>

          {/* Right Column: Execution Workspace & Timeline Flow (Col span 5) */}
          <div className="col-span-5 flex flex-col justify-between md:h-[calc(100%-48px)] bg-[#0d0d0e]/40 overflow-hidden relative">
            
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
                      className="w-12 h-12 rounded-lg flex items-center justify-center border border-white/10"
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
                      <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                        {lang === "en" ? "Operation Code" : "Kode Operasi"}: active_service_0{activeSvc.id}
                      </div>
                    </div>
                  </div>

                  {/* Desc */}
                  <p className="text-sm md:text-xs text-muted-foreground leading-relaxed font-sans text-justify">
                    {activeSvc.desc}
                  </p>

                  {/* Core Actions checklist */}
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                      {lang === "en" ? "Executed Modules" : "Modul Ter-eksekusi"}
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                      {activeSvc.actions.map((act) => (
                        <div key={act} className="flex items-center gap-2 p-2.5 bg-[#242424]/30 border border-white/5 rounded-lg text-xs md:text-[10px] font-mono text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeSvc.color }} />
                          <span className="truncate">{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process workflow steps */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                      {lang === "en" ? "Execution Lifecycle (4-Step Pipeline)" : "Siklus Eksekusi (4-Langkah Pipeline)"}
                    </div>
                    
                    <div className="space-y-2">
                      {localizedSteps.map((step, sIdx) => {
                        const StepIcon = step.icon
                        return (
                          <div 
                            key={step.title} 
                            className="flex gap-3 p-3 bg-[#050505]/75 border border-white/5 rounded-lg hover:border-foreground/10 transition-colors group/step"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#242424]/80 border border-white/5 flex items-center justify-center text-muted-foreground group-hover/step:border-[#ECFF8A]/40 shrink-0">
                              <StepIcon size={12} className="text-muted-foreground group-hover/step:text-[#ECFF8A] transition-colors" />
                            </div>
                            <div>
                              <div className="text-xs md:text-[10px] font-mono font-bold text-foreground flex items-center gap-2 leading-none mb-1">
                                <span>{step.num} / {step.title}</span>
                              </div>
                              <p className="text-xs md:text-[10px] text-muted-foreground leading-normal font-sans">{step.desc}</p>
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
            <div className="hidden sm:flex h-10 border-t border-white/10 bg-[#0a0a0a]/65 items-center justify-between px-4 text-[10px] font-mono text-muted-foreground relative z-10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold">↵</span> {lang === "en" ? "Execute" : "Eksekusi"}</span>
                <span className="flex items-center gap-1"><span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold">Tab</span> {lang === "en" ? "Switch Pane" : "Ganti Panel"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold">⌥ 1-4</span> {lang === "en" ? "Select" : "Pilih"}
              </div>
            </div>

          </div>
        </motion.div>
      </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4 text-xs font-mono">
            {lang === "en" ? "Need a custom technical roadmap? Let's interface." : "Butuh peta jalan teknis kustom? Hubungi kami."}
          </p>
          <a href="mailto:ruangciptasolusi@gmail.com" className="btn-brand inline-flex text-xs font-mono">
            {t("services_cta")} →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
