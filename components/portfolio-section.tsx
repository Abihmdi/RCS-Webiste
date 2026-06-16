"use client"

import { useState, useRef, useMemo, useCallback, useEffect, memo } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Smartphone, Globe, Database, Building2, Search, Terminal, BookOpen, Chrome, ArrowRight } from "lucide-react"
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
    color: "#ECFF8A",
    client: "Public Release",
    year: "2024",
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
    client: "Bill Muhdor",
    year: "2024",
    type: "CRM",
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
    client: "Braincoach ID",
    year: "2023",
    type: "Web App",
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
    color: "#ECFF8A",
    client: "Heystetik",
    year: "2023",
    type: "Mobile App",
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
    color: "#ECFF8A",
    client: "Hospital Client",
    year: "2023",
    type: "ERP",
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
    client: "Enterprise Client",
    year: "2024",
    type: "SaaS",
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
    color: "#ECFF8A",
    client: "Travel Agency",
    year: "2023",
    type: "ERP",
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
    color: "#ECFF8A",
    client: "Security Firm",
    year: "2024",
    type: "Mobile App",
  },
]

export const projectsTranslations = {
  en: [
    {
      subtitle: "Chrome Extension & Second Brain",
      caseStudy: "Users struggle to digest long-form web articles, draft context-aware replies, and retain knowledge across multiple browser tabs, causing information overload and fractured productivity.",
      solution: "We engineered Aksara AI, a Chrome extension that serves as a context-aware second brain. It allows users to summarize articles, draft email/social replies with custom tones, translate line-by-line, and save searchable highlights locally.",
      features: ["Instant Summarizer", "AI Reply Generator", "Local Vector Memory", "Inline Translator", "No-Setup Groq Integration"],
      type: "Extension"
    },
    {
      subtitle: "CRM Implementation",
      caseStudy: "Bill Muhdor, juggling art sales, workshops, and client communication, needs a better system. Manual management creates missed leads, booking errors, and hinders client relationships.",
      solution: "We implement a customized CRM for Bill Muhdor, enhancing his team's ability to manage customer information and communication, as well as facilitating marketing aspects and operational aspects of his art business.",
      features: ["Customer Management", "Marketing Automation", "Operational Efficiency"],
      type: "CRM"
    },
    {
      subtitle: "Cognitive Assessment Website",
      caseStudy: "Traditional methods for assessing cognitive function are unreliable, making it hard to diagnose dementia early. This delays treatment and worsens patient outcomes.",
      solution: "We created Braincoach, a website designed for cognitive assessment and training. Leveraging AI capabilities, Braincoach supports accurate assessment and provides cognitive training games to enhance brain function.",
      features: ["Cognitive Assessment (MOCA INA)", "AI Integration", "Training Games"],
      type: "Web App"
    },
    {
      subtitle: "Beauty Clinic Application",
      caseStudy: "Beauty clinics juggle scattered data, manual tasks, and weak patient connections. This chaos disrupts appointment bookings, sales, and community building.",
      solution: "We have developed Heystetik, an innovative application designed for beauty clinics. Heystetik allows users to consult with doctors, book treatments, purchase skincare products, and engage in discussions with other users through streaming features.",
      features: ["Doctor Consultation", "Treatment Booking", "Commerce", "Stream", "Progress Tracker"],
      type: "Mobile App"
    },
    {
      subtitle: "ERP Implementation",
      caseStudy: "Disconnected hospital systems (registration, appointments, inventory, pharmacy, billing) cause delays, errors, and information gaps. This frustrates staff, hinders care, and hurts the overall hospital experience.",
      solution: "Our Hospital Management System provides an integrated platform to handle all hospital operations efficiently. This system also includes ERP-based medical record management.",
      features: ["Patient Registration", "Doctor & Clinic Management", "Inventory and Pharmacy", "Billing System", "Medical Record"],
      type: "ERP"
    },
    {
      subtitle: "Recruitment Management System",
      caseStudy: "The surge in applications and manual processes for tasks like administering tests, scoring results, and scheduling interviews are creating bottlenecks for recruiters.",
      solution: "We are developing a Recruitment Tool to automate daily recruitment tasks, including test administration, automated scoring, and interview scheduling integrated with email, Google Calendar, and video conferencing tools.",
      features: ["Automated Testing", "Interview Scheduling", "Operational Automation"],
      type: "SaaS"
    },
    {
      subtitle: "Travel ERP Software",
      caseStudy: "A travel agency using disconnected systems for bookings, quotes, invoices, and operations faces challenges in providing accurate information to clients and tracking overall business performance.",
      solution: "Travelator is an ERP software specifically designed to simplify travel business operations. It streamlines various aspects of travel management, including bookings, quotations, billing, task management, and financial tracking.",
      features: ["Order Management", "Offers and Billing", "Task Management", "Revenue & Expenditure Management"],
      type: "ERP"
    },
    {
      subtitle: "Patrol Management Application",
      caseStudy: "Inefficient patrol management (gaps, missed patrols, slow response) creates operational risks and eats into profits. Expensive patrol devices add another financial burden.",
      solution: "Vistral is a patrol management application that simplifies attendance tracking, patrol management, and emergency responses. This application utilizes QR codes for attendance verification and ERP-based patrols.",
      features: ["Attendance Tracking", "Patrol Management", "SOS Button", "Anti Fake GPS"],
      type: "Mobile App"
    }
  ],
  id: [
    {
      subtitle: "Ekstensi Chrome & Asisten Otak Kedua",
      caseStudy: "Pengguna kesulitan mencerna artikel web yang panjang, menyusun draf balasan yang peka konteks, dan mempertahankan informasi di banyak tab browser, yang mengakibatkan kelebihan informasi dan produktivitas terhambat.",
      solution: "Kami merancang Aksara AI, sebuah ekstensi Chrome yang berfungsi sebagai otak kedua yang peka konteks. Memungkinkan pengguna merangkum artikel secara instan, membuat draf email/media sosial dengan nada kustom, menerjemahkan baris demi baris, serta menyimpan poin penting secara lokal.",
      features: ["Perangkum Instan", "Pembuat Balasan AI", "Memori Vektor Lokal", "Penerjemah Sebaris", "Integrasi Groq Tanpa Setup"],
      type: "Ekstensi"
    },
    {
      subtitle: "Implementasi CRM",
      caseStudy: "Bill Muhdor, yang mengelola penjualan karya seni, lokakarya, dan komunikasi klien, membutuhkan sistem yang lebih baik. Manajemen manual menyebabkan hilangnya prospek, kesalahan pemesanan, dan menghambat hubungan dengan klien.",
      solution: "Kami mengimplementasikan CRM kustom untuk Bill Muhdor, meningkatkan kemampuan timnya dalam mengelola informasi dan komunikasi pelanggan, serta memfasilitasi aspek pemasaran dan operasional bisnis seninya.",
      features: ["Manajemen Pelanggan", "Otomatisasi Pemasaran", "Efisiensi Operasional"],
      type: "CRM"
    },
    {
      subtitle: "Website Penilaian Kognitif",
      caseStudy: "Metode tradisional untuk menilai fungsi kognitif kurang andal, menyulitkan diagnosis dini demensia. Hal ini menunda perawatan dan memperburuk kondisi pasien.",
      solution: "Kami membangun Braincoach, sebuah platform web untuk penilaian dan pelatihan kognitif. Memanfaatkan kemampuan AI, Braincoach mendukung penilaian yang akurat dan menyediakan permainan latihan kognitif untuk meningkatkan fungsi otak.",
      features: ["Penilaian Kognitif (MOCA INA)", "Integrasi AI", "Game Latihan Otak"],
      type: "Web App"
    },
    {
      subtitle: "Aplikasi Klinik Kecantikan",
      caseStudy: "Klinik kecantikan sering kali menghadapi masalah data yang tersebar, tugas-tugas manual, dan lemahnya hubungan dengan pasien. Hal ini mengacaukan pemesanan janji temu, penjualan, dan pembangunan komunitas.",
      solution: "Kami mengembangkan Heystetik, aplikasi inovatif untuk klinik kecantikan. Heystetik memungkinkan pengguna berkonsultasi dengan dokter, memesan perawatan, membeli produk perawatan kulit, dan berdiskusi melalui fitur streaming.",
      features: ["Konsultasi Dokter", "Pemesanan Perawatan", "E-Commerce", "Fitur Streaming", "Pelacak Kemajuan"],
      type: "Mobile App"
    },
    {
      subtitle: "Implementasi ERP",
      caseStudy: "Sistem rumah sakit yang terfragmentasi (registrasi, janji temu, inventaris, farmasi, penagihan) menyebabkan penundaan, kesalahan data, dan celah informasi. Hal ini menghambat pelayanan medis.",
      solution: "Sistem Manajemen Rumah Sakit kami menyediakan platform terintegrasi untuk mengelola seluruh operasional rumah sakit secara efisien, lengkap dengan manajemen rekam medis berbasis ERP.",
      features: ["Registrasi Pasien", "Manajemen Dokter & Klinik", "Inventaris & Farmasi", "Sistem Penagihan", "Rekam Medis Digital"],
      type: "ERP"
    },
    {
      subtitle: "Sistem Manajemen Rekrutmen",
      caseStudy: "Lonjakan lamaran kerja dan proses manual untuk tugas seperti ujian, penilaian, dan penjadwalan wawancara menciptakan hambatan besar bagi perekrut.",
      solution: "Kami mengembangkan Sistem Rekrutmen untuk mengotomatisasi tugas harian HRD, termasuk pelaksanaan tes online, penilaian otomatis, dan penjadwalan wawancara yang terintegrasi dengan email serta kalender.",
      features: ["Ujian Otomatis", "Penjadwalan Wawancara", "Otomatisasi Operasional"],
      type: "SaaS"
    },
    {
      subtitle: "Software ERP Agen Perjalanan",
      caseStudy: "Agen perjalanan yang menggunakan sistem terpisah untuk pemesanan, penawaran harga, faktur, dan operasional menghadapi kendala dalam menyajikan data akurat dan melacak kinerja keuangan bisnis.",
      solution: "Travelator adalah software ERP yang dirancang khusus untuk menyederhanakan operasional bisnis agen perjalanan. Membantu pemesanan, pembuatan kuotasi harga, penagihan, manajemen tugas, serta pelacakan arus kas.",
      features: ["Manajemen Pesanan", "Penawaran & Penagihan", "Manajemen Tugas", "Pengelolaan Pendapatan & Pengeluaran"],
      type: "ERP"
    },
    {
      subtitle: "Aplikasi Manajemen Patroli Keamanan",
      caseStudy: "Manajemen patroli yang tidak efisien (adanya celah patroli, keterlambatan respons darurat) memicu risiko keamanan tinggi dan merugikan operasional. Ditambah mahalnya biaya perangkat patroli khusus.",
      solution: "Vistral adalah aplikasi manajemen patroli yang menyederhanakan pelacakan kehadiran, rute patroli, dan respons darurat. Aplikasi ini memanfaatkan verifikasi berbasis QR code dan patroli terintegrasi ERP.",
      features: ["Pelacakan Kehadiran", "Manajemen Rute Patroli", "Tombol Darurat SOS", "Anti-GPS Palsu"],
      type: "Mobile App"
    }
  ]
}

const ProjectCard = memo(({ 
  id,
  project, 
  isSelected, 
  onClick, 
  lang 
}: { 
  id: number
  project: typeof projects[number]
  isSelected: boolean
  onClick: (id: number) => void
  lang: string
}) => {
  const ProjectIcon = project.icon
  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 border text-left cursor-pointer ${
          isSelected 
            ? "bg-[#242424] border-white/10" 
            : "bg-transparent border-transparent hover:bg-[#242424]/30"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0"
            style={{ 
              background: `radial-gradient(circle, ${project.color}15, transparent 80%)`
            }}
          >
            <ProjectIcon size={16} style={{ color: project.color }} />
          </div>
          <div className="min-w-0">
            <div className="text-sm md:text-xs font-mono font-bold text-foreground truncate flex items-center gap-1.5">
              {project.title}
              <span className="text-[10px] font-mono text-muted-foreground/85">@rcs</span>
            </div>
            <div className="text-xs md:text-[10px] text-muted-foreground font-mono truncate leading-normal">
              {project.subtitle}
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0 ml-3">
          <div className="flex items-center gap-0.5 text-xs md:text-[10px] font-mono text-muted-foreground/70">
            <Building2 size={10} />
            <span>{project.client}</span>
          </div>
          <div className="flex items-center gap-0.5 text-xs md:text-[10px] font-mono text-muted-foreground/70">
            <span>{project.year}</span>
          </div>
        </div>

        {/* Mobile Arrow/Chevron Indicator */}
        <div className="flex md:hidden items-center text-muted-foreground/75 ml-auto">
          <motion.div
            animate={{ rotate: isSelected ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={14} className="text-[#ECFF8A]" />
          </motion.div>
        </div>
      </button>

      {/* Inline Detail View for Mobile (only if selected, animated using CSS grid transition) */}
      <div
        className="grid md:hidden transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          gridTemplateRows: isSelected ? "1fr" : "0fr",
          opacity: isSelected ? 1 : 0,
          willChange: "grid-template-rows, opacity"
        }}
      >
        <div className="overflow-hidden">
          <div className="p-3.5 mt-2 bg-[#141414]/50 backdrop-blur-md border border-white/5 rounded-lg space-y-3.5">
            
            {/* Client & Year info for Mobile */}
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5">
                <Building2 size={11} className="text-[#ECFF8A]" />
                <span className="text-foreground/90 font-medium">{project.client}</span>
              </span>
              <span className="text-foreground/90">{project.year}</span>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-2">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-[#e7c59a] bg-[#e7c59a]/8 hover:bg-[#e7c59a]/15 border border-[#e7c59a]/30 px-2.5 py-1 rounded transition-colors"
                >
                  <span>{lang === "en" ? "View Web" : "Lihat Web"}</span>
                  <ArrowRight size={10} className="-rotate-45" />
                </a>
              )}
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-1 text-[10px] font-mono text-white bg-white/5 hover:bg-white/10 border border-white/20 px-2.5 py-1 rounded transition-colors"
              >
                <span>{lang === "en" ? "Read Case Study" : "Baca Studi Kasus"}</span>
                <ArrowRight size={10} />
              </Link>
            </div>

            {/* Problem Statement */}
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold flex items-center gap-1.5">
                <BookOpen size={10} style={{ color: project.color }} />
                {lang === "en" ? "Problem Statement" : "Pernyataan Masalah"}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                {project.caseStudy}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                {lang === "en" ? "Solution" : "Solusi"}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                {project.solution}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                {lang === "en" ? "Key Features" : "Fitur Utama"}
              </div>
              <div className="flex flex-wrap gap-1">
                {project.features.map((feat) => (
                  <span key={feat} className="px-2 py-0.5 text-[9px] font-mono bg-[#242424]/30 border border-white/5 rounded text-foreground/80">
                    {feat}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
})

ProjectCard.displayName = "ProjectCard"

export function PortfolioSection() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Detect mobile to disable 3D tilt
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Spring-based 3D tilt logic (desktop only)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(1)

  const handleCardClick = useCallback((id: number) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }, [])

  const localizedProjects = useMemo(() => {
    return projects.map((project, idx) => ({
      ...project,
      subtitle: projectsTranslations[lang][idx].subtitle,
      caseStudy: projectsTranslations[lang][idx].caseStudy,
      solution: projectsTranslations[lang][idx].solution,
      features: projectsTranslations[lang][idx].features,
      type: projectsTranslations[lang][idx].type
    }))
  }, [lang])

  // Filter projects by category and query
  const filteredProjects = useMemo(() => {
    return localizedProjects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.caseStudy.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [localizedProjects, activeCategory, searchQuery])

  // Select first match if current selectedId is not in filtered list
  const activeProject = useMemo(() => {
    if (selectedId === null) return null
    const current = localizedProjects.find((p) => p.id === selectedId)
    if (current && filteredProjects.some((p) => p.id === selectedId)) {
      return current
    }
    return filteredProjects[0] || null
  }, [localizedProjects, filteredProjects, selectedId])

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      {/* Ambient glowing orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#ECFF8A]/2 -top-20 -left-20" />
      <div className="orb w-[500px] h-[500px] bg-[#FFFFFF]/1 -bottom-20 -right-20" />

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

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            {t("portfolio_heading_1")} <span className="gradient-text">{t("portfolio_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("portfolio_description")}
          </p>
        </motion.div>

        {/* Raycast Store Console Window */}
        <div style={{ perspective: 1200 }} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
            className="glass noise rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-10 md:h-[640px] will-change-transform"
          >
          {/* Header Row - Col span 10 */}
          <div className="col-span-10 h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#242424]/30 relative z-20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            {/* Search Input Bar inside Header */}
            <div className="flex items-center gap-2 bg-[#080808]/40 border border-white/10 rounded-lg px-2.5 py-1 flex-1 max-w-[180px] xs:max-w-[260px] md:w-96 md:flex-initial shadow-inner">
              <Search size={12} className="text-muted-foreground/85" />
              <input
                type="text"
                placeholder={lang === "en" ? "Search extensions..." : "Cari karya/proyek..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm md:text-xs font-mono text-foreground placeholder:text-muted-foreground/60 border-none outline-none w-full"
              />
              <span className="hidden sm:inline-block text-[10px] font-mono bg-[#242424] border border-white/10 px-1.5 py-0.5 rounded text-muted-foreground">⌘F</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
              <span>ruangciptasolusi.com/portfolio</span>
            </div>
          </div>

          {/* Left Column: Side categories filter & list (Col span 5) */}
          <div className="col-span-5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-[#080808]/40 md:h-[calc(100%-48px)] overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Category selector row */}
              <div className="flex gap-1.5 p-3 overflow-x-auto border-b border-white/10 no-scrollbar">
                {categories.map((category) => {
                  const isActive = activeCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category)
                      }}
                      className={`relative px-3.5 py-1.5 text-xs md:text-[10px] font-mono font-medium rounded-full cursor-pointer transition-all duration-300 ${
                        isActive 
                          ? "text-foreground font-semibold" 
                          : "text-muted-foreground hover:text-foreground border border-white/10 hover:border-[#5a5a5a]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeStoreCategory"
                          className="absolute inset-0 rounded-full bg-[#242424] border border-white/10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">
                        {category === "All" ? (lang === "en" ? "All" : "Semua") : category}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Extensions list */}
              <div className="flex-grow overflow-y-auto p-3 space-y-1.5 no-scrollbar">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-2 mb-2 font-semibold flex items-center justify-between">
                  <span>{lang === "en" ? "Results" : "Hasil"}</span>
                  <span>{filteredProjects.length} {lang === "en" ? "matching" : "cocok"}</span>
                </div>
                
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      project={project}
                      isSelected={activeProject?.id === project.id}
                      onClick={handleCardClick}
                      lang={lang}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-xs font-mono text-muted-foreground">
                      {lang === "en" ? "No extensions found." : "Proyek tidak ditemukan."}
                    </div>
                    <button 
                      onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                      className="mt-3 text-[10px] font-mono text-[#ECFF8A] underline cursor-pointer"
                    >
                      {lang === "en" ? "Clear search filters" : "Hapus filter pencarian"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Extension Detailed View (Col span 5) - hidden on mobile, flex on desktop */}
          <div className="hidden md:flex col-span-5 flex-col justify-between md:h-[calc(100%-48px)] bg-[#0d0d0e]/40 overflow-hidden relative">
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
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      {/* Header with Title & Install Command */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-14 h-14 rounded-lg flex items-center justify-center border border-white/10"
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
                          <span className="text-[10px] font-mono bg-green-500/10 border border-green-500/30 text-green-400 px-2 py-0.5 rounded-full">
                            RELEASED
                          </span>
                          {activeProject.url && (
                            <a
                              href={activeProject.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-mono text-[#ECFF8A] bg-[#ECFF8A]/8 hover:bg-[#ECFF8A]/15 border border-[#ECFF8A]/30 px-2 py-0.5 rounded-lg transition-colors"
                            >
                              <span>{lang === "en" ? "View Web" : "Lihat Web"}</span>
                              <ArrowRight size={10} className="-rotate-45" />
                            </a>
                          )}
                          <Link
                            href={`/portfolio/${activeProject.slug}`}
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-white bg-white/5 hover:bg-white/10 border border-white/20 px-2 py-0.5 rounded transition-colors"
                          >
                            <span>{lang === "en" ? "Read Case Study" : "Baca Studi Kasus"}</span>
                            <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>

                      {/* Case Study Readme section */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold flex items-center gap-1.5">
                          <BookOpen size={11} style={{ color: activeProject.color }} />
                          README.md / {lang === "en" ? "Problem Statement" : "Pernyataan Masalah"}
                        </div>
                        <div 
                          className="bg-[#242424]/30 border border-white/10 rounded-lg p-4 text-sm md:text-xs text-muted-foreground leading-relaxed font-sans text-justify border-l-2"
                          style={{ borderLeftColor: activeProject.color }}
                        >
                          {activeProject.caseStudy}
                        </div>
                      </div>

                      {/* Solution section */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                          {lang === "en" ? "Our Engineered Solution" : "Solusi Rekayasa Kami"}
                        </div>
                        <p className="text-sm md:text-xs text-muted-foreground leading-relaxed font-sans text-justify">
                          {activeProject.solution}
                        </p>
                      </div>

                      {/* Key Features list */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                          {lang === "en" ? "Key Features" : "Fitur Utama"}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.features.map((feature) => (
                            <span 
                              key={feature}
                              className="px-2.5 py-1 text-xs md:text-[10px] font-mono bg-[#242424]/30 border border-white/5 rounded-lg text-foreground/85"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Installation terminal snippet */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase font-semibold">
                          {lang === "en" ? "Installation Command" : "Perintah Instalasi"}
                        </div>
                        <div className="bg-[#080808] border border-white/10 rounded-lg p-4 font-mono text-xs md:text-[11px] text-foreground/85 flex items-center justify-between shadow-inner">
                          <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-muted-foreground/85" />
                            <span>npx rcs install {activeProject.slug}</span>
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground/75 uppercase">bash</span>
                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom status keys bar */}
                <div className="h-10 border-t border-white/10 bg-[#0a0a0a]/65 flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground relative z-10">
                  <div className="hidden sm:flex items-center gap-4">
                    <span className="flex items-center gap-1"><span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold">↵</span> {lang === "en" ? "Install" : "Instal"}</span>
                    <span className="flex items-center gap-1"><span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold">⌘K</span> {lang === "en" ? "Action Panel" : "Panel Aksi"}</span>
                  </div>
                  <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="sm:hidden font-semibold">{lang === "en" ? "Project Details" : "Detail Proyek"}</span>
                    <span className="flex items-center gap-1">
                      <span>{lang === "en" ? "Year:" : "Tahun:"}</span>
                      <span className="text-foreground">{activeProject.year}</span>
                    </span>
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
      </div>
    </section>
  )
}
