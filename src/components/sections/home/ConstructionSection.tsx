'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface Stat {
  value: number
  suffix: string
  label: string
}

interface ConstructionSectionProps {
  label: string
  headline: string
  body: string
  stats: Stat[]
}

export default function ConstructionSection({
  label, headline, body, stats,
}: ConstructionSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      id="construccion"
      aria-labelledby="construction-headline"
      style={{ minHeight: 'clamp(480px, 55vw, 700px)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/construction-workers.jpg"
          alt="Trabajadores en obra coordinando información técnica"
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
        />
        {/* Uniform brand overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(3,60,119,0.74)' }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[inherit] section-py">
        <div className="container-section">
          <ScrollReveal threshold={0.2}>
            <div
              className="max-w-[700px] mx-auto rounded-2xl p-10 sm:p-12 text-center"
              style={{
                background: 'rgba(3,60,119,0.45)',
                backdropFilter: 'blur(2px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <SectionLabel dark className="justify-center">{label}</SectionLabel>

              <h2
                id="construction-headline"
                className="font-display font-bold text-white leading-[1.12] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
              >
                {headline}
              </h2>

              <p className="font-sans text-base text-white/80 leading-relaxed mb-10 max-w-lg mx-auto">
                {body}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-white/20">
                {stats.map((stat, i) => (
                  <div key={i} className="px-4 sm:px-6 py-2">
                    <p
                      className="font-display font-extrabold text-white leading-none mb-2 tabular-nums"
                      style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                    >
                     {stat.value}{stat.suffix}
                    </p>
                    <p className="font-sans text-xs text-white/65 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
