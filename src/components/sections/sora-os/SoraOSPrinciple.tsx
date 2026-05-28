'use client'

import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import { cn } from '@/lib/utils'

interface SoraOSPrincipleProps {
  headline: string
  body: string
  statement: string
}

export default function SoraOSPrinciple({ headline, body, statement }: SoraOSPrincipleProps) {
  return (
    <section className="bg-neutral-900 py-20 border-t border-white/[0.06]">
      <div className="container-content mx-auto text-center px-6">
        <ScrollReveal delay={0}>
          <h2
            className="font-display font-bold text-white leading-[1.15] tracking-[-0.02em] mb-5"
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
          >
            {headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="font-sans text-base text-white/60 leading-[1.8] mb-8 max-w-xl mx-auto">
            {body}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.18}>
          <p
            className="font-display font-black text-white/90 tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}
          >
            {statement}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
