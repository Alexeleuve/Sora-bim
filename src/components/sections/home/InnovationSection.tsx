'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface InnovationSectionProps {
  label:    string
  headline: string
  body:     string
  flow:     string[]
  cta:      string
}

export default function InnovationSection({
  label, headline, body, flow, cta,
}: InnovationSectionProps) {
  const locale    = useLocale()
  const soraOsHref = `/${locale}/sora-os`

  return (
    <section
      className="relative bg-neutral-900 section-py overflow-hidden"
      id="innovacion"
      aria-labelledby="innovation-headline"
    >
      {/* Subtle background node pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(56,189,248,1) 1px, transparent 1px)',
          backgroundSize:  '44px 44px',
        }}
        aria-hidden="true"
      />

      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── LEFT: IMAGE ──────────────────────────────── */}
          <ScrollReveal delay={100}>
            <div className="relative overflow-hidden rounded-xl aspect-square max-h-[480px]">
              <Image
                src="/images/sora-os-nodes.jpg"
                alt="Red de nodos técnicos — conectividad e integración de información"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* ─── RIGHT: CONTENT ───────────────────────────── */}
          <div>
            <ScrollReveal delay={0}>
              <SectionLabel dark>{label}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2
                id="innovation-headline"
                className="font-display font-bold text-white leading-[1.12] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
              >
                {headline}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <span className="divider-accent mb-5" aria-hidden="true" />
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="font-sans text-base text-white/65 leading-relaxed mb-10">
                {body}
              </p>
            </ScrollReveal>

            {/* Flow sequence */}
            <ScrollReveal delay={200}>
              <div
                className="rounded-xl p-6 mb-8"
                style={{
                  background: 'rgba(22,135,217,0.06)',
                  border:     '1px solid rgba(56,189,248,0.12)',
                }}
                aria-label="Flujo de integración técnica"
              >
                <div className="space-y-2">
                  {flow.map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      {i > 0 && (
                        <div className="pl-2 mb-1" aria-hidden="true">
                          <div
                            className="w-px h-3 ml-[7px]"
                            style={{ background: 'rgba(56,189,248,0.25)' }}
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        {i > 0 && (
                          <ArrowRight size={12} className="text-brand-300/50 flex-shrink-0" aria-hidden="true" />
                        )}
                        {i === 0 && (
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: '#38BDF8' }}
                            aria-hidden="true"
                          />
                        )}
                        {/* motion.span → span with CSS animation + stagger delay */}
                        <span
                          className={cn(
                            'font-mono text-sm tracking-[-0.01em] animate-fade-in',
                            i === 0 ? 'text-brand-300' : 'text-white/60'
                          )}
                          style={{
                            animationDelay:    `${300 + i * 120}ms`,
                            animationFillMode: 'both',
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={280}>
              <Link
                href={soraOsHref}
                className={cn(
                  'group inline-flex items-center gap-2',
                  'font-display font-semibold text-[0.8125rem] tracking-[0.04em] uppercase',
                  'text-brand-300 hover:text-white',
                  'transition-colors duration-200',
                  'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px] rounded-sm'
                )}
              >
                {cta}
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
