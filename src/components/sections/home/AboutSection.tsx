'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface Stat {
  value: number
  suffix: string
  label: string
}

interface AboutSectionProps {
  label: string
  headline: string
  body: string
  stats: Stat[]
  cta: string
}

export default function AboutSection({
  label, headline, body, stats, cta,
}: AboutSectionProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const methodologyHref = isEs ? `/${locale}/nosotros` : `/${locale}/about`

  return (
    <section
      className="bg-neutral-50 section-py"
      id="quienes-somos"
      aria-labelledby="about-headline"
    >
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── IMAGE COLUMN ───────────────────────────────── */}
          <ScrollReveal delay={0.1} className="relative">
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] max-h-[560px]">
              <Image
                src="/images/about-structure.jpg"
                alt="Estructura geométrica metálica de precisión técnica"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              {/* Subtle brand overlay */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{ background: 'rgba(3,60,119,0.08)' }}
                aria-hidden="true"
              />
              {/* Accent corner decoration */}
              <div
                className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-brand-300/60"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-brand-300/60"
                aria-hidden="true"
              />
            </div>
          </ScrollReveal>

          {/* ─── CONTENT COLUMN ─────────────────────────────── */}
          <div>
            <ScrollReveal delay={0}>
              <SectionLabel>{label}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                id="about-headline"
                className="font-display font-bold text-neutral-900 leading-[1.15] tracking-[-0.02em] mb-5"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
              >
                {headline}
              </h2>
            </ScrollReveal>

            {/* Divider */}
            <ScrollReveal delay={0.15}>
              <span className="divider-brand mb-5" aria-hidden="true" />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-sans text-lg text-neutral-600 leading-relaxed mb-10">
                {body}
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.25}>
              <div className="grid grid-cols-3 gap-0 mb-10">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className={cn(
                      'text-center py-6',
                      i < stats.length - 1 && 'border-r border-neutral-300'
                    )}
                  >
                    <p className="font-display font-extrabold text-brand-800 leading-none mb-1.5 tabular-nums"
                      style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                    >
                    {stat.value}{stat.suffix}
                    </p>
                    <p className="font-sans text-xs text-neutral-500 leading-snug px-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.3}>
              <Link
                href={methodologyHref}
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
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
