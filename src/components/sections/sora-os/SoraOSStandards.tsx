'use client'

import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import Badge from '@/components/ui/Badge/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface SoraOSStandardsProps {
  headline: string
  body: string
  items: string[]
}

export default function SoraOSStandards({ headline, body, items }: SoraOSStandardsProps) {
  return (
    <section
      className="bg-neutral-900 section-py border-t border-white/[0.06]"
      aria-labelledby="standards-headline"
    >
      <div className="container-section">
        <div className="max-w-content mx-auto text-center">
          <ScrollReveal delay={0}>
            <h2
              id="standards-headline"
              className="font-display font-bold text-white leading-[1.15] tracking-[-0.02em] mb-4"
              style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)' }}
            >
              {headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="font-sans text-sm text-white/55 leading-relaxed mb-10 max-w-lg mx-auto">
              {body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <div className="flex flex-wrap justify-center gap-3">
              {items.map((std) => (
                <Badge key={std} variant="technical-dark">
                  {std}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
