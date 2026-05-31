"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Terminal, Bot, Sparkles, ShieldCheck, Cpu, Star, Download, Globe, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { projects } from "@/components/portfolio-section"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = use(params)
  const { lang } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("last_page", "portfolio")
    }
  }, [])

  const project = projects.find((p) => p.slug === slug)

  // Diagnostics simulator logs
  useEffect(() => {
    if (!project || !mounted) return
    
    const logs = [
      `[SYS] Initializing Diagnostics for extension: ${project.slug}.rcs`,
      `[NET] Fetching repository metrics... OK`,
      `[SYS] Installs detected: ${project.installs} | Rating: ${project.rating}/5.0`,
      `[SYS] Loading feature registry modules...`,
      ...project.features.map(f => `[MOD] Loaded: ${f.toLowerCase().replace(/\s+/g, "_")}_core.bin`),
      `[SYS] Stacking context loaded. Status: SYNCED`
    ]
    
    setConsoleLogs(logs)
  }, [project, mounted])

  if (!mounted) return null
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono p-4 text-xs text-muted-foreground select-none">
        <div className="border border-border/80 rounded-2xl glass p-8 max-w-sm text-center space-y-4">
          <Terminal className="mx-auto text-red-500 w-8 h-8 animate-pulse" />
          <p className="text-white font-bold">[ERROR 404] PROJECT_NOT_FOUND</p>
          <p>The requested project slug `{slug}` does not exist in the RCS registry.</p>
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-[#C3E633] bg-[#C3E633]/10 hover:bg-[#C3E633]/20 border border-[#C3E633]/30 px-3 py-1.5 rounded transition-all mt-2">
            <ArrowLeft size={12} />
            <span>Return to Console</span>
          </Link>
        </div>
      </div>
    )
  }

  const ProjectIcon = project.icon

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden pb-20">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Ambient glow blobs */}
      <div 
        className="orb w-[600px] h-[600px] -top-40 -right-40 opacity-[0.04]"
        style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }}
      />
      <div 
        className="orb w-[500px] h-[500px] -bottom-20 -left-20 opacity-[0.02]"
        style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 max-w-4xl pt-24 relative z-10">
        
        {/* Navigation back */}
        <Link 
          href="/#portfolio" 
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-border/50 rounded-xl px-4 py-2 transition-colors cursor-pointer mb-10 select-none"
        >
          <ArrowLeft size={13} />
          <span>{lang === "en" ? "Back to Registry" : "Kembali ke Registri"}</span>
        </Link>

        {/* Project Header Widget */}
        <div className="glass noise rounded-2xl border border-border/80 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative overflow-hidden mb-8">
          
          <div className="flex items-center gap-4.5">
            <div 
              className="w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 shadow-lg"
              style={{ 
                backgroundColor: `${project.color}05`, 
                borderColor: `${project.color}30`,
                color: project.color
              }}
            >
              <ProjectIcon size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white">
                  {project.title}
                </h1>
                <span 
                  className="text-[9px] font-mono border px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: `${project.color}0a`,
                    borderColor: `${project.color}30`,
                    color: project.color
                  }}
                >
                  {project.category.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-1.5">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 font-mono text-[10px] text-muted-foreground border-t md:border-t-0 border-border/50 pt-4 md:pt-0 w-full md:w-auto shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <Download size={12} className="text-[#C3E633]" />
              <div>
                <div className="text-white font-bold leading-none">{project.installs}</div>
                <div className="text-[8px] mt-0.5">{lang === "en" ? "Downloads" : "Unduhan"}</div>
              </div>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-1.5">
              <Star size={12} className="text-yellow-400 fill-current" />
              <div>
                <div className="text-white font-bold leading-none">{project.rating}</div>
                <div className="text-[8px] mt-0.5">{lang === "en" ? "Rating" : "Penilaian"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Study Case Workspace */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Case Study (Col Span 2) */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Context / Challenge */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold flex items-center gap-1.5 select-none">
                <Cpu size={12} style={{ color: project.color }} />
                <span>01 — {lang === "en" ? "PROBLEM STATEMENT" : "MASALAH UTAMA"}</span>
              </div>
              <div 
                className="bg-secondary/20 border border-border/50 rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed border-l-4 font-sans text-justify"
                style={{ borderLeftColor: project.color }}
              >
                {project.caseStudy}
              </div>
            </div>

            {/* Engineered Solution */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold flex items-center gap-1.5 select-none">
                <Sparkles size={12} style={{ color: project.color }} />
                <span>02 — {lang === "en" ? "OUR ENGINEERED SOLUTION" : "SOLUSI REKAYASA KAMI"}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans text-justify px-1">
                {project.solution}
              </p>
            </div>

            {/* Features Manifest */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold flex items-center gap-1.5 select-none">
                <ShieldCheck size={12} style={{ color: project.color }} />
                <span>03 — {lang === "en" ? "SYSTEM CORE FEATURES" : "FITUR INTI SISTEM"}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="glass noise rounded-xl border border-border/60 p-4 flex gap-3 items-start hover:border-white/10 transition-colors">
                    <span className="font-mono text-xs text-[#C3E633] mt-0.5 select-none">0{idx + 1}.</span>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">{feat}</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
                        {lang === "en" 
                          ? `High-efficiency module optimized for ${project.title.toLowerCase()} enterprise core.`
                          : `Modul efisiensi tinggi dioptimasi untuk operasi utama ${project.title.toLowerCase()}.`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Telemetry Logs (Col Span 1) */}
          <div className="md:col-span-1 space-y-6">
            
            {/* System Console */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold flex items-center gap-1.5 select-none">
                <Terminal size={12} />
                <span>TELEMETRY_LOGS</span>
              </div>
              <div className="bg-[#0a0a0b]/80 border border-border/70 rounded-2xl p-4 font-mono text-[9px] text-muted-foreground space-y-2.5 min-h-[300px] flex flex-col justify-between shadow-inner">
                <div className="space-y-2">
                  {consoleLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed whitespace-pre-wrap break-all">
                      {log}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/40 pt-2 text-[8px] text-white/30 flex justify-between select-none">
                  <span>DEV_MODE: ACTIVE</span>
                  <span>v1.0.0</span>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 text-xs font-semibold px-6 py-3.5 rounded-xl bg-[#C3E633] text-black hover:bg-[#d4f044] transition-all hover:shadow-[0_0_20px_rgba(195,230,51,0.2)] active:scale-[0.98] select-none cursor-pointer"
              >
                <span>{lang === "en" ? "Launch Extension" : "Luncurkan Ekstensi"}</span>
                <ArrowRight size={13} />
              </a>
            ) : (
              <Link
                href="/#contact"
                className="w-full inline-flex items-center justify-center gap-2.5 text-xs font-semibold px-6 py-3.5 rounded-xl bg-white/[0.04] text-white/70 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all active:scale-[0.98] select-none cursor-pointer"
              >
                <span>{lang === "en" ? "Request Diagnostics" : "Ajukan Diagnostik"}</span>
                <ArrowRight size={13} className="text-[#C3E633]" />
              </Link>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
