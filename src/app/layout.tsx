import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Montserrat, Inter, IBM_Plex_Mono } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/seo'
import { getBaseUrl } from '@/lib/utils'
import '@/styles/globals.css'

// ── Fonts ────────────────────────────────────────────────────────────────────
const montserrat  = Montserrat({ subsets: ['latin'], variable: '--font-montserrat',    display: 'swap', weight: ['400','500','600','700','800','900'], preload: true })
const inter       = Inter({ subsets: ['latin'],       variable: '--font-inter',         display: 'swap', weight: ['400','500','600','700'],             preload: true })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-ibm-plex-mono', display: 'swap', weight: ['400','500'],                       preload: false })

// ── GA4 ──────────────────────────────────────────────────────────────────────
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// ── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#033C77' },
    { media: '(prefers-color-scheme: dark)',  color: '#0F172A' },
  ],
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase:    new URL(getBaseUrl()),
  title:           { template: `%s — ${SITE_CONFIG.name}`, default: SITE_CONFIG.name },
  description:     SITE_CONFIG.description.es,
  applicationName: SITE_CONFIG.shortName,
  authors:         [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator:         SITE_CONFIG.name,
  publisher:       SITE_CONFIG.name,
  generator:       'Next.js',
  formatDetection: { email: false, address: false, telephone: false },
  category:        'technology',
  icons: {
    icon:  [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#033C77' }],
  },
  manifest:    '/site.webmanifest',
  openGraph: {
    type: 'website', locale: 'es_MX', url: SITE_CONFIG.url, siteName: SITE_CONFIG.name,
    images: [{ url: `${SITE_CONFIG.url}/images/og-default.jpg`, width: 1200, height: 630, alt: SITE_CONFIG.name }],
  },
  twitter:  { card: 'summary_large_image', site: SITE_CONFIG.twitter, creator: SITE_CONFIG.twitter },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

// ── Root Layout ───────────────────────────────────────────────────────────────
// This is the single source of <html> and <body> for the entire application.
// The [locale] nested layout adds locale-specific providers without repeating these tags.
// suppressHydrationWarning on <html> allows the locale layout to update the lang attribute.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="msapplication-TileColor" content="#033C77" />
      </head>
      <body
        className="font-sans bg-neutral-50 text-neutral-700 antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* Google Analytics 4 — loads after the page is interactive */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
