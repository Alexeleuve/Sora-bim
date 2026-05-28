'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface BIMTechSectionProps {
  label: string
  headline: string
  body: string
  tools: string[]
  cta: string
}

export default function BIMTechSection({
  label, headline, body, tools, cta,
}: BIMTechSectionProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const servicesHref = isEs ? `/${locale}/servicios` : `/${locale}/services`

  return (
    <section
      className="bg-neutral-50 section-py"
      id="tecnologia-bim"
      aria-labelledby="bimtech-headline"
    >
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">

          {/* ─── LEFT: CONTENT ──────────────────────────────── */}
          <div>
            <ScrollReveal delay={0}>
              <SectionLabel>{label}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h2
                id="bimtech-headline"
                className="font-display font-bold text-neutral-900 leading-[1.12] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
              >
                {headline}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="font-sans text-base text-neutral-600 leading-relaxed mb-8">
                {body}
              </p>
            </ScrollReveal>

            {/* Tools list */}
            <ScrollReveal delay={0.16}>
              <div className="bg-brand-50 rounded-xl p-6 mb-8 border border-brand-100">
                <ul className="space-y-2.5" role="list">
                  {tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Check size={11} strokeWidth={2.5} className="text-brand-500" />
                      </span>
                      <span className="font-sans text-sm text-neutral-700">
                        {tool}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link
                href={servicesHref}
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

          {/* ─── RIGHT: TWO STACKED IMAGES ──────────────────── */}
          <div className="grid grid-rows-2 gap-4 max-h-[600px]">
            <ScrollReveal delay={0.15}>
              <div className="relative overflow-hidden rounded-xl h-[260px] lg:h-full">
                <Image
                  src="/images/bim-monitor.jpg"
                  alt="Modelo BIM de sistemas especiales en pantalla"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="relative overflow-hidden rounded-xl h-[220px] lg:h-full">
                <Image
                  src="/images/bim-team.jpg"
                  alt="Equipo técnico trabajando en coordinación BIM"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(3,60,119,0.08)' }}
                  aria-hidden="true"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
