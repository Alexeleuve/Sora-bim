'use client'

import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface ServicesHeroProps {
  label: string
  headline: string
  subheadline: string
}

export default function ServicesHero({ label, headline, subheadline }: ServicesHeroProps) {
  return (
    <section
      className="bg-neutral-900 section-py-sm pt-32"
      aria-labelledby="services-page-headline"
    >
      <div className="container-section">
        <div className="max-w-2xl">
          <ScrollReveal delay={0}>
            <SectionLabel dark>{label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1
              id="services-page-headline"
              className="font-display font-bold text-white leading-[1.1] tracking-[-0.025em] mb-4"
              style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
            >
              {headline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <p className="font-sans text-lg text-white/65 leading-relaxed max-w-xl">
              {subheadline}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
