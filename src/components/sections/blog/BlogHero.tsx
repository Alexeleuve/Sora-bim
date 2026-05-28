'use client'

import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface BlogHeroProps {
  label: string
  headline: string
  subheadline: string
}

export default function BlogHero({ label, headline, subheadline }: BlogHeroProps) {
  return (
    <section
      className="bg-neutral-900 section-py-sm pt-32"
      aria-labelledby="blog-headline"
    >
      <div className="container-section">
        <div className="max-w-2xl">
          <ScrollReveal delay={0}>
            <SectionLabel dark>{label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1
              id="blog-headline"
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
