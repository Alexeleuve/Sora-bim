// SiteLayout — Server Component
// Can import client components (Header, Footer, FloatingCTA)
// but does NOT use client-only hooks itself
import { getTranslations, getLocale } from 'next-intl/server'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingCTA from '@/components/shared/FloatingCTA'
import { cn } from '@/lib/utils'

interface SiteLayoutProps {
  children:       React.ReactNode
  className?:     string
  showFloatingCTA?: boolean
}

export default async function SiteLayout({
  children,
  className,
  showFloatingCTA = true,
}: SiteLayoutProps) {
  const locale     = await getLocale()
  const t          = await getTranslations('nav')
  const isEs       = locale === 'es'
  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`

  return (
    <>
      <Header />
      <main id="main-content" className={cn('min-h-screen', className)} tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {showFloatingCTA && (
        <FloatingCTA label={t('cta')} href={contactHref} />
      )}
    </>
  )
}
