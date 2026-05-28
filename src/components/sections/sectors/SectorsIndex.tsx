'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import Badge from '@/components/ui/Badge/Badge'
import { getDynamicIcon } from '@/lib/icons'

interface SectorItem {
  slug: string
  icon: string
  title: string
  tagline: string
  description: string
  systems: string[]
}

interface SectorsIndexProps {
  sectors: SectorItem[]
  basePath: string
  label: string
  headline: string
  subheadline: string
  ctaLabel: string
}

export default function SectorsIndex({
  sectors, basePath, label, headline, subheadline, ctaLabel,
}: SectorsIndexProps) {
  return (
    <section className="bg-neutral-50 section-py" aria-label="Todos los sectores">
      <div className="container-section">
        {/* Page intro */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <SectionLabel>{label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1
              className="font-display font-bold text-neutral-900 leading-[1.1] tracking-[-0.025em] mb-4"
              style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
            >
              {headline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <p className="font-sans text-lg text-neutral-600 leading-relaxed">
              {subheadline}
            </p>
          </ScrollReveal>
        </div>

        {/* Sectors list — alternating layout */}
        <div className="space-y-16">
          {sectors.map((sector, i) => {
            const Icon = getDynamicIcon(sector.icon)
            const isReversed = i % 2 !== 0

            return (
              <ScrollReveal key={sector.slug} delay={0.08} threshold={0.08}>
                <div
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center',
                    'pb-16',
                    i < sectors.length - 1 && 'border-b border-neutral-200',
                  )}
                >
                  {/* Text side */}
                  <div className={cn(isReversed && 'lg:order-last')}>
                    <div className="flex items-center gap-3 mb-4">
                      {Icon && (
                        <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                          <Icon size={20} strokeWidth={1.5} className="text-brand-800" />
                        </div>
                      )}
                      <h2
                        className="font-display font-bold text-neutral-900 leading-snug tracking-[-0.02em]"
                        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                      >
                        {sector.title}
                      </h2>
                    </div>

                    <p className="font-sans text-base font-medium text-brand-600 mb-3 leading-snug">
                      {sector.tagline}
                    </p>

                    <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-6">
                      {sector.description}
                    </p>

                    {/* Systems */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {sector.systems.map((sys) => (
                        <Badge key={sys} variant="sector">{sys}</Badge>
                      ))}
                    </div>

                    <Link
                      href={`${basePath}/${sector.slug}`}
                      className={cn(
                        'group inline-flex items-center gap-2',
                        'font-display font-semibold text-[0.75rem] tracking-[0.04em] uppercase',
                        'bg-brand-800 text-white rounded-sm px-5 py-2.5',
                        'transition-all duration-200 hover:bg-brand-600',
                        'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]'
                      )}
                    >
                      {ctaLabel}
                      <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Visual side */}
                  <div className={cn(isReversed && 'lg:order-first')}>
                    <div
                      className="rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3]"
                      style={{ background: 'linear-gradient(135deg, #EAF6FF 0%, #BAE6FD 100%)' }}
                    >
                      <div className="w-full h-full flex items-center justify-center min-h-[240px]">
                        {Icon && (
                          <Icon
                            size={80}
                            strokeWidth={0.8}
                            className="text-brand-200"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
