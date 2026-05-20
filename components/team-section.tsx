"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const founders = [
  {
    name: "Abi Hamdi",
    role: "Founder",
    bio: "With over 7 years of experience in the field of information technology, have been involved in various projects including website development, application development, network management, security, and other aspects.",
    initials: "AH",
  },
  {
    name: "Ayip Farouk",
    role: "Founder",
    bio: "Having over 5 years of experience in product management across various stages, from early-stage startups to mid-stage companies, and at one of the largest e-commerce companies in Southeast Asia. Possessing several certifications in product management training as well as business consulting.",
    initials: "AF",
  },
]

interface FounderCardProps {
  founder: typeof founders[0]
  index: number
}

function FounderCard({ founder, index }: FounderCardProps) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="glass rounded-2xl p-10 h-full transition-all duration-500 hover:border-foreground/20 relative overflow-hidden">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-foreground/10 flex items-center justify-center mb-8 mx-auto group-hover:scale-105 transition-transform duration-500 ring-2 ring-foreground/10">
            <span 
              className="text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              {founder.initials}
            </span>
          </div>

          {/* Name and role */}
          <div className="text-center mb-8">
            <h3 
              className="text-2xl font-bold text-foreground mb-2"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              {founder.name}
            </h3>
            <span className="text-sm text-foreground/60 font-mono tracking-wider uppercase">
              {founder.role}
            </span>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {founder.bio}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden">
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
            03 — Our Team
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            FOUNDER
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance">
            Meet the founders behind RCS who drive innovation and deliver exceptional results for our clients.
          </p>
        </motion.div>

        {/* Founders grid - 2 columns */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard key={founder.name} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
