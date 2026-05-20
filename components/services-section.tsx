"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Zap, 
  BarChart3, 
  Lightbulb, 
  Server,
  ArrowRight,
  Search,
  MessageSquare,
  Wrench,
  Shield,
  Mail
} from "lucide-react"

const services = [
  {
    icon: Zap,
    title: "Technology Modernization",
    description: "We work end-to-end with clients to ensure effective business transformation - utilizing management systems, automation, customer data management, and more.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis and Processing",
    description: "Identifying patterns, trends, and opportunities from collected data, as well as applying analysis techniques to gain valuable insights and assist clients in making better decisions using Artificial Intelligence.",
  },
  {
    icon: Lightbulb,
    title: "Product & Service Innovation",
    description: "Conceiving, developing, and expanding emerging new ventures. We equip our client teams with the software, tools, and capabilities needed to achieve success independently, such as creating applications or websites.",
  },
  {
    icon: Server,
    title: "Technology Infrastructure",
    description: "We provide services that encompass planning, implementation, and management of necessary infrastructure, including communication networks, servers, hardware, and software. For instance, local network and CCTV implementations.",
  },
]

const processSteps = [
  {
    icon: Search,
    title: "Business Diagnosis",
    description: "We begin each project by thoroughly diagnosing the client's business condition to identify existing opportunities and challenges.",
  },
  {
    icon: MessageSquare,
    title: "Discussion and Solutions",
    description: "Based on the diagnosis results, we engage in discussions with the client to find the appropriate solutions to address the challenges they are facing.",
  },
  {
    icon: Wrench,
    title: "Technology Implementation",
    description: "We not only provide solutions but also take responsibility for effective implementation, ensuring our clients can see tangible results from their digital investments.",
  },
  {
    icon: Shield,
    title: "Monitoring and Maintenance",
    description: "We also provide monitoring and maintenance services to ensure the solutions we implement continue to run smoothly and provide long-term value for our clients.",
  },
]

interface ServiceCardProps {
  service: typeof services[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}

function ServiceCard({ service, index, isExpanded, onToggle }: ServiceCardProps) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`
          glass rounded-2xl p-6 h-full cursor-pointer
          transition-all duration-300 relative overflow-hidden
          ${isExpanded ? "ring-1 ring-foreground/30" : "hover:border-foreground/20"}
        `}
        onClick={onToggle}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div className="relative">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-foreground/10 flex items-center justify-center mb-5 group-hover:bg-foreground/15 transition-colors">
            <service.icon size={28} className="text-foreground" />
          </div>

          {/* Title */}
          <h3 className="font-mono text-lg font-semibold text-foreground mb-3">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Expand indicator */}
          <div className="flex items-center gap-2 mt-4 text-foreground/70 text-sm font-mono">
            <span>Learn more</span>
            <ArrowRight 
              size={14} 
              className="transition-transform group-hover:translate-x-1" 
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-mono text-foreground/70 mb-4 tracking-wider">
            02 — Our Activities
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            WHAT WE DO
          </h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed text-balance">
            Providing services to our clients in the field of technological innovation with a focus on cost efficiency and revenue enhancement.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Process section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              HOW WE WORK
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How do these capabilities integrate and operate together?
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[1px] bg-gradient-to-r from-foreground/30 to-transparent" />
                )}
                
                <div className="glass rounded-xl p-6 relative z-10 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-sm font-mono font-bold text-background">
                    {index + 1}
                  </div>
                  
                  <div className="w-12 h-12 rounded-lg bg-foreground/10 flex items-center justify-center mb-4 mt-2">
                    <step.icon size={24} className="text-foreground" />
                  </div>
                  
                  <h4 className="font-mono font-semibold text-foreground mb-2">
                    {step.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Need a custom solution? {"Let's"} discuss your project.
          </p>
          <a
            href="mailto:ruangciptasolusi@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-mono text-sm hover:bg-foreground/90 transition-all hover:scale-105"
          >
            <Mail size={16} />
            Get in Touch
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
