'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  headline:     string
  subheadline:  string
  ctaPrimary:   string
  ctaSecondary: string
  statement:    string
  label:        string
  scrollLabel:  string
}

// Stagger delays (ms) matching original framer staggerChildren: 0.12s + delayChildren: 0.2s
const DELAYS = {
  label:     200,
  headline:  320,
  sub:       440,
  ctas:      560,
  statement: 900,
  scroll:   1400,
}

export default function HeroSection({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  statement,
  label,
  scrollLabel,
}: HeroSectionProps) {
  const locale    = useLocale()
  const isEs      = locale === 'es'
  const contactHref  = isEs ? `/${locale}/contacto`  : `/${locale}/contact`
  const servicesHref = isEs ? `/${locale}/servicios` : `/${locale}/services`

  // Shared style factory — fade-in-up with individual delay
  const fadeUp = (delay: number): React.CSSProperties => ({
    animationName:      'fade-in-up',
    animationDuration:  '600ms',
    animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
    animationDelay:     `${delay}ms`,
    animationFillMode:  'both',
  })

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      aria-label="Presentación principal de SORA"
    >
      {/* ─── BACKGROUND IMAGE ────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-facade.jpg"
          alt="Fachada de edificio corporativo moderno con vidrio"
          fill
          priority
          quality={90}
          className="object-cover object-center animate-ken-burns"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(3,60,119,0.90) 0%, rgba(3,60,119,0.65) 45%, rgba(3,60,119,0.25) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(248,250,252,0.08))' }}
          aria-hidden="true"
        />
      </div>

      {/* ─── CONTENT ─────────────────────────────────────── */}
      <div className="container-section relative z-10 pt-24 pb-20">
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Label */}
          <p
            className="inline-flex items-center gap-2.5 font-display font-semibold text-[0.6875rem] tracking-[0.14em] uppercase text-white/70 mb-5"
            style={fadeUp(DELAYS.label)}
          >
            <span className="block w-6 h-px bg-brand-300/80" aria-hidden="true" />
            {label}
          </p>

          {/* Headline */}
          <h1
            className={cn(
              'font-display font-extrabold text-white leading-[1.05] tracking-[-0.03em]',
              'text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]',
              'mb-5'
            )}
            style={fadeUp(DELAYS.headline)}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className="font-sans text-lg text-white/80 leading-relaxed max-w-xl mb-10"
            style={fadeUp(DELAYS.sub)}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10"
            style={fadeUp(DELAYS.ctas)}
          >
            <Link
              href={contactHref}
              className={cn(
                'group inline-flex items-center justify-center gap-2',
                'bg-brand-500 text-white rounded-sm',
                'font-display font-semibold text-[0.8125rem] tracking-[0.04em] uppercase',
                'px-7 py-4',
                'transition-all duration-200',
                'hover:bg-brand-600 hover:-translate-y-px hover:shadow-brand',
                'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]'
              )}
            >
              {ctaPrimary}
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href={servicesHref}
              className={cn(
                'inline-flex items-center justify-center',
                'bg-transparent text-white rounded-sm',
                'font-display font-semibold text-[0.8125rem] tracking-[0.04em] uppercase',
                'px-7 py-4',
                'border border-white/35',
                'transition-all duration-200',
                'hover:bg-white/[0.08] hover:border-white/70',
                'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]'
              )}
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Brand Statement */}
          <div style={fadeUp(DELAYS.statement)}>
            <div className="inline-flex items-center gap-3" role="doc-subtitle">
              <span className="block w-10 h-px bg-white/25" aria-hidden="true" />
              <p className="font-display font-medium text-[0.8125rem] tracking-[0.08em] uppercase text-brand-300">
                {statement}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR ────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        style={fadeUp(DELAYS.scroll)}
        aria-hidden="true"
      >
        <span className="font-display font-medium text-[0.5625rem] tracking-[0.14em] uppercase text-white/40">
          {scrollLabel}
        </span>
        <ChevronDown size={18} className="text-white/40 animate-bounce-y" />
      </div>
    </section>
  )
}
