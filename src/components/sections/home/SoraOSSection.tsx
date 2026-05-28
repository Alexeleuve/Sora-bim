'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import { getDynamicIcon } from '@/lib/icons'

interface Pillar {
  icon: string
  title: string
  description: string
}

interface SoraOSSectionProps {
  label: string
  title: string
  headline: string
  body: string
  pillars: Pillar[]
  cta: string
}

export default function SoraOSSection({
  label, title, headline, body, pillars, cta,
}: SoraOSSectionProps) {
  const locale = useLocale()
  const soraOsHref = `/${locale}/sora-os`

  return (
    <section
      className="relative bg-neutral-900 section-py overflow-hidden"
      id="sora-os"
      aria-labelledby="sora-os-headline"
    >
      {/* Background node pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(22,135,217,1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="container-section relative z-10">

        {/* ─── SECTION HEADER ─────────────────────────────── */}
        <div className="max-w-content mx-auto text-center mb-14">
          <ScrollReveal delay={0}>
            <SectionLabel dark>{label}</SectionLabel>
          </ScrollReveal>

          {/* SORA OS logotype */}
          <ScrollReveal delay={0.08}>
            <div className="mb-3">
              <span
                className="font-display font-black text-[2.5rem] sm:text-[3rem] tracking-[0.04em] uppercase"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #1687D9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </span>
            </div>
            {/* Gradient underline */}
            <div
              className="mx-auto mb-6"
              style={{
                width: '64px',
                height: '2px',
                background: 'linear-gradient(to right, #38BDF8, #1687D9)',
              }}
              aria-hidden="true"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2
              id="sora-os-headline"
              className="font-display font-bold text-white leading-[1.15] tracking-[-0.02em] mb-4"
              style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)' }}
            >
              {headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="font-sans text-base text-white/60 leading-relaxed max-w-xl mx-auto mb-2">
              {body}
            </p>
          </ScrollReveal>
        </div>

        {/* ─── SPLIT: NARRATIVE + IMAGE ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center mb-14">

          {/* Pillars grid */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, i) => {
                const Icon = getDynamicIcon(pillar.icon)
                return (
                  <ScrollReveal key={pillar.title} delay={0.08 + i * 0.06}>
                    <div className={cn(
                      'p-5 rounded-[0.625rem]',
                      'bg-brand-500/[0.05] border border-brand-300/15',
                      'transition-all duration-250',
                      'hover:bg-brand-500/10 hover:border-brand-300/30',
                    )}>
                      {Icon && (
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className="text-brand-300 mb-3.5"
                        />
                      )}
                      <h3 className="font-display font-semibold text-white text-sm mb-1.5 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs text-white/55 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal delay={0.2}>
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] max-h-[480px]">
              <Image
                src="/images/sora-os-particles.jpg"
                alt="Flujo de información técnica — Sistema SORA OS"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 420px"
                loading="lazy"
              />
              {/* Vignette for depth */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(to bottom, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.0) 40%, rgba(15,23,42,0.3) 100%)',
                }}
                aria-hidden="true"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* ─── CTA ─────────────────────────────────────────── */}
        <ScrollReveal delay={0.15}>
          <div className="text-center">
            <Link
              href={soraOsHref}
              className={cn(
                'group inline-flex items-center gap-2',
                'bg-transparent text-brand-300 border border-brand-300 rounded-sm',
                'font-display font-semibold text-[0.8125rem] tracking-[0.04em] uppercase',
                'px-8 py-3.5',
                'transition-all duration-200',
                'hover:bg-brand-300/10',
                'focus-visible:outline-[3px] focus-visible:outline-brand-300/50 focus-visible:outline-offset-[3px]'
              )}
            >
              {cta}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
