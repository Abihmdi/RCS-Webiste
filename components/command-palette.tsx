"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-context"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Home,
  Info,
  Briefcase,
  Users,
  Folder,
  Mail,
  Globe,
  Copy,
  MapPin,
  Terminal,
  Cpu,
} from "lucide-react"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()

  // Handle keydown hotkey (cmd+k or ctrl+k)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Handle trigger from other components
  useEffect(() => {
    const handleToggle = () => setOpen((o) => !o)
    window.addEventListener("toggle-command-palette", handleToggle)
    return () => window.removeEventListener("toggle-command-palette", handleToggle)
  }, [])

  const runCommand = (action: () => void) => {
    action()
    setOpen(false)
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const copyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText("ruangciptasolusi@gmail.com")
      window.dispatchEvent(
        new CustomEvent("console-log", {
          detail: "[COPY] Email PT Ruang Cipta Solusi copied to clipboard.",
        })
      )
    }
  }

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={setOpen}
      title="RCS command-palette"
      description="Run utility commands and navigate pages"
    >
      <CommandInput placeholder={lang === "en" ? "Search for commands..." : "Cari perintah..."} />
      <CommandList className="no-scrollbar">
        <CommandEmpty>{lang === "en" ? "No results found." : "Hasil tidak ditemukan."}</CommandEmpty>
        
        {/* Navigation */}
        <CommandGroup heading={lang === "en" ? "Navigation" : "Navigasi"}>
          <CommandItem onSelect={() => runCommand(() => scrollToSection("home"))} className="cursor-pointer">
            <Home className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Go to Home" : "Berdasar ke Beranda"}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => scrollToSection("about"))} className="cursor-pointer">
            <Info className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Go to About Us" : "Pergi ke Tentang Kami"}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => scrollToSection("services"))} className="cursor-pointer">
            <Briefcase className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Go to Services" : "Pergi ke Layanan"}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => scrollToSection("team"))} className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Go to Team" : "Pergi ke Tim"}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => scrollToSection("portfolio"))} className="cursor-pointer">
            <Folder className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Go to Portfolio" : "Pergi ke Portofolio"}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => scrollToSection("contact"))} className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Go to Contact" : "Pergi ke Kontak"}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Utilities */}
        <CommandGroup heading={lang === "en" ? "Utilities" : "Utilitas"}>
          <CommandItem onSelect={() => runCommand(() => setLang(lang === "en" ? "id" : "en"))} className="cursor-pointer">
            <Globe className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Switch Language to ID" : "Ubah Bahasa ke EN"}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(copyEmail)} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Copy Email Address" : "Salin Alamat Email"}</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => window.open("https://maps.google.com/?q=Pejaten+Barat+Pasar+Minggu+Jakarta+Selatan", "_blank"))} 
            className="cursor-pointer"
          >
            <MapPin className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "View Office Map" : "Lihat Peta Kantor"}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Diagnostics Simulation */}
        <CommandGroup heading={lang === "en" ? "System Commands" : "Perintah Sistem"}>
          <CommandItem 
            onSelect={() => runCommand(() => {
              window.dispatchEvent(
                new CustomEvent("console-log", {
                  detail: "[DIAGNOSTICS] System Diagnostics: ALL SYSTEMS OPERATIONAL. Latency 12ms.",
                })
              )
              scrollToSection("contact")
            })} 
            className="cursor-pointer"
          >
            <Cpu className="mr-2 h-4 w-4 text-[#C3E633]" />
            <span>{lang === "en" ? "Run Diagnostics Healthcheck" : "Jalankan Pemeriksaan Diagnostik"}</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => {
              window.dispatchEvent(new CustomEvent("console-clear"))
              scrollToSection("contact")
            })} 
            className="cursor-pointer"
          >
            <Terminal className="mr-2 h-4 w-4" />
            <span>{lang === "en" ? "Clear Console Logs" : "Bersihkan Log Konsol"}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
