// SiteLayout — Server Component
import { getLocale, getTranslations } from 'next-intl/server'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingCTA from '@/components/shared/FloatingCTA'
import { cn } from '@/lib/utils'
import { routing } from '@/i18n/routing'

interface SiteLayoutProps {
  children:         React.ReactNode
  className?:       string
  showFloatingCTA?: boolean
}

// Derives localized contact path directly from routing.pathnames.
// Single source of truth — if '/contacto' mapping changes in routing.ts,
// this updates automatically.
function getContactHref(locale: string): string {
  const pathnames = routing.pathnames as Record<string, string | Record<string, string>>
  const mapping   = pathnames['/contacto']
  if (!mapping) return `/${locale}/contacto`
  if (typeof mapping === 'string') return `/${locale}${mapping}`
  return `/${locale}${(mapping as Record<string, string>)[locale] ?? '/contacto'}`
}

export default async function SiteLayout({
  children,
  className,
  showFloatingCTA = true,
}: SiteLayoutProps) {
  const locale      = await getLocale()
  const t           = await getTranslations('nav')
  const contactHref = getContactHref(locale)

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
        <FloatingCTA label={t('cta')} href={contactHref} />
      )}
    </>
  )
}
