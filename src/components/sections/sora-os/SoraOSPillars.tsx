'use client'

import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import { getDynamicIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

interface Pillar {
  icon: string
  title: string
  description: string
}

interface SoraOSPillarsProps {
  pillars: Pillar[]
  label?: string
}

export default function SoraOSPillars({ pillars, label }: SoraOSPillarsProps) {
  return (
    <section
      className="bg-neutral-900 section-py border-t border-white/[0.06]"
      aria-label="Pilares de SORA OS"
    >
      <div className="container-section">
        {label && (
          <ScrollReveal delay={0}>
            <div className="text-center mb-12">
              <SectionLabel dark className="justify-center">{label}</SectionLabel>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = getDynamicIcon(pillar.icon)
            return (
              <ScrollReveal key={pillar.title} delay={i * 0.07} threshold={0.05}>
                <div
                  className={cn(
                    'group p-6 rounded-xl h-full',
                    'bg-brand-500/[0.05] border border-brand-300/[0.12]',
                    'transition-all duration-250',
                    'hover:bg-brand-500/[0.10] hover:border-brand-300/[0.28]',
                  )}
                >
                  {Icon && (
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-brand-300 mb-4"
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="font-display font-semibold text-white text-base mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-white/55 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
