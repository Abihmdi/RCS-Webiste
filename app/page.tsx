import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"

const AboutSection = dynamic(
  () => import("@/components/about-section").then(m => ({ default: m.AboutSection }))
)
const ServicesSection = dynamic(
  () => import("@/components/services-section").then(m => ({ default: m.ServicesSection }))
)
const TeamSection = dynamic(
  () => import("@/components/team-section").then(m => ({ default: m.TeamSection }))
)
const PortfolioSection = dynamic(
  () => import("@/components/portfolio-section").then(m => ({ default: m.PortfolioSection }))
)
const ContactSection = dynamic(
  () => import("@/components/contact-section").then(m => ({ default: m.ContactSection }))
)
const Footer = dynamic(
  () => import("@/components/footer").then(m => ({ default: m.Footer }))
)
const CommandPalette = dynamic(
  () => import("@/components/command-palette").then(m => ({ default: m.CommandPalette }))
)

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
      <CommandPalette />
    </main>
  )
}
