import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/language-context'
import { AIAssistant } from '@/components/ai-assistant'
import { HeroBackground } from '@/components/hero-background'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Preloader } from '@/components/preloader'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
})

const bebasNeue = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-bebas-neue'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ruangciptasolusi.com'),
  title: {
    default: 'RCS - Ruang Cipta Solusi | Digital Transformation Agency',
    template: '%s | RCS',
  },
  description: 'Transform your business with cutting-edge technology solutions. Web development, mobile apps, ERP systems, AI integration, and digital transformation services.',
  keywords: ['digital transformation', 'web development', 'mobile apps', 'ERP', 'software development', 'AI integration', 'Indonesia', 'Jakarta'],
  authors: [{ name: 'Ruang Cipta Solusi', url: 'https://ruangciptasolusi.com' }],
  creator: 'PT Ruang Cipta Solusi',
  publisher: 'PT Ruang Cipta Solusi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RCS - Ruang Cipta Solusi | Digital Transformation Agency',
    description: 'Transform your business with cutting-edge technology solutions. Web development, mobile apps, ERP systems, and AI integration.',
    url: 'https://ruangciptasolusi.com',
    siteName: 'RCS - Ruang Cipta Solusi',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'RCS - Ruang Cipta Solusi - Digital Transformation Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCS - Ruang Cipta Solusi | Digital Transformation Agency',
    description: 'Transform your business with cutting-edge technology solutions.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} bg-background`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', (event) => {
                if (event.filename && event.filename.includes('chrome-extension://')) {
                  event.stopImmediatePropagation();
                }
              });
              window.addEventListener('unhandledrejection', (event) => {
                const stack = event.reason && event.reason.stack;
                if (stack && stack.includes('chrome-extension://')) {
                  event.preventDefault();
                  event.stopImmediatePropagation();
                }
              });
            `
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Preloader />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT Ruang Cipta Solusi",
              alternateName: "RCS",
              url: "https://ruangciptasolusi.com",
              logo: "https://ruangciptasolusi.com/icon.svg",
              description: "Digital Transformation Agency specializing in web development, mobile apps, ERP systems, and AI integration.",
              email: "ruangciptasolusi@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Komplek Bank Niaga No 38, Pejaten Barat",
                addressLocality: "Jakarta Selatan",
                addressRegion: "DKI Jakarta",
                addressCountry: "ID",
              },
              sameAs: [
                "https://linkedin.com/company/ruangciptasolusi",
                "https://instagram.com/ruangciptasolusi",
              ],
              foundingDate: "2022",
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                minValue: 5,
                maxValue: 20,
              },
              knowsAbout: [
                "Digital Transformation",
                "Web Development",
                "Mobile App Development",
                "ERP Systems",
                "AI Integration",
                "Cloud Infrastructure",
                "Data Analytics",
              ],
            }),
          }}
        />
        <LanguageProvider>
          <SmoothScroll>
            <HeroBackground />
            {children}
            <AIAssistant />
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
