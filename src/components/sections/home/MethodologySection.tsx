'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface Step {
  number: string
  title: string
  description: string
}

interface MethodologySectionProps {
  label: string
  headline: string
  steps: Step[]
  quote: string
  quoteAuthor: string
}

export default function MethodologySection({
  label, headline, steps, quote, quoteAuthor,
}: MethodologySectionProps) {
  return (
    <section
      className="bg-neutral-900 section-py"
      id="metodologia"
      aria-labelledby="methodology-headline"
    >
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ─── LEFT: STEPS ────────────────────────────────── */}
          <div>
            <ScrollReveal delay={0}>
              <SectionLabel dark>{label}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h2
                id="methodology-headline"
                className="font-display font-bold text-white leading-[1.12] tracking-[-0.02em] mb-10"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
              >
                {headline}
              </h2>
            </ScrollReveal>

            {/* Steps */}
            <div className="space-y-0">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={0.1 + i * 0.07}>
                  <div className={cn(
                    'flex gap-6 py-6',
                    i < steps.length - 1 && 'border-b border-white/[0.08]'
                  )}>
                    {/* Step number */}
                    <div className="flex-shrink-0 pt-0.5">
                      <span
                        className="font-display font-extrabold leading-none tabular-nums"
                        style={{
                          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                          color: 'rgba(56,189,248,0.35)',
                        }}
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                    </div>
                    {/* Step content */}
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-white text-base mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm text-white/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: IMAGE + QUOTE ────────────────────────── */}
          <div className="lg:sticky lg:top-32">
            <ScrollReveal delay={0.2}>
              <div className="relative overflow-hidden rounded-xl aspect-[4/5] max-h-[540px] mb-8">
                <Image
                  src="/images/methodology-team.jpg"
                  alt="Equipo coordinado trabajando con precisión y sincronía"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  loading="lazy"
                />
                {/* Subtle blue overlay */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(3,60,119,0.12)' }}
                  aria-hidden="true"
                />
              </div>
            </ScrollReveal>

            {/* Quote */}
            <ScrollReveal delay={0.3}>
              <blockquote className={cn(
                'border-l-[3px] border-brand-300 pl-5',
              )}>
                <p className="font-sans italic text-white/80 leading-relaxed mb-2 text-base">
                  &ldquo;{quote}&rdquo;
                </p>
                <cite className="font-display font-semibold text-[0.6875rem] tracking-[0.08em] uppercase text-white/35 not-italic">
                  — {quoteAuthor}
                </cite>
              </blockquote>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
