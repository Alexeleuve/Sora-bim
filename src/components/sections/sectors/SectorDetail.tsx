'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import Badge from '@/components/ui/Badge/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import { getDynamicIcon } from '@/lib/icons'

interface SectorItem {
  slug: string
  icon: string
  title: string
  tagline: string
  description: string
  systems: string[]
  services: string[]
}

interface ServiceItem {
  slug: string
  icon: string
  title: string
  shortDescription: string
  standards: string[]
  cta: string
}

interface SectorDetailProps {
  sector: SectorItem
  relatedServices: ServiceItem[]
  servicesBasePath: string
  contactHref: string
  locale: string
  labels: {
    systems: string
    services: string
    cta: string
    back: string
  }
}

export default function SectorDetail({
  sector, relatedServices, servicesBasePath, contactHref, locale, labels,
}: SectorDetailProps) {
  const Icon = getDynamicIcon(sector.icon)
  const isEs = locale === 'es'

  return (
    <section className="bg-neutral-50 section-py">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* Main */}
          <article>
            <ScrollReveal delay={0}>
              <div className="flex items-center gap-4 mb-6">
                {Icon && (
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} strokeWidth={1.5} className="text-brand-800" />
                  </div>
                )}
                <div>
                  <p className="font-sans text-sm font-medium text-brand-500 mb-0.5">
                    {sector.tagline}
                  </p>
                  <h1
                    className="font-display font-bold text-neutral-900 leading-tight tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                  >
                    {sector.title}
                  </h1>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p className="font-sans text-base text-neutral-700 leading-[1.8] mb-10 pb-10 border-b border-neutral-200">
                {sector.description}
              </p>
            </ScrollReveal>

            {/* Systems */}
            <ScrollReveal delay={0.1}>
              <div className="mb-10">
                <h2 className="font-display font-bold text-neutral-900 text-xl mb-5">
                  {labels.systems}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {sector.systems.map((sys) => (
                    <span
                      key={sys}
                      className="font-mono text-xs px-3 py-1.5 rounded-sm border border-brand-200 bg-brand-50 text-brand-700"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Related services */}
            <ScrollReveal delay={0.14}>
              <div>
                <h2 className="font-display font-bold text-neutral-900 text-xl mb-5">
                  {labels.services}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedServices.map((service) => {
                    const SIcon = getDynamicIcon(service.icon)
                    return (
                      <Link
                        key={service.slug}
                        href={`${servicesBasePath}/${service.slug}`}
                        className={cn(
                          'group flex items-start gap-4 p-5',
                          'bg-white rounded-xl border border-neutral-200',
                          'transition-all duration-200',
                          'hover:border-brand-300 hover:-translate-y-0.5 hover:shadow-md',
                          'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]'
                        )}
                      >
                        {SIcon && (
                          <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <SIcon size={16} strokeWidth={1.5} className="text-brand-800" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-display font-semibold text-neutral-900 text-sm mb-1 group-hover:text-brand-500 transition-colors duration-150">
                            {service.title}
                          </h3>
                          <p className="font-sans text-xs text-neutral-500 leading-relaxed line-clamp-2">
                            {service.shortDescription}
                          </p>
                        </div>
                        <ArrowRight
                          size={14}
                          className="text-neutral-300 group-hover:text-brand-400 flex-shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5"
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 space-y-5">
            <ScrollReveal delay={0.12}>
              <div className="bg-brand-800 rounded-xl p-6 text-white">
                <h3 className="font-display font-bold text-base mb-2">
                  {isEs
                    ? `¿Proyecto de ${sector.title}?`
                    : `${sector.title} project?`}
                </h3>
                <p className="font-sans text-xs text-white/60 leading-relaxed mb-5">
                  {isEs
                    ? 'Cuéntanos sobre tu proyecto. Iniciamos con un diagnóstico técnico gratuito.'
                    : 'Tell us about your project. We start with a free technical assessment.'}
                </p>
                <Link
                  href={contactHref}
                  className={cn(
                    'group flex items-center justify-center gap-2 w-full',
                    'bg-brand-500 text-white rounded-sm py-3 px-4',
                    'font-display font-semibold text-[0.6875rem] tracking-[0.04em] uppercase',
                    'hover:bg-brand-400 transition-colors duration-200'
                  )}
                >
                  {labels.cta}
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </ScrollReveal>
          </aside>

        </div>
      </div>
    </section>
  )
}
