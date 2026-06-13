"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Code, Briefcase } from "lucide-react"
import { useLanguage } from "@/components/language-context"

const founders = [
  {
    name: "Abi Hamdi",
    role: "Founder",
    bio: "With over 7 years of experience in the field of information technology, have been involved in various projects including website development, application development, network management, security, and other aspects.",
    initials: "AH",
    skills: ["Website Development", "Application Development", "Network Management", "Cyber Security", "Infrastructure"],
    experience: "7+ Years",
    glowColor: "rgba(236, 255, 138, 0.15)",
    accent: "#ECFF8A"
  },
  {
    name: "Ayip Farouk",
    role: "Founder",
    bio: "Having over 5 years of experience in product management across various stages, from early-stage startups to mid-stage companies, and at one of the largest e-commerce companies in Southeast Asia. Possessing several certifications in product management training as well as business consulting.",
    initials: "AF",
    skills: ["Product Strategy", "Market Analysis", "Business Development", "UX Research", "Consulting"],
    experience: "5+ Years",
    glowColor: "rgba(255, 255, 255, 0.15)",
    accent: "#FFFFFF"
  },
]

interface FounderCardProps {
  founder: typeof founders[0]
  index: number
}

export function TeamSection() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const activeFounder = founders[activeIndex]

  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      
      {/* Ambient glowing orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#FFFFFF]/3 top-1/3 left-1/4 -translate-x-1/2" />
      <div className="orb w-[500px] h-[500px] bg-[#ECFF8A]/3 bottom-1/3 right-1/4 translate-x-1/2" />

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
              {t("team_pill")}
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            {t("team_heading_1")} <span className="gradient-text">{t("team_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance mx-auto md:mx-0">
            {t("team_description")}
          </p>
        </motion.div>

        {/* Raycast Console Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass noise rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-5 md:h-[580px]"
        >
          {/* Header Row (Always at Top) - Col span 5 */}
          <div className="col-span-5 h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#242424]/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-[10px] xs:text-[11px] font-mono text-muted-foreground font-medium tracking-wide truncate max-w-[200px] xs:max-w-none">
              <span className="inline sm:hidden">rcs-team-console</span>
              <span className="hidden sm:inline">rcs-founder-console -- v1.0.0</span>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Left Column: Command Directory Sidebar (Col span 2) */}
          <div className="col-span-2 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-[#080808]/40 md:h-[calc(100%-48px)] overflow-auto">
            <div>
              {/* Search Mockup */}
              <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <span className="text-muted-foreground font-mono text-xs">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search directory..." 
                  disabled
                  className="bg-transparent text-sm md:text-xs font-mono text-foreground placeholder:text-muted-foreground/60 border-none outline-none w-full"
                />
                <span className="text-[10px] font-mono bg-[#242424] border border-white/10 px-1.5 py-0.5 rounded text-muted-foreground">⌘F</span>
              </div>

              {/* Founder List */}
              <div className="p-3 space-y-1.5">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-3 mb-2 font-semibold">
                  Founders Directory
                </div>
                {founders.map((founder, index) => {
                  const isActive = activeIndex === index
                  return (
                    <button
                      key={founder.name}
                      onClick={() => setActiveIndex(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 group/item cursor-pointer border text-left ${
                        isActive 
                          ? "bg-[#242424] border-white/10" 
                          : "bg-transparent border-transparent hover:bg-[#242424]/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-background flex items-center justify-center font-mono font-bold text-xs border ${isActive ? "border-accent/40" : "border-white/5"}`}>
                          <span className={`${isActive ? "text-accent" : "text-muted-foreground"}`}>{founder.initials}</span>
                        </div>
                        <div>
                          <div className={`text-sm md:text-xs font-mono font-semibold ${isActive ? "text-foreground" : "text-muted-foreground group-hover/item:text-foreground"}`}>
                            {founder.name}
                          </div>
                          <div className="text-xs md:text-[10px] text-muted-foreground font-mono">
                            {founder.role}
                          </div>
                        </div>
                      </div>
                      
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quick stats bottom */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]/30 hidden md:block">
              <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mb-2 font-semibold">
                Status Summary
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-[#242424]/40 border border-white/5 rounded-lg p-2">
                  <div className="text-xs md:text-[10px] font-mono text-muted-foreground">Status</div>
                  <div className="text-sm md:text-xs font-mono font-semibold text-green-400">ONLINE</div>
                </div>
                <div className="bg-[#242424]/40 border border-white/5 rounded-lg p-2">
                  <div className="text-xs md:text-[10px] font-mono text-muted-foreground">Version</div>
                  <div className="text-sm md:text-xs font-mono font-semibold text-foreground">v1.2.6</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Workspace (Col span 3) */}
          <div className="col-span-3 flex flex-col justify-between md:h-[calc(100%-48px)] bg-[#0d0d0e]/40 overflow-auto relative">
            
            {/* Ambient Background Glow matching active founder */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-25"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${activeFounder.glowColor}, transparent 60%)`
              }}
            />

            {/* Active profile content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-grow relative z-10 space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFounder.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Top Profile Header */}
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center relative overflow-hidden border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                      <div 
                        className="absolute inset-0 opacity-25"
                        style={{ background: `linear-gradient(135deg, ${activeFounder.accent}, transparent)` }}
                      />
                      <span 
                        className="text-2xl font-black relative z-10"
                        style={{ 
                          color: activeFounder.accent
                        }}
                      >
                        {activeFounder.initials}
                      </span>
                    </div>

                    <div>
                      <div className="text-2xl font-bold tracking-wide text-foreground font-display">
                        {activeFounder.name}
                      </div>
                      <div className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {activeFounder.role}
                      </div>
                    </div>
                  </div>

                  {/* Profile Bio */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                      Biography / Background
                    </div>
                    <p className="text-sm md:text-xs text-muted-foreground leading-relaxed font-sans text-justify">
                      {activeFounder.bio}
                    </p>
                  </div>

                  {/* Experience Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#242424]/30 border border-white/5 rounded-lg p-3.5">
                      <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mb-1 font-semibold flex items-center gap-1.5">
                        <Briefcase size={12} style={{ color: activeFounder.accent }} />
                        Experience
                      </div>
                      <div className="text-sm md:text-xs font-mono font-bold text-foreground">
                        {activeFounder.experience}
                      </div>
                    </div>
                    <div className="bg-[#242424]/30 border border-white/5 rounded-lg p-3.5">
                      <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mb-1 font-semibold flex items-center gap-1.5">
                        <Code size={12} style={{ color: activeFounder.accent }} />
                        Core Skills
                      </div>
                      <div className="text-sm md:text-xs font-mono font-bold text-foreground">
                        {activeFounder.skills.length} Areas
                      </div>
                    </div>
                  </div>

                  {/* Terminal Code Mockup for Skills */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                      Tech Workspace Properties
                    </div>
                    <div className="bg-[#080808] border border-white/10 rounded-lg p-4 font-mono text-xs md:text-[11px] text-[#ECFF8A]/80 space-y-1 overflow-x-auto shadow-inner relative">
                      <div className="absolute top-3 right-3 text-[10px] text-muted-foreground/65 uppercase">ts</div>
                      <div>
                        <span className="text-purple-400">const</span> <span className="text-blue-400">founder</span> = &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-red-400">name</span>: <span className="text-green-400">"{activeFounder.name}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-red-400">experience</span>: <span className="text-green-400">"{activeFounder.experience}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-red-400">competencies</span>: [
                      </div>
                      {activeFounder.skills.map((skill, index) => (
                        <div key={skill} className="pl-8 text-green-400">
                          "{skill}"{index < activeFounder.skills.length - 1 ? "," : ""}
                        </div>
                      ))}
                      <div className="pl-4">
                        ]
                      </div>
                      <div>&#125;;</div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom Keyboard shortcuts bar */}
            <div className="h-10 border-t border-white/10 bg-[#0a0a0a]/65 flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground relative z-10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold">↵</span> Open Profile</span>
                <span className="flex items-center gap-1"><span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold">Tab</span> Navigate</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
