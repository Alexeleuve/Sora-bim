'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import { getDynamicIcon } from '@/lib/icons'

interface SectorItem {
  slug: string
  icon: string
  title: string
  tagline: string
}

interface SectorsSectionProps {
  label: string
  headline: string
  sectors: SectorItem[]
  cta: string
}

export default function SectorsSection({
  label, headline, sectors, cta,
}: SectorsSectionProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const basePath = isEs ? `/${locale}/sectores` : `/${locale}/sectors`

  return (
    <section
      className="bg-white section-py"
      id="sectores"
      aria-labelledby="sectors-headline"
    >
      <div className="container-section">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <ScrollReveal>
            <SectionLabel>{label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2
              id="sectors-headline"
              className="font-display font-bold text-neutral-900 leading-[1.15] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
            >
              {headline}
            </h2>
          </ScrollReveal>
        </div>

        {/* Sectors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {sectors.map((sector, i) => {
            const Icon = getDynamicIcon(sector.icon)
            const href = `${basePath}/${sector.slug}`

            return (
              <ScrollReveal key={sector.slug} delay={i * 0.07} threshold={0.05}>
                <Link
                  href={href}
                  className={cn(
                    'group relative block',
                    'bg-white border border-neutral-200 rounded-xl p-6',
                    'transition-all duration-250',
                    'hover:-translate-y-1',
                    'hover:shadow-[0_12px_24px_rgba(3,60,119,0.10)]',
                    'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]',
                    // Top border accent on hover
                    'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]',
                    'before:rounded-t-xl before:bg-brand-800',
                    'before:scale-x-0 before:origin-left',
                    'before:transition-transform before:duration-250',
                    'hover:before:scale-x-100',
                    'overflow-hidden'
                  )}
                  aria-label={`Ver sector ${sector.title}`}
                >
                  {Icon && (
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-brand-800 mb-4 transition-colors duration-200 group-hover:text-brand-500"
                    />
                  )}
                  <h3 className="font-display font-semibold text-neutral-900 text-base mb-2 leading-snug group-hover:text-brand-500 transition-colors duration-200">
                    {sector.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {sector.tagline}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-display font-semibold text-[0.625rem] tracking-[0.06em] uppercase text-brand-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                  >
                    Ver sector
                    <ArrowRight size={10} />
                  </span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        {/* All sectors CTA */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center">
            <Link
              href={basePath}
              className={cn(
                'group inline-flex items-center gap-2',
                'font-display font-semibold text-[0.8125rem] tracking-[0.04em] uppercase',
                'text-brand-500 hover:text-brand-700',
                'transition-colors duration-200',
                'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px] rounded-sm'
              )}
            >
              {cta}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
