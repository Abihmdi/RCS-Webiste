"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Smartphone, Globe, Database, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = ["All", "Mobile", "Web", "Enterprise"] as const
type Category = typeof categories[number]

const projects = [
  {
    id: 1,
    title: "Heystetik",
    subtitle: "Beauty Clinic Application",
    category: "Mobile",
    caseStudy: "Beauty clinics juggle scattered data, manual tasks, and weak patient connections. This chaos disrupts appointment bookings, sales, and community building.",
    solution: "We have developed Heystetik, an innovative application designed for beauty clinics. Heystetik allows users to consult with doctors, book treatments, purchase skincare products, and engage in discussions with other users through streaming features.",
    features: ["Doctor Consultation", "Treatment Booking", "Commerce", "Stream", "Progress Tracker"],
    icon: Smartphone,
    color: "from-pink-500/20 to-rose-500/20",
    type: "Project",
  },
  {
    id: 2,
    title: "Braincoach",
    subtitle: "Cognitive Assessment Website",
    category: "Web",
    caseStudy: "Traditional methods for assessing cognitive function are unreliable, making it hard to diagnose dementia early. This delays treatment and worsens patient outcomes.",
    solution: "We created Braincoach, a website designed for cognitive assessment and training. Leveraging AI capabilities, Braincoach supports accurate assessment and provides cognitive training games to enhance brain function.",
    features: ["Cognitive Assessment (MOCA INA)", "AI Integration", "Training Games"],
    icon: Globe,
    color: "from-blue-500/20 to-cyan-500/20",
    type: "Project",
  },
  {
    id: 3,
    title: "Patrolink",
    subtitle: "Security Guard Management Application",
    category: "Mobile",
    caseStudy: "Inefficient patrol management (gaps, missed patrols, slow response) creates security risks and eats into profits. Expensive patrol devices add another financial burden.",
    solution: "Patrolink is a security management application that simplifies attendance tracking, patrol management, and emergency responses. This application utilizes QR codes for attendance verification and ERP-based patrols.",
    features: ["Attendance Tracking", "Patrol Management", "SOS Button", "Anti Fake GPS"],
    icon: Smartphone,
    color: "from-green-500/20 to-emerald-500/20",
    type: "Project",
  },
  {
    id: 4,
    title: "Bill Muhdor CRM",
    subtitle: "CRM Implementation",
    category: "Enterprise",
    caseStudy: "Bill Muhdor, juggling art sales, workshops, and client communication, needs a better system. Manual management creates missed leads, booking errors, and hinders client relationships.",
    solution: "We implement a customized CRM for Bill Muhdor, enhancing his team's ability to manage customer information and communication, as well as facilitating marketing aspects and operational aspects of his art business.",
    features: ["Customer Management", "Marketing Automation", "Operational Efficiency"],
    icon: Database,
    color: "from-orange-500/20 to-yellow-500/20",
    type: "Project",
  },
  {
    id: 5,
    title: "Hospital Management System",
    subtitle: "ERP Implementation",
    category: "Enterprise",
    caseStudy: "Disconnected hospital systems (registration, appointments, inventory, pharmacy, billing) cause delays, errors, and information gaps. This frustrates staff, hinders care, and hurts the overall hospital experience.",
    solution: "Our Hospital Management System provides an integrated platform to handle all hospital operations efficiently. This system also includes ERP-based medical record management.",
    features: ["Patient Registration", "Doctor & Clinic Management", "Inventory and Pharmacy", "Billing System", "Medical Record"],
    icon: Building2,
    color: "from-purple-500/20 to-pink-500/20",
    type: "Project",
  },
  {
    id: 6,
    title: "Recruitment Tools",
    subtitle: "Recruitment Management System",
    category: "Enterprise",
    caseStudy: "The surge in applications and manual processes for tasks like administering tests, scoring results, and scheduling interviews are creating bottlenecks for recruiters.",
    solution: "We are developing a Recruitment Tool to automate daily recruitment tasks, including test administration, automated scoring, and interview scheduling integrated with email, Google Calendar, and video conferencing tools.",
    features: ["Automated Testing", "Interview Scheduling", "Operational Automation"],
    icon: Database,
    color: "from-indigo-500/20 to-violet-500/20",
    type: "Project",
  },
  {
    id: 7,
    title: "Travelator",
    subtitle: "Travel ERP Software",
    category: "Enterprise",
    caseStudy: "A travel agency using disconnected systems for bookings, quotes, invoices, and operations faces challenges in providing accurate information to clients and tracking overall business performance.",
    solution: "Travelator is an ERP software specifically designed to simplify travel business operations. It streamlines various aspects of travel management, including bookings, quotations, billing, task management, and financial tracking.",
    features: ["Order Management", "Offers and Billing", "Task Management", "Revenue & Expenditure Management"],
    icon: Globe,
    color: "from-cyan-500/20 to-teal-500/20",
    type: "Product",
  },
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      className="group"
    >
      <div 
        className="glass rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-foreground/30 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Image placeholder with gradient */}
        <div className={`relative h-40 bg-gradient-to-br ${project.color} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <project.icon size={48} className="text-foreground/20" />
          </div>
          {/* Type badge */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-mono text-foreground">
            {project.type}
          </span>
          {/* Category badge */}
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-foreground/80 backdrop-blur-sm text-xs font-mono text-background">
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-mono text-lg font-semibold text-foreground mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-foreground/70 font-mono mb-3">
            {project.subtitle}
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {project.caseStudy}
          </p>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-mono font-semibold text-foreground mb-2">Solution</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.solution}
                  </p>
                  
                  <h4 className="text-sm font-mono font-semibold text-foreground mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs font-mono bg-secondary rounded-md text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand indicator */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              {isExpanded ? "Click to collapse" : "Click to expand"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
            >
              <ExternalLink size={12} className="text-secondary-foreground" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PortfolioSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const filteredProjects = projects.filter(
    project => activeCategory === "All" || project.category === activeCategory
  )

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-mono mb-6">
            04 — Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Our <span className="text-foreground/70">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects across various industries
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`font-mono transition-all ${
                activeCategory === category 
                  ? "bg-foreground text-background" 
                  : "border-border hover:border-foreground/50"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
