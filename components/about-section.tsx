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
  { 
    name: "React", 
    status: "Installed", 
    icon: (
      <svg className="w-3 h-3 shrink-0" viewBox="-11.5 -10.23 23 20.46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  { 
    name: "Next.js", 
    status: "Active", 
    icon: (
      <svg className="w-3 h-3 shrink-0 rounded-full bg-white p-0.5" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="black"/>
        <path d="M149.508 157.52L69.142 54H54v72h14.858V72.072l65.49 84.228c5.06-5.836 9.38-12.33 12.89-19.348zM126 54h15v72h-15V54z" fill="white"/>
      </svg>
    )
  },
  { 
    name: "Python", 
    status: "Ready", 
    icon: (
      <svg className="w-3 h-3 shrink-0" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M55 0C25.4 0 27.5 12.7 27.5 12.7L27.6 25.1H55.4V29.1H27.5C27.5 29.1 11 27.4 11 50C11 72.6 25.1 71.9 25.1 71.9H32.4V62.4C32.4 47.9 44.6 37.1 59.1 37.1H72C72 37.1 82.5 35.8 82.5 20.1C82.5 4.4 69.1 0 55 0ZM41.2 8C44 8 46.2 10.2 46.2 13C46.2 15.8 44 18 41.2 18C38.4 18 36.2 15.8 36.2 13C36.2 10.2 38.4 8 41.2 8Z" fill="#3776AB"/>
        <path d="M55 110C84.6 110 82.5 97.3 82.5 97.3L82.4 84.9H54.6V80.9H82.5C82.5 80.9 99 82.6 99 60C99 37.4 84.9 38.1 84.9 38.1H77.6V47.6C77.6 62.1 65.4 72.9 50.9 72.9H38C38 72.9 27.5 74.2 27.5 89.9C27.5 105.6 40.9 110 55 110ZM68.8 102C66 102 63.8 99.8 63.8 97C63.8 94.2 66 92 68.8 92C71.6 92 73.8 94.2 73.8 97C73.8 99.8 71.6 102 68.8 102Z" fill="#FFE873"/>
      </svg>
    )
  },
  { 
    name: "Cloudflare", 
    status: "Online", 
    icon: (
      <svg className="w-3 h-3 shrink-0" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M102.3 53.6c-1.3-11.4-11-20.2-22.7-20.2-3.1 0-6.1.7-8.8 2-4.5-9.6-14.3-15.9-25.3-15.9-13.8 0-25.3 10-27.7 23.2-9.6 1.7-16.8 10-16.8 20.1 0 11.3 9.2 20.5 20.5 20.5h80.7c11.3 0 20.5-9.2 20.5-20.5.1-4.2-1.1-8.1-3.4-11.2z" fill="#F38020"/>
      </svg>
    )
  },
  { 
    name: "Claude", 
    status: "Active", 
    icon: (
      <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.5 16.5C8.67 16.5 8 15.83 8 15C8 14.17 8.67 13.5 9.5 13.5C10.33 13.5 11 14.17 11 15C11 15.83 10.33 16.5 9.5 16.5ZM14.5 16.5C13.67 16.5 13 15.83 13 15C13 14.17 13.67 13.5 14.5 13.5C15.33 13.5 16 14.17 16 15C16 15.83 15.33 16.5 14.5 16.5ZM12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11Z" fill="#D97706"/>
      </svg>
    )
  },
  { 
    name: "Antigravity", 
    status: "Synced", 
    icon: (
      <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5C10.5 5 9 6 8 7.5C7 9 7 11.5 8 13.5C9 15.5 10.5 17 12 17C13.5 17 15 15.5 16 13.5C17 11.5 17 9 16 7.5C15 6 13.5 5 12 5Z" fill="#C3E633"/>
        <path d="M12 5C12 3 13 2 14 2C14.5 3 14 4.5 13 5H12Z" fill="#C3E633"/>
        <path d="M6 20C8 19 10 19 12 20C14 21 16 21 18 20" stroke="#C3E633" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 23C10 22 12 22 14 23" stroke="#C3E633" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    name: "Codex", 
    status: "Running", 
    icon: (
      <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#10B981" strokeWidth="2"/>
        <path d="M8 9L5 12L8 15" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9L19 12L16 15" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 8L11 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
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
                      {tech.icon}
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
