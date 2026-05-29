// SiteLayout — Server Component
// Uses direct JSON imports (no next-intl/server) to stay compatible with output:'export'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingCTA from '@/components/shared/FloatingCTA'
import { cn } from '@/lib/utils'

import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

interface SiteLayoutProps {
  children:         React.ReactNode
  className?:       string
  showFloatingCTA?: boolean
  locale?:          string  // Optional override; if absent, inferred from URL segment
}

export default async function SiteLayout({
  children,
  className,
  showFloatingCTA = true,
  locale: localeProp,
}: SiteLayoutProps) {
  // Locale is provided by the page (preferred) or falls back to default
  const locale = localeProp ?? routing.defaultLocale
  const isEs   = locale === 'es'
  const nav    = locale === 'en' ? enMessages.nav : esMessages.nav

  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`

  return (
    <>
      <Header />
      <main
        id="main-content"
        className={cn('min-h-screen', className)}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      {showFloatingCTA && (
        <FloatingCTA label={nav.cta} href={contactHref} />
      )}
    </>
  )
}
