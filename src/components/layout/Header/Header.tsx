'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackDiagnosticClick } from '@/lib/analytics'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t        = useTranslations('nav')
  const locale   = useLocale()
  const pathname = usePathname()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const isEs = locale === 'es'

  useEffect(() => {
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 80))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { labelKey: 'services', href: isEs ? `/${locale}/servicios` : `/${locale}/services` },
    { labelKey: 'sectors',  href: isEs ? `/${locale}/sectores`  : `/${locale}/sectors`  },
    { labelKey: 'soraOs',   href: `/${locale}/sora-os` },
    { labelKey: 'blog',     href: `/${locale}/blog` },
    { labelKey: 'about',    href: isEs ? `/${locale}/nosotros`  : `/${locale}/about`    },
  ]

  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`
  const isActive    = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const ctaLabel    = t('cta')

  const handleCtaClick = (location: string) =>
    trackDiagnosticClick({ cta_label: ctaLabel, cta_location: location, href: contactHref })

  return (
    <>
      {/* ── Fixed header ─────────────────────────────────────── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100]',
          'transition-all duration-200 ease-default will-change-[background]',
          scrolled
            ? 'bg-neutral-50/92 backdrop-blur-xl border-b border-neutral-300/60 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="container-section">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px] rounded-sm hover:opacity-80 transition-opacity duration-200"
              aria-label="SORA | Technical BIM Integration — ir al inicio"
            >
              <img
                src={scrolled ? '/images/sora-logo.png' : '/images/sora-logo-white.png'}
                alt="SORA | Technical BIM Integration"
                className="h-12 w-auto object-contain max-w-[170px] transition-opacity duration-200"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <Link
                  key={link.labelKey}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'font-display font-semibold text-[0.75rem] tracking-[0.06em] uppercase',
                    'transition-colors duration-200',
                    'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px] rounded-sm',
                    isActive(link.href)
                      ? scrolled ? 'text-brand-800 border-b-2 border-brand-500 pb-px' : 'text-white border-b-2 border-white/60 pb-px'
                      : scrolled ? 'text-neutral-700 hover:text-brand-800' : 'text-white/85 hover:text-white'
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Desktop right: lang + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher dark={!scrolled} />
              <Link
                href={contactHref}
                onClick={() => handleCtaClick('header_desktop')}
                className={cn(
                  'inline-flex items-center gap-2',
                  'font-display font-semibold text-[0.6875rem] tracking-[0.04em] uppercase',
                  'px-4 py-2.5 rounded-sm transition-all duration-200',
                  'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]',
                  scrolled
                    ? 'bg-brand-500 text-white hover:bg-brand-600'
                    : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                )}
              >
                {ctaLabel}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                'lg:hidden flex items-center justify-center w-11 h-11 rounded-sm',
                'transition-colors duration-200',
                'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]',
                scrolled ? 'text-neutral-700 hover:text-brand-800' : 'text-white hover:text-white/80'
              )}
              aria-label={t('openMenu')}
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <div
              key="bd"
              className="fixed inset-0 z-[95] bg-black/20 backdrop-blur-sm lg:hidden animate-fade-in"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div
              key="drawer"
              role="navigation"
              aria-label="Menú móvil"
              className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-sm bg-neutral-900 flex flex-col lg:hidden animate-slide-in-right"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.08]">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileOpen(false)}
                  aria-label="SORA | Technical BIM Integration — ir al inicio"
                >
                  <img
                    src="/images/sora-logo-white.png"
                    alt="SORA | Technical BIM Integration"
                    className="h-12 w-auto object-contain max-w-[170px]"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors"
                  aria-label={t('closeMenu')}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <li
                      key={link.labelKey}
                      className="animate-fade-in"
                      style={{ animationDelay: `${i * 40 + 80}ms`, animationFillMode: 'both' }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between py-4',
                          'font-display font-bold text-2xl tracking-[-0.01em]',
                          'border-b border-white/[0.08] transition-colors duration-150',
                          isActive(link.href) ? 'text-brand-300' : 'text-white hover:text-white/80'
                        )}
                      >
                        {t(link.labelKey)}
                        <ArrowRight size={18} className="opacity-40" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Drawer footer */}
              <div className="px-6 pb-10 space-y-4">
                <Link
                  href={contactHref}
                  onClick={() => {
                    setMobileOpen(false)
                    handleCtaClick('header_mobile_drawer')
                  }}
                  className="flex items-center justify-center w-full bg-brand-500 text-white rounded-sm font-display font-semibold text-sm tracking-[0.04em] uppercase py-4 hover:bg-brand-600 transition-colors duration-200"
                >
                  {ctaLabel}
                </Link>
                <div className="flex justify-center">
                  <LanguageSwitcher dark />
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
