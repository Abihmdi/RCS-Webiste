"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ruangciptasolusi@gmail.com",
    href: "mailto:ruangciptasolusi@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Komplek Bank Niaga No 38, Pejaten Barat, Pasar Minggu, Jakarta Selatan",
    href: "https://maps.google.com/?q=Pejaten+Barat+Pasar+Minggu+Jakarta+Selatan",
  },
]

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message: string
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: "loading", message: "Sending..." })

    // Create mailto link with form data
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
    )
    
    window.location.href = `mailto:ruangciptasolusi@gmail.com?subject=${subject}&body=${body}`

    setStatus({
      type: "success",
      message: "Opening your email client...",
    })

    setTimeout(() => {
      setStatus({ type: "idle", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div ref={ref} className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-mono text-foreground/70 mb-4 tracking-wider">
            05 — Contact Us
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance">
            Ready to start your project? Get in touch with us and {"let's"} discuss how we can help transform your ideas into reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                PT RUANG CIPTA SOLUSI
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {"We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions."}
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 glass rounded-xl group hover:border-foreground/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-foreground/15 transition-colors">
                    <item.icon size={20} className="text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground font-mono mb-1 tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-sm text-foreground font-medium break-words">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Email CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4"
            >
              <a
                href="mailto:ruangciptasolusi@gmail.com"
                className="group flex items-center justify-center gap-3 w-full py-4 bg-foreground text-background rounded-xl font-mono text-sm transition-all hover:bg-foreground/90 glow-white"
              >
                <Mail className="w-5 h-5" />
                Mail to ruangciptasolusi@gmail.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-mono text-muted-foreground mb-2 tracking-wider"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-foreground/50"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-mono text-muted-foreground mb-2 tracking-wider"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-foreground/50"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label 
                  htmlFor="company" 
                  className="block text-sm font-mono text-muted-foreground mb-2 tracking-wider"
                >
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-secondary border-border focus:border-foreground/50"
                />
              </div>

              <div className="mb-6">
                <label 
                  htmlFor="message" 
                  className="block text-sm font-mono text-muted-foreground mb-2 tracking-wider"
                >
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your project, timeline, and budget..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md bg-secondary border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-foreground/50 transition-colors resize-none"
                />
              </div>

              {/* Status message */}
              {status.type !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
                    status.type === "success" 
                      ? "bg-foreground/10 text-foreground" 
                      : status.type === "error"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-foreground/10 text-foreground"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle size={18} />
                  ) : status.type === "error" ? (
                    <AlertCircle size={18} />
                  ) : null}
                  <span className="text-sm font-mono">{status.message}</span>
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status.type === "loading"}
                className="w-full font-mono bg-foreground text-background hover:bg-foreground/90"
              >
                {status.type === "loading" ? (
                  <>
                    <span className="animate-spin mr-2">
                      <Send size={18} />
                    </span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                We typically respond within 24 hours on business days.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
