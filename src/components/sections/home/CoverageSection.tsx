'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

interface Location {
  city: string
  role: string
  description: string
}

interface CoverageSectionProps {
  label: string
  headline: string
  subheadline: string
  locations: Location[]
  alliance: {
    title: string
    body: string
  }
}

export default function CoverageSection({
  label, headline, subheadline, locations, alliance,
}: CoverageSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      id="cobertura"
      aria-labelledby="coverage-headline"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">

        {/* ─── LEFT: BRAND CONTENT ────────────────────────── */}
        <div className="bg-brand-800 section-py relative overflow-hidden">
          {/* Subtle pattern on brand bg */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden="true"
          />

          <div
            className="relative z-10 px-8 sm:px-12 lg:px-16 max-w-[560px]"
          >
            <ScrollReveal delay={0}>
              <SectionLabel dark>{label}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h2
                id="coverage-headline"
                className="font-display font-bold text-white leading-[1.1] tracking-[-0.02em] mb-2"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
              >
                {headline}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="font-sans text-sm text-white/55 mb-10 tracking-wide">
                {subheadline}
              </p>
            </ScrollReveal>

            {/* Locations list */}
            <div className="space-y-6 mb-10">
              {locations.map((loc, i) => (
                <ScrollReveal key={loc.city} delay={0.1 + i * 0.07}>
                  <div className="flex gap-4">
                    <MapPin
                      size={16}
                      className="text-brand-300 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <h3 className="font-display font-bold text-white text-sm">
                          {loc.city}
                        </h3>
                        <span
                          className="font-display font-semibold text-[0.5625rem] tracking-[0.1em] uppercase text-brand-300/80 bg-brand-300/10 px-2 py-0.5 rounded-sm"
                        >
                          {loc.role}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-white/55 leading-relaxed">
                        {loc.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Alliance card */}
            <ScrollReveal delay={0.35}>
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <h4 className="font-display font-semibold text-white text-[0.75rem] tracking-[0.06em] uppercase mb-2">
                  {alliance.title}
                </h4>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  {alliance.body}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ─── RIGHT: CITY IMAGE ──────────────────────────── */}
        <div className="relative min-h-[360px] lg:min-h-0">
          <Image
            src="/images/coverage-city.jpg"
            alt="Ciudad iluminada vista aérea — cobertura nacional de SORA"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
          {/* Subtle brand tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(3,60,119,0.18)' }}
            aria-hidden="true"
          />
        </div>

      </div>
    </section>
  )
}
