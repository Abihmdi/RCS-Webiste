"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const techStack = [
  "React", "Next.js", "Node.js", "Python", "Google Cloud Platform", "PostgreSQL", "MongoDB", "Firebase"
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
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
            01 — About Us
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            WHO WE ARE
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              <span className="text-foreground font-semibold">Ruang Cipta Solusi (RCS)</span> is a company dedicated to helping our clients optimize their businesses through digitalization.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The use of technology is key to excelling in business today. However, the value of this capability is only realized when clear strategy, analysis, and expertise meet precise execution.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We bring together strategy, technology implementation, and deep domain expertise to drive transformation. With RCS, the focus is not solely on technology. As a trusted partner, we provide comprehensive services ranging from business condition diagnosis and problem identification to the implementation of effective solutions.
            </p>

            {/* Value propositions */}
            <div className="glass rounded-xl p-6 space-y-4">
              <div className="font-mono text-sm text-foreground/70 mb-3 tracking-wider">// What we deliver</div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-foreground mt-2 shrink-0" />
                <p className="text-muted-foreground">Helping to improve management efficiency</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-foreground mt-2 shrink-0" />
                <p className="text-muted-foreground">Ensure effective customer management</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-foreground mt-2 shrink-0" />
                <p className="text-muted-foreground">{"Enhance our clients' awareness and trust on the internet"}</p>
              </div>
            </div>
          </motion.div>

          {/* Right column - Tech stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="font-mono text-sm text-foreground/70 mb-6 tracking-wider">// Our Tech Stack</div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Various tech stacks and providing comprehensive analysis of the pros and cons of each option. Helping clients gain a clear understanding of how the technology impacts their business.
                </p>
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      className="px-3 py-1.5 rounded-full bg-secondary border border-border text-sm font-mono text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  <span className="px-3 py-1.5 rounded-full bg-foreground/10 border border-foreground/20 text-sm font-mono text-foreground">
                    + more
                  </span>
                </div>

                {/* Company badge */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                    <span className="font-mono font-bold text-foreground">RCS</span>
                  </div>
                  <div>
                    <div className="font-mono font-medium text-foreground">PT Ruang Cipta Solusi</div>
                    <div className="text-sm text-muted-foreground">Digital Transformation Partner</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
