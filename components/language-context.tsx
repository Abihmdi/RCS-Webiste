"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Lang = "en" | "id"

type Translations = {
  // Navbar / Announcement
  nav_announcement: string
  nav_learn_more: string
  nav_home: string
  nav_about: string
  nav_services: string
  nav_team: string
  nav_portfolio: string
  nav_contact: string
  nav_get_started: string

  // Hero
  hero_pill: string
  hero_heading_1: string
  hero_heading_2: string
  hero_heading_accent: string
  hero_description: string
  hero_cta_primary: string
  hero_cta_secondary: string
  hero_telemetry_label: string

  // About
  about_pill: string
  about_heading_1: string
  about_heading_accent: string
  about_description: string
  about_mission_label: string
  about_mission_text: string
  about_specs_label: string
  about_spec_entity: string
  about_spec_entity_value: string
  about_spec_specialization: string
  about_spec_specialization_value: string
  about_spec_role: string
  about_spec_role_value: string
  about_spec_address: string
  about_spec_address_value: string
  about_deliverables_label: string
  about_deliverable_1: string
  about_deliverable_2: string
  about_deliverable_3: string
  about_stacks_label: string
  about_status_synced: string
  about_status_modules: string
  about_verified: string
  about_stat_exp_label: string
  about_stat_exp_value: string
  about_stat_exp_badge: string
  about_stat_del_label: string
  about_stat_del_value: string
  about_stat_del_badge: string
  about_stat_sat_label: string
  about_stat_sat_value: string
  about_stat_sat_badge: string

  // Services
  services_pill: string
  services_heading_1: string
  services_heading_accent: string
  services_description: string
  services_cta: string

  // Team
  team_pill: string
  team_heading_1: string
  team_heading_accent: string
  team_description: string

  // Portfolio
  portfolio_pill: string
  portfolio_heading_1: string
  portfolio_heading_accent: string
  portfolio_description: string
  portfolio_view_live: string
  portfolio_view_code: string

  // Contact
  contact_pill: string
  contact_heading_1: string
  contact_heading_accent: string
  contact_description: string
  contact_name_label: string
  contact_name_placeholder: string
  contact_email_label: string
  contact_email_placeholder: string
  contact_company_label: string
  contact_company_placeholder: string
  contact_message_label: string
  contact_message_placeholder: string
  contact_submit: string
  contact_submitting: string
  contact_success: string
  contact_error: string
  contact_info_email: string
  contact_info_location: string
  contact_info_hours: string
  contact_info_response: string

  // Footer
  footer_tagline: string
  footer_rights: string
  footer_links_title: string
  footer_social_title: string
}

const en: Translations = {
  // Navbar / Announcement
  nav_announcement: "RCS Launches AI-Native Enterprise Solutions —",
  nav_learn_more: "Learn More",
  nav_home: "Home",
  nav_about: "About",
  nav_services: "Services",
  nav_team: "Team",
  nav_portfolio: "Portfolio",
  nav_contact: "Contact",
  nav_get_started: "Get Started",

  // Hero
  hero_pill: "Digital Transformation Partner",
  hero_heading_1: "PROVIDING",
  hero_heading_accent: "VALUABLE",
  hero_heading_2: "RESULTS",
  hero_description:
    "We optimize business outcomes through digitalisation. Strategy meets execution to build your next-generation digital presence.",
  hero_cta_primary: "Start a Project",
  hero_cta_secondary: "See Our Work",
  hero_telemetry_label: "System Telemetry",

  // About
  about_pill: "01 — System Diagnostics",
  about_heading_1: "WHO WE",
  about_heading_accent: "ARE",
  about_description:
    "PT Ruang Cipta Solusi (RCS) is engineered to align high-level strategy with pixel-perfect technical execution.",
  about_mission_label: "MISSION_STATEMENT",
  about_mission_text:
    "We optimize business outcomes through digitalisation. Value is only realized when business condition diagnosis meets precise, lasting solutions. We take responsibility for your entire technology layer.",
  about_specs_label: "SYSTEM_SPECIFICATIONS",
  about_spec_entity: "Entity:",
  about_spec_entity_value: "PT Ruang Cipta Solusi",
  about_spec_specialization: "Specialization:",
  about_spec_specialization_value: "Digital Transformation",
  about_spec_role: "Role Scope:",
  about_spec_role_value: "Full-Stack Partner",
  about_spec_address: "Main Address:",
  about_spec_address_value: "Jakarta Selatan, ID",
  about_deliverables_label: "DELIVERABLES_MANIFEST",
  about_deliverable_1: "Improve management efficiency",
  about_deliverable_2: "Effective customer management",
  about_deliverable_3: "Build client internet presence & trust",
  about_stacks_label: "DEPENDENCY_STACKS",
  about_status_synced: "SYNCED",
  about_status_modules: "8 Loaded",
  about_verified: "Verified Cloud Service Partner",
  about_stat_exp_label: "Experience",
  about_stat_exp_value: "3+ Years",
  about_stat_exp_badge: "Senior",
  about_stat_del_label: "Delivered",
  about_stat_del_value: "50+ Projects",
  about_stat_del_badge: "Prod",
  about_stat_sat_label: "Satisfaction",
  about_stat_sat_value: "98% Rate",
  about_stat_sat_badge: "Max",

  // Services
  services_pill: "02 — Service Registry",
  services_heading_1: "WHAT WE",
  services_heading_accent: "BUILD",
  services_description:
    "End-to-end digital solutions engineered for scale. From strategy to deployment, we handle every layer of your technology stack.",
  services_cta: "Start a Project",

  // Team
  team_pill: "03 — Core Contributors",
  team_heading_1: "THE",
  team_heading_accent: "TEAM",
  team_description:
    "A specialized unit of engineers, designers, and strategists focused on delivering elite digital outcomes.",

  // Portfolio
  portfolio_pill: "04 — Project Registry",
  portfolio_heading_1: "OUR",
  portfolio_heading_accent: "WORK",
  portfolio_description:
    "Battle-tested projects shipped to production. Real clients, real impact, measurable results.",
  portfolio_view_live: "Live",
  portfolio_view_code: "Code",

  // Contact
  contact_pill: "05 — Initialize Connection",
  contact_heading_1: "LET'S",
  contact_heading_accent: "CONNECT",
  contact_description:
    "Ready to transform your business? Send us a command and we'll respond within 24 hours.",
  contact_name_label: "Full Name",
  contact_name_placeholder: "Your name",
  contact_email_label: "Email Address",
  contact_email_placeholder: "your@email.com",
  contact_company_label: "Company / Organization",
  contact_company_placeholder: "Your company name",
  contact_message_label: "Message",
  contact_message_placeholder: "Tell us about your project...",
  contact_submit: "Send Message",
  contact_submitting: "Sending...",
  contact_success: "Message sent successfully! We'll be in touch soon.",
  contact_error: "Failed to send message. Please try again.",
  contact_info_email: "Email",
  contact_info_location: "Location",
  contact_info_hours: "Working Hours",
  contact_info_response: "Response Time",

  // Footer
  footer_tagline: "Engineering digital futures for ambitious businesses.",
  footer_rights: "All rights reserved.",
  footer_links_title: "Quick Links",
  footer_social_title: "Connect",
}

const id: Translations = {
  // Navbar / Announcement
  nav_announcement: "RCS Luncurkan Solusi Enterprise AI-Native —",
  nav_learn_more: "Pelajari Selengkapnya",
  nav_home: "Beranda",
  nav_about: "Tentang Kami",
  nav_services: "Layanan",
  nav_team: "Tim",
  nav_portfolio: "Portofolio",
  nav_contact: "Kontak",
  nav_get_started: "Mulai Sekarang",

  // Hero
  hero_pill: "Mitra Transformasi Digital",
  hero_heading_1: "MEMBERIKAN",
  hero_heading_accent: "HASIL",
  hero_heading_2: "TERBAIK",
  hero_description:
    "Kami mengoptimalkan kinerja bisnis melalui digitalisasi. Strategi berpadu eksekusi untuk membangun eksistensi digital masa depan Anda.",
  hero_cta_primary: "Mulai Proyek",
  hero_cta_secondary: "Lihat Portofolio",
  hero_telemetry_label: "Telemetri Sistem",

  // About
  about_pill: "01 — Diagnostik Sistem",
  about_heading_1: "SIAPA",
  about_heading_accent: "KAMI",
  about_description:
    "PT Ruang Cipta Solusi (RCS) dirancang untuk menyelaraskan strategi tingkat tinggi dengan eksekusi teknis yang presisi dan sempurna.",
  about_mission_label: "PERNYATAAN_MISI",
  about_mission_text:
    "Kami mengoptimalkan hasil bisnis melalui digitalisasi. Nilai nyata hanya terwujud ketika diagnosis kondisi bisnis berpadu dengan solusi yang tepat dan berkelanjutan. Kami bertanggung jawab penuh atas seluruh infrastruktur teknologi Anda.",
  about_specs_label: "SPESIFIKASI_SISTEM",
  about_spec_entity: "Entitas:",
  about_spec_entity_value: "PT Ruang Cipta Solusi",
  about_spec_specialization: "Spesialisasi:",
  about_spec_specialization_value: "Transformasi Digital",
  about_spec_role: "Cakupan Peran:",
  about_spec_role_value: "Mitra Full-Stack",
  about_spec_address: "Alamat Utama:",
  about_spec_address_value: "Jakarta Selatan, Indonesia",
  about_deliverables_label: "DAFTAR_DELIVERABLE",
  about_deliverable_1: "Meningkatkan efisiensi manajemen",
  about_deliverable_2: "Pengelolaan pelanggan secara efektif",
  about_deliverable_3: "Membangun eksistensi & kredibilitas digital klien",
  about_stacks_label: "STACK_TEKNOLOGI",
  about_status_synced: "TERINTEGRASI",
  about_status_modules: "8 Dimuat",
  about_verified: "Mitra Layanan Cloud Terverifikasi",
  about_stat_exp_label: "Pengalaman",
  about_stat_exp_value: "3+ Tahun",
  about_stat_exp_badge: "Senior",
  about_stat_del_label: "Proyek Selesai",
  about_stat_del_value: "50+ Proyek",
  about_stat_del_badge: "Prod",
  about_stat_sat_label: "Tingkat Kepuasan",
  about_stat_sat_value: "Tingkat 98%",
  about_stat_sat_badge: "Maks",

  // Services
  services_pill: "02 — Registri Layanan",
  services_heading_1: "APA YANG",
  services_heading_accent: "KAMI BANGUN",
  services_description:
    "Solusi digital end-to-end yang dirancang untuk skala besar. Mulai dari strategi hingga deployment, kami menangani setiap lapisan infrastruktur teknologi Anda.",
  services_cta: "Mulai Proyek",

  // Team
  team_pill: "03 — Kontributor Inti",
  team_heading_1: "TIM",
  team_heading_accent: "KAMI",
  team_description:
    "Tim spesialis yang terdiri dari engineer, desainer, dan ahli strategi yang berfokus untuk menghasilkan solusi digital terbaik.",

  // Portfolio
  portfolio_pill: "04 — Registri Proyek",
  portfolio_heading_1: "KARYA",
  portfolio_heading_accent: "KAMI",
  portfolio_description:
    "Proyek-proyek teruji yang telah diluncurkan ke tahap produksi. Klien nyata, dampak nyata, dan hasil yang terukur.",
  portfolio_view_live: "Live",
  portfolio_view_code: "Kode",

  // Contact
  contact_pill: "05 — Inisiasi Koneksi",
  contact_heading_1: "MARI",
  contact_heading_accent: "TERHUBUNG",
  contact_description:
    "Siap mentransformasi bisnis Anda? Hubungi kami dan kami akan merespons pesan Anda dalam waktu 24 jam.",
  contact_name_label: "Nama Lengkap",
  contact_name_placeholder: "Nama Anda",
  contact_email_label: "Alamat Email",
  contact_email_placeholder: "email@anda.com",
  contact_company_label: "Perusahaan / Organisasi",
  contact_company_placeholder: "Nama perusahaan Anda",
  contact_message_label: "Pesan",
  contact_message_placeholder: "Ceritakan tentang proyek Anda...",
  contact_submit: "Kirim Pesan",
  contact_submitting: "Mengirim...",
  contact_success: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
  contact_error: "Gagal mengirim pesan. Silakan coba lagi.",
  contact_info_email: "Email",
  contact_info_location: "Lokasi",
  contact_info_hours: "Jam Kerja",
  contact_info_response: "Waktu Respons",

  // Footer
  footer_tagline: "Merancang masa depan digital untuk bisnis yang ambisius.",
  footer_rights: "Seluruh hak cipta dilindungi.",
  footer_links_title: "Tautan Cepat",
  footer_social_title: "Terhubung",
}

const translations: Record<Lang, Translations> = { en, id }

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  const t = (key: keyof Translations): string => translations[lang][key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
