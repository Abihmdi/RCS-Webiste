"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, Info, Activity, Package } from "lucide-react"
import { useLanguage } from "@/components/language-context"

const deliverables = [
  "Improve management efficiency",
  "Effective customer management",
  "Build client internet presence & trust",
]

const techStack = [
  { 
    name: "React", 
    status: "Installed", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="-11.5 -10.23 23 20.46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  { 
    name: "Next.js", 
    status: "Active", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0 rounded-full bg-white p-0.5" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="black"/>
        <path d="M149.508 157.52L69.142 54H54v72h14.858V72.072l65.49 84.228c5.06-5.836 9.38-12.33 12.89-19.348zM126 54h15v72h-15V54z" fill="white"/>
      </svg>
    )
  },
  { 
    name: "TypeScript", 
    status: "Installed", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#3178C6" rx="8"/>
        <text x="32" y="70" fill="white" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="38">TS</text>
      </svg>
    )
  },
  { 
    name: "Python", 
    status: "Ready", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M55 0C25.4 0 27.5 12.7 27.5 12.7L27.6 25.1H55.4V29.1H27.5C27.5 29.1 11 27.4 11 50C11 72.6 25.1 71.9 25.1 71.9H32.4V62.4C32.4 47.9 44.6 37.1 59.1 37.1H72C72 37.1 82.5 35.8 82.5 20.1C82.5 4.4 69.1 0 55 0ZM41.2 8C44 8 46.2 10.2 46.2 13C46.2 15.8 44 18 41.2 18C38.4 18 36.2 15.8 36.2 13C36.2 10.2 38.4 8 41.2 8Z" fill="#3776AB"/>
        <path d="M55 110C84.6 110 82.5 97.3 82.5 97.3L82.4 84.9H54.6V80.9H82.5C82.5 80.9 99 82.6 99 60C99 37.4 84.9 38.1 84.9 38.1H77.6V47.6C77.6 62.1 65.4 72.9 50.9 72.9H38C38 72.9 27.5 74.2 27.5 89.9C27.5 105.6 40.9 110 55 110ZM68.8 102C66 102 63.8 99.8 63.8 97C63.8 94.2 66 92 68.8 92C71.6 92 73.8 94.2 73.8 97C73.8 99.8 71.6 102 68.8 102Z" fill="#FFE873"/>
      </svg>
    )
  },
  { 
    name: "Cloudflare", 
    status: "Online", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M102.3 53.6c-1.3-11.4-11-20.2-22.7-20.2-3.1 0-6.1.7-8.8 2-4.5-9.6-14.3-15.9-25.3-15.9-13.8 0-25.3 10-27.7 23.2-9.6 1.7-16.8 10-16.8 20.1 0 11.3 9.2 20.5 20.5 20.5h80.7c11.3 0 20.5-9.2 20.5-20.5.1-4.2-1.1-8.1-3.4-11.2z" fill="#F38020"/>
      </svg>
    )
  },
  { 
    name: "Supabase", 
    status: "Ready", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.2 2H3v10.5h3.5v6.5L16.8 8.5H13.2V2z" fill="#3ECF8E"/>
      </svg>
    )
  },
  { 
    name: "v0", 
    status: "Active", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.252 8.25h5.624c.088 0 .176.006.26.018l-5.87 5.87a1.889 1.889 0 01-.019-.265V8.25h-2.25v5.623a4.124 4.124 0 004.125 4.125h5.624v-2.25h-5.624c-.09 0-.179-.006-.265-.018l5.874-5.875a1.9 1.9 0 01.02.27v5.623H24v-5.624A4.124 4.124 0 0019.876 6h-5.624v2.25zM0 7.5v.006l7.686 9.788c.924 1.176 2.813.523 2.813-.973V7.5H8.25v6.87L2.856 7.5H0z" fill="white" fillRule="evenodd" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    name: "Groq", 
    status: "Online", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.036 2c-3.853-.035-7 3-7.036 6.781-.035 3.782 3.055 6.872 6.908 6.907h2.42v-2.566h-2.292c-2.407.028-4.38-1.866-4.408-4.23-.029-2.362 1.901-4.298 4.308-4.326h.1c2.407 0 4.358 1.915 4.365 4.278v6.305c0 2.342-1.944 4.25-4.323 4.279a4.375 4.375 0 01-3.033-1.252l-1.851 1.818A7 7 0 0012.029 22h.092c3.803-.056 6.858-3.083 6.879-6.816v-6.5C18.907 4.963 15.817 2 12.036 2z" fill="#F55036" />
      </svg>
    )
  },
  { 
    name: "Claude", 
    status: "Active", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" fill="#D97757" />
      </svg>
    )
  },
  { 
    name: "n8n", 
    status: "Online", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 228 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M204 48C192.817 48 183.42 40.3514 180.756 30H153.248C147.382 30 142.376 34.241 141.412 40.0272L140.425 45.9456C139.489 51.5648 136.646 56.4554 132.626 60C136.646 63.5446 139.489 68.4352 140.425 74.0544L141.412 79.9728C142.376 85.759 147.382 90 153.248 90H156.756C159.42 79.6486 168.817 72 180 72C193.255 72 204 82.7452 204 96C204 109.255 193.255 120 180 120C168.817 120 159.42 112.351 156.756 102H153.248C141.516 102 131.504 93.5181 129.575 81.9456L128.588 76.0272C127.624 70.241 122.618 66 116.752 66H107.244C104.58 76.3514 95.183 84 84 84C72.817 84 63.4204 76.3514 60.7561 66H47.2439C44.5796 76.3514 35.183 84 24 84C10.7452 84 0 73.2548 0 60C0 46.7452 10.7452 36 24 36C35.183 36 44.5796 43.6486 47.2439 54H60.7561C63.4204 43.6486 72.817 36 84 36C95.183 36 104.58 43.6486 107.244 54H116.752C122.618 54 127.624 49.759 128.588 43.9728L129.575 38.0544C131.504 26.4819 141.516 18 153.248 18L180.756 18C183.42 7.64864 192.817 0 204 0C217.255 0 228 10.7452 228 24C228 37.2548 217.255 48 204 48ZM204 36C210.627 36 216 30.6274 216 24C216 17.3726 210.627 12 204 12C197.373 12 192 17.3726 192 24C192 30.6274 197.373 36 204 36ZM24 72C30.6274 72 36 66.6274 36 60C36 53.3726 30.6274 48 24 48C17.3726 48 12 53.3726 12 60C12 66.6274 17.3726 72 24 72ZM96 60C96 66.6274 90.6274 72 84 72C77.3726 72 72 66.6274 72 60C72 53.3726 77.3726 48 84 48C90.6274 48 96 53.3726 96 60ZM192 96C192 102.627 186.627 108 180 108C173.373 108 168 102.627 168 96C168 89.3726 173.373 84 180 84C186.627 84 192 89.3726 192 96Z" fill="#EA4B71"/>
      </svg>
    )
  },
  { 
    name: "Antigravity", 
    status: "Synced", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="antiGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ECFF8A" />
            <stop offset="50%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#9D4EDD" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="22" fill="#0A0A0B" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2"/>
        <path d="M20 0v100M40 0v100M60 0v100M80 0v100M0 20h100M0 40h100M0 60h100M0 80h100" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1"/>
        <path d="M50 18 L22 82 H37 L44 64 H56 L63 82 H78 L50 18 Z M50 35 L55 52 H45 Z" fill="url(#antiGrad)"/>
      </svg>
    )
  },
  { 
    name: "Codex", 
    status: "Running", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 256 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205Z" fill="#10B981" />
      </svg>
    )
  },
  { 
    name: "DeepSeek", 
    status: "Ready", 
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z" fill="#4D6BFE" />
      </svg>
    )
  },
]

const stats = [
  { label: "Experience", value: "3+ Years", badge: "Senior" },
  { label: "Delivered", value: "50+ Projects", badge: "Prod" },
  { label: "Satisfaction", value: "98% Rate", badge: "Max" },
]

export function AboutSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Listen for Alt+D to open documentation (scroll to contact console)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "d") {
        e.preventDefault()
        const el = document.getElementById("contact")
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
        window.dispatchEvent(
          new CustomEvent("console-log", {
            detail: "[DOCS] Redirected to system configuration and contact panel via ⌥D.",
          })
        )
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const stats = [
    { label: t("about_stat_exp_label"), value: t("about_stat_exp_value"), badge: t("about_stat_exp_badge") },
    { label: t("about_stat_del_label"), value: t("about_stat_del_value"), badge: t("about_stat_del_badge") },
    { label: t("about_stat_sat_label"), value: t("about_stat_sat_value"), badge: t("about_stat_sat_badge") },
  ]

  const deliverables = [
    t("about_deliverable_1"),
    t("about_deliverable_2"),
    t("about_deliverable_3"),
  ]

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Background glow orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#ECFF8A]/3 top-1/4 left-1/2 -translate-x-1/2" />

      <div ref={ref} className="container relative mx-auto px-4 max-w-5xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <div className="mb-4">
            <span className="section-pill">
              <span className="section-pill-dot" />
              {t("about_pill")}
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            {t("about_heading_1")} <span className="gradient-text">{t("about_heading_accent")}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-balance mx-auto md:mx-0">
            {t("about_description")}
          </p>
        </motion.div>

        {/* System Settings & Diagnostics Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass noise rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-5"
          style={{ minHeight: "520px" }}
        >
          {/* Header Row */}
          <div className="col-span-5 h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#242424]/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-[10px] xs:text-[11px] font-mono text-muted-foreground font-medium tracking-wide flex items-center gap-1.5 truncate max-w-[200px] xs:max-w-none">
              <Info size={11} className="text-accent shrink-0" />
              <span className="inline sm:hidden">rcs-about.conf</span>
              <span className="hidden sm:inline">rcs-system-about.conf -- Settings</span>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Left Column: Diagnostics & Specs (Col span 3) */}
          <div className="col-span-3 p-6 border-b md:border-b-0 md:border-r border-white/10 bg-[#080808]/40 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Activity size={12} className="text-accent" />
                  {t("about_mission_label")}
                </div>
                <p className="text-sm md:text-xs text-muted-foreground leading-relaxed text-justify font-sans">
                  {t("about_mission_text")}
                </p>
              </div>

              {/* Specs Table */}
              <div className="space-y-2.5">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold">
                  {t("about_specs_label")}
                </div>
                <div className="border border-white/10 rounded-lg overflow-hidden font-mono text-xs xs:text-[13px] md:text-[11px] bg-[#242424]/20">
                  <div className="grid grid-cols-2 p-3 border-b border-white/10 hover:bg-[#242424]/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_entity")}</span>
                    <span className="text-foreground font-semibold">{t("about_spec_entity_value")}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 border-b border-white/10 hover:bg-[#242424]/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_specialization")}</span>
                    <span className="text-accent font-semibold">{t("about_spec_specialization_value")}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 border-b border-white/10 hover:bg-[#242424]/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_role")}</span>
                    <span className="text-foreground">{t("about_spec_role_value")}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 hover:bg-[#242424]/40 transition-colors">
                    <span className="text-muted-foreground">{t("about_spec_address")}</span>
                    <span className="text-foreground truncate" title="Komplek Bank Niaga, Jakarta Selatan">{t("about_spec_address_value")}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Diagnostics Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-background/40 backdrop-blur-sm border border-white/5 rounded-lg p-3 flex sm:flex-col items-center sm:items-start justify-between gap-3 group hover:border-accent/40 transition-colors duration-300">
                  <div className="flex flex-col items-start">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">{s.label}</div>
                    <div 
                      className="text-[20px] sm:text-[18px] font-black text-foreground leading-none"
                      style={{ fontFamily: "var(--font-bebas-neue)" }}
                    >
                      {s.value}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-accent bg-accent/8 border border-accent/20 px-1.5 py-0.5 rounded shrink-0">
                    {s.badge}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Registry Modules & Tech Stacks (Col span 2) */}
          <div className="col-span-2 p-6 bg-[#0a0a0a]/50 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Deliverables Section */}
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-accent" />
                  {t("about_deliverables_label")}
                </div>
                <div className="space-y-2.5">
                  {deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 bg-[#242424]/30 border border-white/10 rounded-lg hover:border-foreground/10 transition-colors">
                      <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-sm md:text-xs text-muted-foreground leading-normal font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stacks Registry Section */}
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Package size={12} className="text-[#FFFFFF]" />
                  {t("about_stacks_label")}
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <div 
                      key={tech.name}
                      className="px-2.5 py-1 rounded-lg text-xs md:text-[10px] font-mono text-foreground/80 bg-[#242424]/80 border border-white/10 flex items-center gap-1.5 hover:border-foreground/20 transition-all cursor-default"
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                  <div className="px-2 py-1 rounded-lg text-xs md:text-[10px] font-mono text-accent bg-accent/8 border border-accent/20">
                    + more
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Signature Card */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-border"
                style={{ background: "linear-gradient(135deg, var(--accent), #FFFFFF)" }}
              >
                <span className="font-mono font-black text-black text-xs">R</span>
              </div>
              <div>
                <div className="font-semibold text-sm md:text-xs text-foreground font-mono leading-none">PT Ruang Cipta Solusi</div>
                <div className="text-[10px] text-muted-foreground font-mono mt-1">{t("about_verified")}</div>
              </div>
            </div>

          </div>

          {/* Bottom hotkeys status bar */}
          <div className="col-span-5 h-10 border-t border-white/10 bg-[#0a0a0a]/65 flex items-center justify-between px-4 text-xs md:text-[10px] font-mono text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Status: <span className="text-green-400">{t("about_status_synced")}</span></span>
              <span>Modules: <span className="text-foreground">{t("about_status_modules")}</span></span>
            </div>
            <div>
              <span>Press <span className="bg-[#242424] px-1 py-0.5 rounded border border-white/10 text-foreground font-semibold font-mono">⌥ D</span> to open docs</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
