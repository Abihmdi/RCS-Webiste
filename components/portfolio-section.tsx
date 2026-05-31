"use client"

import { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Smartphone, Globe, Database, Building2, Search, Download, Star, Terminal, BookOpen, Chrome, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-context"

const categories = ["All", "Mobile", "Web", "Enterprise"] as const
type Category = typeof categories[number]

export const projects = [
  {
    id: 1,
    title: "Aksara AI",
    slug: "aksara-ai",
    subtitle: "Chrome Extension & Second Brain",
    category: "Web",
    caseStudy: "Users struggle to digest long-form web articles, draft context-aware replies, and retain knowledge across multiple browser tabs, causing information overload and fractured productivity.",
    solution: "We engineered Aksara AI, a Chrome extension that serves as a context-aware second brain. It allows users to summarize articles, draft email/social replies with custom tones, translate line-by-line, and save searchable highlights locally.",
    features: ["Instant Summarizer", "AI Reply Generator", "Local Vector Memory", "Inline Translator", "No-Setup Groq Integration"],
    icon: Chrome,
    color: "#C3E633",
    installs: "3.2k",
    rating: "5.0",
    type: "Extension",
    url: "https://aksara.qzz.io/",
  },
  {
    id: 2,
    title: "Bill Muhdor CRM",
    slug: "bill-muhdor-crm",
    subtitle: "CRM Implementation",
    category: "Enterprise",
    caseStudy: "Bill Muhdor, juggling art sales, workshops, and client communication, needs a better system. Manual management creates missed leads, booking errors, and hinders client relationships.",
    solution: "We implement a customized CRM for Bill Muhdor, enhancing his team's ability to manage customer information and communication, as well as facilitating marketing aspects and operational aspects of his art business.",
    features: ["Customer Management", "Marketing Automation", "Operational Efficiency"],
    icon: Database,
    color: "#FFFFFF",
    installs: "6.4k",
    rating: "4.7",
    type: "Extension",
  },
  {
    id: 3,
    title: "Braincoach",
    slug: "braincoach",
    subtitle: "Cognitive Assessment Website",
    category: "Web",
    caseStudy: "Traditional methods for assessing cognitive function are unreliable, making it hard to diagnose dementia early. This delays treatment and worsens patient outcomes.",
    solution: "We created Braincoach, a website designed for cognitive assessment and training. Leveraging AI capabilities, Braincoach supports accurate assessment and provides cognitive training games to enhance brain function.",
    features: ["Cognitive Assessment (MOCA INA)", "AI Integration", "Training Games"],
    icon: Globe,
    color: "#FFFFFF",
    installs: "9.2k",
    rating: "4.8",
    type: "Extension",
  },
  {
    id: 4,
    title: "Heystetik",
    slug: "heystetik",
    subtitle: "Beauty Clinic Application",
    category: "Mobile",
    caseStudy: "Beauty clinics juggle scattered data, manual tasks, and weak patient connections. This chaos disrupts appointment bookings, sales, and community building.",
    solution: "We have developed Heystetik, an innovative application designed for beauty clinics. Heystetik allows users to consult with doctors, book treatments, purchase skincare products, and engage in discussions with other users through streaming features.",
    features: ["Doctor Consultation", "Treatment Booking", "Commerce", "Stream", "Progress Tracker"],
    icon: Smartphone,
    color: "#C3E633",
    installs: "14.8k",
    rating: "4.9",
    type: "Extension",
  },
  {
    id: 5,
    title: "Hospital Management System",
    slug: "hospital-management-system",
    subtitle: "ERP Implementation",
    category: "Enterprise",
    caseStudy: "Disconnected hospital systems (registration, appointments, inventory, pharmacy, billing) cause delays, errors, and information gaps. This frustrates staff, hinders care, and hurts the overall hospital experience.",
    solution: "Our Hospital Management System provides an integrated platform to handle all hospital operations efficiently. This system also includes ERP-based medical record management.",
    features: ["Patient Registration", "Doctor & Clinic Management", "Inventory and Pharmacy", "Billing System", "Medical Record"],
    icon: Building2,
    color: "#C3E633",
    installs: "24.1k",
    rating: "4.9",
    type: "Extension",
  },
  {
    id: 6,
    title: "Recruitment Tools",
    slug: "recruitment-tools",
    subtitle: "Recruitment Management System",
    category: "Enterprise",
    caseStudy: "The surge in applications and manual processes for tasks like administering tests, scoring results, and scheduling interviews are creating bottlenecks for recruiters.",
    solution: "We are developing a Recruitment Tool to automate daily recruitment tasks, including test administration, automated scoring, and interview scheduling integrated with email, Google Calendar, and video conferencing tools.",
    features: ["Automated Testing", "Interview Scheduling", "Operational Automation"],
    icon: Database,
    color: "#FFFFFF",
    installs: "11.3k",
    rating: "4.8",
    type: "Extension",
  },
  {
    id: 7,
    title: "Travelator",
    slug: "travelator",
    subtitle: "Travel ERP Software",
    category: "Enterprise",
    caseStudy: "A travel agency using disconnected systems for bookings, quotes, invoices, and operations faces challenges in providing accurate information to clients and tracking overall business performance.",
    solution: "Travelator is an ERP software specifically designed to simplify travel business operations. It streamlines various aspects of travel management, including bookings, quotations, billing, task management, and financial tracking.",
    features: ["Order Management", "Offers and Billing", "Task Management", "Revenue & Expenditure Management"],
    icon: Globe,
    color: "#C3E633",
    installs: "15.9k",
    rating: "4.9",
    type: "Extension",
  },
  {
    id: 8,
    title: "Vistral",
    slug: "vistral",
    subtitle: "Patrol Management Application",
    category: "Mobile",
    caseStudy: "Inefficient patrol management (gaps, missed patrols, slow response) creates operational risks and eats into profits. Expensive patrol devices add another financial burden.",
    solution: "Vistral is a patrol management application that simplifies attendance tracking, patrol management, and emergency responses. This application utilizes QR codes for attendance verification and ERP-based patrols.",
    features: ["Attendance Tracking", "Patrol Management", "SOS Button", "Anti Fake GPS"],
    icon: Smartphone,
    color: "#C3E633",
    installs: "18.5k",
    rating: "5.0",
    type: "Extension",
  },
]

export function PortfolioSection() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState(1)

  // Filter projects by category and query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.caseStudy.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Select first match if current selectedId is not in filtered list
  const activeProject = useMemo(() => {
    const current = projects.find((p) => p.id === selectedId)
    if (current && filteredProjects.some((p) => p.id === selectedId)) {
      return current
    }
    return filteredProjects[0] || null
  }, [filteredProjects, selectedId])

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      {/* Ambient glowing orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#C3E633]/2 -top-20 -left-20" />
      <div className="orb w-[500px] h-[500px] bg-[#FFFFFF]/2 -bottom-20 -right-20" />

      <div className="container relative mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="mb-4">
            <span className="section-pill">
              <span className="section-pill-dot" />
              {t("portfolio_pill")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight" style={{ fontFamily: "var(--font-bebas-neue)" }}>
            {t("portfolio_heading_1")} <span className="gradient-text">{t("portfolio_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("portfolio_description")}
          </p>
        </motion.div>

        {/* Raycast Store Console Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass noise rounded-2xl border border-border/80 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:grid md:grid-cols-10 md:h-[640px]"
        >
          {/* Header Row - Col span 10 */}
          <div className="col-span-10 h-12 border-b border-border/70 flex items-center justify-between px-4 bg-secondary/30 relative z-20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            {/* Search Input Bar inside Header */}
            <div className="flex items-center gap-2 bg-background/50 border border-border/60 rounded-lg px-2.5 py-1 w-64 md:w-96 shadow-inner">
              <Search size={12} className="text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Search extensions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs font-mono text-foreground placeholder:text-muted-foreground/45 border-none outline-none w-full"
              />
              <span className="text-[9px] font-mono bg-secondary/80 border border-border/80 px-1 py-0.5 rounded text-muted-foreground">⌘F</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
              <span>ruangciptasolusi.com/portfolio</span>
            </div>
          </div>

          {/* Left Column: Side categories filter & list (Col span 5) */}
          <div className="col-span-5 border-b md:border-b-0 md:border-r border-border/70 flex flex-col justify-between bg-[#0a0a0a]/50 md:h-[calc(100%-48px)] overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Category selector row */}
              <div className="flex gap-1.5 p-3 overflow-x-auto border-b border-border/60 no-scrollbar">
                {categories.map((category) => {
                  const isActive = activeCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category)
                      }}
                      className={`relative px-3.5 py-1.5 text-[10px] font-mono font-medium rounded-full cursor-pointer transition-all duration-300 ${
                        isActive 
                          ? "text-foreground font-semibold" 
                          : "text-muted-foreground hover:text-foreground border border-border/30 hover:border-border"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeStoreCategory"
                          className="absolute inset-0 rounded-full bg-secondary border border-border/60 shadow-sm"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  )
                })}
              </div>

              {/* Extensions list */}
              <div className="flex-grow overflow-y-auto p-3 space-y-1.5 no-scrollbar">
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest px-2 mb-2 font-semibold flex items-center justify-between">
                  <span>Results</span>
                  <span>{filteredProjects.length} matching</span>
                </div>
                
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => {
                    const isSelected = activeProject?.id === project.id
                    const ProjectIcon = project.icon
                    return (
                      <button
                        key={project.id}
                        onClick={() => setSelectedId(project.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 border text-left cursor-pointer ${
                          isSelected 
                            ? "bg-secondary border-border/80 shadow-md" 
                            : "bg-transparent border-transparent hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div 
                            className="w-9 h-9 rounded-lg flex items-center justify-center border border-border/60 flex-shrink-0"
                            style={{ 
                              background: `radial-gradient(circle, ${project.color}15, transparent 80%)`
                            }}
                          >
                            <ProjectIcon size={16} style={{ color: project.color }} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-mono font-bold text-foreground truncate flex items-center gap-1.5">
                              {project.title}
                              <span className="text-[8px] font-mono text-muted-foreground/60">@rcs</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground font-mono truncate leading-normal">
                              {project.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
                          <div className="flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground/70">
                            <Download size={10} />
                            <span>{project.installs}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[10px] font-mono text-amber-500/80">
                            <Star size={10} className="fill-current" />
                            <span>{project.rating}</span>
                          </div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="text-center py-12">
                    <div className="text-xs font-mono text-muted-foreground">No extensions found.</div>
                    <button 
                      onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                      className="mt-3 text-[10px] font-mono text-[#C3E633] underline cursor-pointer"
                    >
                      Clear search filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Extension Detailed View (Col span 5) */}
          <div className="col-span-5 flex flex-col justify-between md:h-[calc(100%-48px)] bg-[#0d0d0e]/60 overflow-hidden relative">
            {activeProject ? (
              <>
                {/* Ambient glow */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${activeProject.color}30, transparent 65%)`
                  }}
                />

                <div className="p-6 md:p-8 overflow-y-auto flex-grow relative z-10 space-y-6 no-scrollbar">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      {/* Header with Title & Install Command */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center border border-border/80 shadow-md"
                            style={{ 
                              background: `radial-gradient(circle, ${activeProject.color}25, transparent 80%)`
                            }}
                          >
                            {/* Dynamically instantiate ProjectIcon */}
                            {(() => {
                              const ProjectIcon = activeProject.icon
                              return <ProjectIcon size={24} style={{ color: activeProject.color }} />
                            })()}
                          </div>
                          <div>
                            <div className="text-2xl font-bold tracking-wide text-foreground font-display leading-tight">
                              {activeProject.title}
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground mt-1 flex items-center gap-2">
                              <span>PT Ruang Cipta Solusi</span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                              <span>{activeProject.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="text-[9px] font-mono bg-green-500/10 border border-green-500/30 text-green-400 px-2 py-0.5 rounded-full">
                            RELEASED
                          </span>
                          {activeProject.url && (
                            <a
                              href={activeProject.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[9px] font-mono text-[#C3E633] bg-[#C3E633]/8 hover:bg-[#C3E633]/15 border border-[#C3E633]/30 px-2 py-0.5 rounded transition-colors"
                            >
                              <span>View Web</span>
                              <ArrowRight size={10} className="-rotate-45" />
                            </a>
                          )}
                          <a
                            href={`/portfolio/${activeProject.slug}`}
                            className="inline-flex items-center gap-1 text-[9px] font-mono text-white bg-white/5 hover:bg-white/10 border border-white/20 px-2 py-0.5 rounded transition-colors"
                          >
                            <span>{lang === "en" ? "Read Case Study" : "Baca Studi Kasus"}</span>
                            <ArrowRight size={10} />
                          </a>
                        </div>
                      </div>

                      {/* Case Study Readme section */}
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold flex items-center gap-1.5">
                          <BookOpen size={11} style={{ color: activeProject.color }} />
                          README.md / Problem Statement
                        </div>
                        <div 
                          className="bg-secondary/40 border border-border/50 rounded-xl p-4 text-xs text-muted-foreground leading-relaxed font-sans text-justify border-l-2"
                          style={{ borderLeftColor: activeProject.color }}
                        >
                          {activeProject.caseStudy}
                        </div>
                      </div>

                      {/* Solution section */}
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                          Our Engineered Solution
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-sans text-justify">
                          {activeProject.solution}
                        </p>
                      </div>

                      {/* Key Features list */}
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                          Key Features
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.features.map((feature) => (
                            <span 
                              key={feature}
                              className="px-2.5 py-1 text-[10px] font-mono bg-secondary/80 border border-border/60 rounded text-foreground/80"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Installation terminal snippet */}
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                          Installation Command
                        </div>
                        <div className="bg-[#050505] border border-border/80 rounded-xl p-4 font-mono text-[11px] text-foreground/85 flex items-center justify-between shadow-inner">
                          <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-muted-foreground/60" />
                            <span>npx rcs install {activeProject.slug}</span>
                          </div>
                          <span className="text-[9px] font-mono text-muted-foreground/45 uppercase">bash</span>
                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom status keys bar */}
                <div className="h-10 border-t border-border/70 bg-[#0a0a0a]/65 flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground relative z-10">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">↵</span> Install</span>
                    <span className="flex items-center gap-1"><span className="bg-secondary px-1 py-0.5 rounded border border-border/60 text-foreground">⌘K</span> Action Panel</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Rating:</span>
                    <Star size={10} className="fill-amber-500/80 text-amber-500/80 inline" />
                    <span className="text-foreground">{activeProject.rating}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-xs font-mono text-muted-foreground">
                Select an extension to load preview.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
