import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/language-context'
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
  title: 'RCS - Ruang Cipta Solusi | Digital Transformation Agency',
  description: 'Transform your business with cutting-edge technology solutions. Web development, mobile apps, ERP systems, and digital transformation services.',
  keywords: ['digital transformation', 'web development', 'mobile apps', 'ERP', 'software development', 'Indonesia'],
  authors: [{ name: 'Ruang Cipta Solusi' }],
  openGraph: {
    title: 'RCS - Ruang Cipta Solusi',
    description: 'Transform your business with cutting-edge technology solutions',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCS - Ruang Cipta Solusi',
    description: 'Transform your business with cutting-edge technology solutions',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
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
        <LanguageProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
