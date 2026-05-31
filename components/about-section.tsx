"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, Info, Activity, Package } from "lucide-react"
import { useLanguage } from "@/components/language-context"

const deliverables = [
  "Improve management efficiency",
  "Effective customer management",
  "Build client internet presence & trust",
]

const techStack = [
  { name: "React", status: "Installed", color: "#3B82F6" },
  { name: "Next.js", status: "Active", color: "#FFFFFF" },
  { name: "Node.js", status: "Running", color: "#10B981" },
  { name: "Python", status: "Ready", color: "#3B82F6" },
  { name: "Google Cloud", status: "Online", color: "#3B82F6" },
  { name: "PostgreSQL", status: "Synced", color: "#06B6D4" },
  { name: "MongoDB", status: "Connected", color: "#10B981" },
  { name: "Firebase", status: "Configured", color: "#7C3AED" },
]

const stats = [
  { label: "Experience", value: "3+ Years", badge: "Senior" },
  { label: "Delivered", value: "50+ Projects", badge: "Prod" },
  { label: "Satisfaction", value: "98% Rate", badge: "Max" },
]

export function AboutSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { label: t("about_stat_exp_label"), value: t("about_stat_exp_value"), badge: t("about_stat_exp_badge") },
    { label: t("about_stat_del_label"), value: t("about_stat_del_value"), badge: t("about_stat_del_badge") },
    { label: t("about_stat_sat_label"), value: t("about_stat_sat_value"), badge: t("about_stat_sat_badge") },
  ]

  const deliverables = [
    t("about_deliverable_1"),
    t("about_deliverable_2"),
    t("about_deliverable_3"),
  ]

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Background glow orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#C3E633]/3 top-1/4 left-1/2 -translate-x-1/2" />

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
              {t("about_pill")}
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            {t("about_heading_1")} <span className="gradient-text">{t("about_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance mx-auto md:mx-0">
            {t("about_description")}
          </p>
        </motion.div>

        {/* System Settings & Diagnostics Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass noise rounded-2xl border border-border/80 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:grid md:grid-cols-5"
          style={{ minHeight: "520px" }}
        >
          {/* Header Row */}
          <div className="col-span-5 h-12 border-b border-border/70 flex items-center justify-between px-4 bg-secondary/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-[11px] font-mono text-muted-foreground font-medium tracking-wide flex items-center gap-1.5">
              <Info size={11} className="text-[#C3E633]" />
              rcs-system-about.conf -- Settings
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Left Column: Diagnostics & Specs (Col span 3) */}
          <div className="col-span-3 p-6 border-b md:border-b-0 md:border-r border-border/70 bg-[#0d0d0e]/60 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Activity size={12} className="text-[#C3E633]" />
                  {t("about_mission_label")}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify font-sans">
                  {t("about_mission_text")}
                </p>
              </div>

              {/* Specs Table */}
              <div className="space-y-2.5">
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-semibold">
                  {t("about_specs_label")}
                </div>
                <div className="border border-border/50 rounded-xl overflow-hidden font-mono text-[11px] bg-secondary/20">
                  <div className="grid grid-cols-2 p-3 border-b border-border/40 hover:bg-secondary/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_entity")}</span>
                    <span className="text-foreground font-semibold">PT Ruang Cipta Solusi</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 border-b border-border/40 hover:bg-secondary/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_specialization")}</span>
                    <span className="text-[#C3E633] font-semibold">Digital Transformation</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 border-b border-border/40 hover:bg-secondary/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_role")}</span>
                    <span className="text-foreground">Full-Stack Partner</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 hover:bg-secondary/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_address")}</span>
                    <span className="text-foreground truncate" title="Komplek Bank Niaga, Jakarta Selatan">Jakarta Selatan, ID</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Diagnostics Stats row */}
            <div className="grid grid-cols-3 gap-2.5 mt-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-background border border-border/60 rounded-xl p-3.5 text-center group hover:border-[#C3E633]/40 transition-colors duration-300">
                  <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-1 truncate">{s.label}</div>
                  <div className="text-xs font-bold text-foreground font-mono" style={{ fontFamily: "var(--font-bebas-neue)" }}>
                    {s.value}
                  </div>
                  <span className="inline-block mt-1 text-[8px] font-mono text-[#C3E633] bg-[#C3E633]/8 px-1.5 py-0.5 rounded">
                    {s.badge}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Registry Modules & Tech Stacks (Col span 2) */}
          <div className="col-span-2 p-6 bg-[#0a0a0a]/50 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Deliverables Section */}
              <div className="space-y-3">
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-[#C3E633]" />
                  {t("about_deliverables_label")}
                </div>
                <div className="space-y-2.5">
                  {deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 bg-secondary/30 border border-border/50 rounded-xl hover:border-foreground/10 transition-colors">
                      <CheckCircle2 size={13} className="text-[#C3E633] shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground leading-normal font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stacks Registry Section */}
              <div className="space-y-3">
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Package size={12} className="text-[#FFFFFF]" />
                  {t("about_stacks_label")}
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <div 
                      key={tech.name}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-foreground/80 bg-secondary/80 border border-border/60 flex items-center gap-1.5 hover:border-foreground/20 transition-all cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: tech.color }} />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                  <div className="px-2 py-1 rounded-lg text-[10px] font-mono text-[#C3E633] bg-[#C3E633]/8 border border-[#C3E633]/30">
                    + more
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Signature Card */}
            <div className="flex items-center gap-3 pt-6 border-t border-border/50 mt-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-border"
                style={{ background: "linear-gradient(135deg, #C3E633, #FFFFFF)" }}
              >
                <span className="font-mono font-black text-black text-xs">R</span>
              </div>
              <div>
                <div className="font-semibold text-xs text-foreground font-mono leading-none">PT Ruang Cipta Solusi</div>
                <div className="text-[9px] text-muted-foreground font-mono mt-1">{t("about_verified")}</div>
              </div>
            </div>

          </div>

          {/* Bottom hotkeys status bar */}
          <div className="col-span-5 h-10 border-t border-border/70 bg-[#0a0a0a]/65 flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Status: <span className="text-green-400">{t("about_status_synced")}</span></span>
              <span>Modules: <span className="text-foreground">{t("about_status_modules")}</span></span>
            </div>
            <div>
              <span>Press <span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground font-semibold">⌥ D</span> to open docs</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
