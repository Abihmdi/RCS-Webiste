"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquareCode, X, Send, Bot, Sparkles, Terminal, ShieldCheck, Copy, Check } from "lucide-react"
import { useLanguage } from "@/components/language-context"

interface Message {
  sender: "user" | "bot"
  text: string
  timestamp: string
}

export function AIAssistant() {
  const { lang, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Hydration safety check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize welcome message when language changes
  useEffect(() => {
    if (!mounted) return
    const welcomeText = lang === "en" 
      ? "Hello! I am RCS Copilot, your AI assistant. How can I help you build your next digital solution today? Ask me about our services, portfolio, or office locations!"
      : "Halo! Saya RCS Copilot, asisten AI Anda. Ada yang bisa saya bantu untuk membangun solusi digital Anda hari ini? Tanyakan kepada saya tentang layanan, portofolio, atau lokasi kantor kami!"
    
    setMessages([
      {
        sender: "bot",
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }, [lang, mounted])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  // Alert dot handler
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true)
    }
  }, [messages, isOpen])

  const handleOpenToggle = () => {
    setIsOpen(!isOpen)
    setHasNewMessage(false)
  }

  if (!mounted) return null

  // Local rule-based AI responder
  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase()
    
    // 1. Portfolio
    if (q.includes("portfolio") || q.includes("projek") || q.includes("project") || q.includes("vistral") || q.includes("aksara") || q.includes("heystetik") || q.includes("braincoach") || q.includes("travelator")) {
      if (lang === "en") {
        return "We have built several high-performance products:\n\n• **Aksara AI**: Context-aware Chrome Extension & Second Brain.\n• **Vistral**: High-security patrol management app (optimized from Patrolink).\n• **Heystetik**: E-commerce, doctor consultation & streaming for beauty clinics.\n• **Braincoach**: Cognitive training & AI assessment web app.\n\nYou can see them inside the **Portfolio** section in detail!"
      } else {
        return "Kami telah membangun beberapa produk berkinerja tinggi:\n\n• **Aksara AI**: Ekstensi Chrome & Asisten Otak Kedua yang peka konteks.\n• **Vistral**: Aplikasi manajemen patroli tingkat keamanan tinggi (dioptimasi dari Patrolink).\n• **Heystetik**: Layanan konsultasi medis, e-commerce & streaming klinik kecantikan.\n• **Braincoach**: Web penilaian kognitif & latihan otak berbasis AI.\n\nAnda dapat melihat detail lengkapnya di bagian **Portofolio**!"
      }
    }

    // 2. Services
    if (q.includes("service") || q.includes("layanan") || q.includes("buat") || q.includes("bikin") || q.includes("developer") || q.includes("development") || q.includes("jasa") || q.includes("program")) {
      if (lang === "en") {
        return "PT Ruang Cipta Solusi offers end-to-end digital engineering:\n\n1. **Full-Stack Development**: Web apps using React/Next.js and mobile apps using React Native.\n2. **AI & LLM Integration**: Setting up fast APIs (Groq/DeepSeek) and context learning.\n3. **Enterprise ERP/CRM**: Bespoke systems for billing, logistics, and medical records.\n4. **Workflows Automation**: Workflow orchestration using n8n.\n\nCheck our **Services** section for more diagnostics!"
      } else {
        return "PT Ruang Cipta Solusi menawarkan rekayasa digital ujung-ke-ujung:\n\n1. **Full-Stack Development**: Aplikasi web berbasis React/Next.js & aplikasi mobile berbasis React Native.\n2. **Integrasi AI & LLM**: Pemasangan API model cepat (Groq/DeepSeek) & memori konteks.\n3. **Enterprise ERP/CRM**: Sistem kustom untuk penagihan, logistik, dan rekam medis.\n4. **Workflow Automation**: Otomatisasi alur kerja menggunakan n8n.\n\nPeriksa bagian **Layanan** kami untuk detail diagnostik lainnya!"
      }
    }

    // 3. Contact & Location
    if (q.includes("contact") || q.includes("hubungi") || q.includes("email") || q.includes("kantor") || q.includes("alamat") || q.includes("location") || q.includes("maps") || q.includes("telepon")) {
      if (lang === "en") {
        return "You can reach our team via:\n\n• **Email**: ruangciptasolusi@gmail.com (Press **⌥M** to copy anywhere!)\n• **Office**: Pejaten Barat, Pasar Minggu, Jakarta Selatan (Press **⌥L** to open map!)\n• **Contact Form**: Scroll to the bottom and submit directly via **⌘↵**."
      } else {
        return "Anda dapat menghubungi tim kami melalui:\n\n• **Email**: ruangciptasolusi@gmail.com (Tekan **⌥M** untuk menyalin di mana saja!)\n• **Kantor**: Pejaten Barat, Pasar Minggu, Jakarta Selatan (Tekan **⌥L** untuk buka peta!)\n• **Form Kontak**: Scroll ke bagian paling bawah halaman dan kirim pesan instan via **⌘↵**."
      }
    }

    // 4. Tech Stack / Antigravity IDE
    if (q.includes("tech") || q.includes("stack") || q.includes("antigravity") || q.includes("n8n") || q.includes("groq") || q.includes("deepseek") || q.includes("claude")) {
      if (lang === "en") {
        return "We build with modern tech stack standard:\n\n• **Frontend/Core**: React, Next.js, TypeScript.\n• **AI Models**: DeepSeek, Claude, OpenAI Codex.\n• **Execution Engine**: Groq, Cloudflare, Supabase.\n• **IDE & Tools**: Antigravity IDE, n8n automation."
      } else {
        return "Kami membangun sistem dengan standar tech stack modern:\n\n• **Frontend/Core**: React, Next.js, TypeScript.\n• **Model AI**: DeepSeek, Claude, OpenAI Codex.\n• **Mesin Eksekusi**: Groq, Cloudflare, Supabase.\n• **IDE & Tools**: Antigravity IDE, otomatisasi n8n."
      }
    }

    // 5. Pricing / Cost
    if (q.includes("harga") || q.includes("price") || q.includes("biaya") || q.includes("cost") || q.includes("bayar") || q.includes("murah") || q.includes("mahal")) {
      if (lang === "en") {
        return "Our pricing is tailored specifically based on project scope, complexity, and integrations (e.g. AI keys, cloud databases). Let's schedule a call! Leave your contact details in the form at the bottom, and we will get back to you with a custom pitch."
      } else {
        return "Biaya pengerjaan kami disesuaikan khusus berdasarkan skala proyek, kompleksitas, dan integrasi (seperti kunci API AI, database cloud). Mari jadwalkan diskusi! Tinggalkan kontak Anda di form bawah, dan kami akan segera menghubungi Anda."
      }
    }

    // Default Fallback
    if (lang === "en") {
      return "I read you loud and clear. PT Ruang Cipta Solusi is ready to engineer your web app, mobile app, or AI integration. Feel free to drop a message in the **Contact Console** below, or let me know if you want details on our **Portfolio**!"
    } else {
      return "Pesan Anda diterima dengan baik. PT Ruang Cipta Solusi siap merancang aplikasi web, aplikasi mobile, atau integrasi AI Anda. Silakan tinggalkan pesan di **Konsol Kontak** di bawah, atau beri tahu saya jika Anda memerlukan detail tentang **Portofolio** kami!"
    }
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI typing delay
    setTimeout(() => {
      const responseText = getAIResponse(userMessage.text)
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setIsTyping(false)
      // Broadcast console update
      window.dispatchEvent(
        new CustomEvent("console-log", {
          detail: `[AI-CHAT] Incoming query: "${userMessage.text.substring(0, 20)}..." answered.`,
        })
      )
    }, 850)
  }

  return (
    <>
      {/* Floating Action Button */}
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          left: 'auto',
          zIndex: 99999,
        }}
      >
        <button
          onClick={handleOpenToggle}
          aria-label="Open AI Assistant"
          className="relative w-14 h-14 rounded-full bg-secondary border border-border/80 hover:border-accent/60 flex items-center justify-center cursor-pointer transition-all duration-300 group hover:scale-105 active:scale-95 text-foreground hover:text-accent"
        >
          {/* Notification Ping Alert */}
          {hasNewMessage && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ECFF8A] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#ECFF8A] border-2 border-background" />
            </span>
          )}
          
          {isOpen ? (
            <X size={20} className="transition-transform duration-300 rotate-0 group-hover:rotate-90" />
          ) : (
            <MessageSquareCode size={22} className="transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className="glass noise rounded-lg border border-border/80 overflow-hidden flex flex-col font-sans animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '20px',
            left: 'auto',
            width: '360px',
            maxWidth: 'calc(100vw - 40px)',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
            zIndex: 99999,
          }}
        >
            {/* Header */}
            <div className="h-12 border-b border-border/70 flex items-center justify-between px-4 bg-secondary/30 relative z-20">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-6 h-6 rounded-lg border border-border bg-accent/5 flex items-center justify-center text-accent">
                    <Bot size={13} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#ECFF8A] border border-background animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-foreground leading-none flex items-center gap-1">
                    RCS Copilot
                    <Sparkles size={10} className="text-accent fill-current animate-pulse" />
                  </div>
                  <div className="text-[9px] font-mono text-muted-foreground mt-0.5">rcs-ai-assistant.sh</div>
                </div>
              </div>
              
              <button 
                onClick={handleOpenToggle}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary/60 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat Messages Log Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar bg-[#0a0a0a]/50 text-xs">
              
              {/* Header security diagnostics status */}
              <div className="flex items-center gap-2 border border-border/40 rounded-lg p-2.5 bg-secondary/15 font-mono text-[9px] text-muted-foreground">
                <ShieldCheck size={12} className="text-green-400 shrink-0" />
                <span>Session established. Encrypted local client.</span>
              </div>

              {messages.map((msg, idx) => {
                const isBot = msg.sender === "bot"
                return (
                  <div 
                    key={idx} 
                    className={`flex gap-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                  >
                    {isBot && (
                      <div className="w-6 h-6 rounded-lg border border-border/80 bg-background flex items-center justify-center text-muted-foreground shrink-0 self-start mt-0.5">
                        <Terminal size={12} />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div 
                        className={`p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                          isBot 
                            ? "bg-secondary/40 border border-border/60 text-foreground" 
                            : "bg-accent text-accent-foreground font-medium"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className={`text-[8px] font-mono text-muted-foreground/75 ${isBot ? "text-left" : "text-right"}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                  <div className="w-6 h-6 rounded-lg border border-border/80 bg-background flex items-center justify-center text-muted-foreground shrink-0 self-start mt-0.5">
                    <Terminal size={12} />
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Area */}
            <form 
              onSubmit={handleSend}
              className="p-3 border-t border-border/70 bg-[#0d0d0e]/60 flex items-center gap-2 relative z-20"
            >
              <div className="flex-grow flex items-center gap-2 bg-background/50 border border-border/60 rounded-lg px-3 py-2 focus-within:border-accent/65 transition-colors">
                <span className="text-[#ECFF8A]/75 font-mono text-xs select-none">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === "en" ? "Type command/query..." : "Ketik perintah/tanya..."}
                  className="bg-transparent text-xs font-mono text-foreground placeholder:text-muted-foreground/60 border-none outline-none w-full"
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center cursor-pointer transition-all duration-300 disabled:opacity-30 disabled:hover:bg-accent active:scale-90"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        )}
    </>
  )
}
