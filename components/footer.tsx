"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram, ArrowUp, Mail, MapPin } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Technology Modernization", href: "#services" },
    { label: "Data Analysis", href: "#services" },
    { label: "Product Innovation", href: "#services" },
    { label: "Infrastructure", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Portfolio", href: "#portfolio" },
  ],
  contact: [
    { label: "ruangciptasolusi@gmail.com", href: "mailto:ruangciptasolusi@gmail.com", icon: Mail },
    { label: "Jakarta Selatan", href: "#contact", icon: MapPin },
  ],
}

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/company/ruangciptasolusi", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/ruangciptasolusi", label: "Instagram" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative pt-20 pb-8 border-t border-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                <span className="font-mono font-bold text-background text-lg">R</span>
              </div>
              <span className="font-mono text-lg font-medium">
                RCS<span className="text-foreground/60">.</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              PT Ruang Cipta Solusi - Your trusted partner for digital transformation. 
              We bring together strategy, technology implementation, and deep domain expertise.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Komplek Bank Niaga No 38, Pejaten Barat, Pasar Minggu, Jakarta Selatan
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono font-medium text-foreground mb-4 tracking-wider">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono font-medium text-foreground mb-4 tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono font-medium text-foreground mb-4 tracking-wider">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <link.icon size={14} className="shrink-0" />
                    <span className="break-all">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Email CTA */}
            <a
              href="mailto:ruangciptasolusi@gmail.com"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-foreground/10 hover:bg-foreground/15 text-foreground rounded-lg text-sm font-mono transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PT Ruang Cipta Solusi. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://ruangciptasolusi.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              www.ruangciptasolusi.com
            </a>
            
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              <ArrowUp size={16} />
              Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
