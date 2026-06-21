import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

type Props = {
  children: React.ReactNode
  params:   Promise<{ locale: string }>
}

// ── Locale Layout ─────────────────────────────────────────────────────────────
// Wraps all [locale]/* pages with:
//   · locale validation
//   · skip-navigation link (accessibility)
//   · NextIntlClientProvider (makes translations available to Client Components)
//
// Does NOT contain <html> or <body> — those live in src/app/layout.tsx.
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'es' | 'en')) notFound()

  setRequestLocale(locale)

  const messages = await getMessages({ locale })

  return (
    <>
      {/* Accessibility: skip link — injected before any nav chrome */}
      <a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-brand-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-display focus:text-sm focus:font-semibold"
>
  Skip to main content
</a>

      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
