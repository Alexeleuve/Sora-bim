'use client'

import Link from 'next/link'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import Badge from '@/components/ui/Badge/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import IconContainer from '@/components/ui/IconContainer/IconContainer'
import { getDynamicIcon } from '@/lib/icons'

interface UseCase {
  sector: string
  description: string
}

interface ServiceItem {
  slug: string
  icon: string
  title: string
  shortDescription: string
  description: string
  benefits: string[]
  useCases: UseCase[]
  standards: string[]
  cta: string
}

interface ServiceDetailProps {
  service: ServiceItem
  relatedServices: ServiceItem[]
  basePath: string
  locale: string
  labels: {
    benefits: string
    useCases: string
    standards: string
    related: string
    ctaSidebar: string
    ctaSidebarBody: string
    ctaSidebarBtn: string
    back: string
  }
}

export default function ServiceDetail({
  service,
  relatedServices,
  basePath,
  locale,
  labels,
}: ServiceDetailProps) {
  const Icon = getDynamicIcon(service.icon)
  const isEs = locale === 'es'
  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`

  return (
    <section className="bg-neutral-50 section-py" aria-label={`Detalle: ${service.title}`}>
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

          {/* ─── MAIN CONTENT ───────────────────────────────── */}
          <article>
            {/* Service icon + title */}
            <ScrollReveal delay={0}>
              <div className="flex items-start gap-5 mb-8">
                <IconContainer size="lg" className="flex-shrink-0 mt-1">
                  {Icon && (
                    <Icon size={26} strokeWidth={1.5} className="text-brand-800" />
                  )}
                </IconContainer>
                <div>
                  <h1
                    className="font-display font-bold text-neutral-900 leading-[1.1] tracking-[-0.025em] mb-2"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                  >
                    {service.title}
                  </h1>
                  <p className="font-sans text-lg text-neutral-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Standards tags */}
            <ScrollReveal delay={0.06}>
              <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-neutral-200">
                {service.standards.map((std) => (
                  <Badge key={std} variant="technical">{std}</Badge>
                ))}
              </div>
            </ScrollReveal>

            {/* Full description */}
            <ScrollReveal delay={0.08}>
              <div className="prose prose-slate max-w-none mb-12">
                <p className="font-sans text-base text-neutral-700 leading-[1.8]">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Benefits */}
            <ScrollReveal delay={0.1}>
              <div className="mb-12">
                <h2 className="font-display font-bold text-neutral-900 text-xl mb-6">
                  {labels.benefits}
                </h2>
                <ul className="space-y-3" role="list">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-success-50 border border-success-600/20 flex items-center justify-center mt-0.5"
                        aria-hidden="true"
                      >
                        <Check size={11} strokeWidth={2.5} className="text-success-600" />
                      </span>
                      <span className="font-sans text-sm text-neutral-700 leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Use cases */}
            <ScrollReveal delay={0.12}>
              <div className="mb-12">
                <h2 className="font-display font-bold text-neutral-900 text-xl mb-6">
                  {labels.useCases}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {service.useCases.map((useCase, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-5 border border-neutral-200"
                    >
                      <span
                        className="inline-block font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase text-brand-500 bg-brand-50 px-2.5 py-1 rounded-sm mb-3"
                      >
                        {useCase.sector}
                      </span>
                      <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Standards section */}
            <ScrollReveal delay={0.14}>
              <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
                <h3 className="font-display font-semibold text-neutral-900 text-sm mb-4 tracking-wide">
                  {labels.standards}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.standards.map((std) => (
                    <Badge key={std} variant="technical">{std}</Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </article>

          {/* ─── SIDEBAR ────────────────────────────────────── */}
          <aside className="lg:sticky lg:top-28 space-y-6" aria-label="Acciones y servicios relacionados">

            {/* CTA Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-brand-800 rounded-xl p-6 text-white">
                <h3 className="font-display font-bold text-lg mb-2 leading-snug">
                  {labels.ctaSidebar}
                </h3>
                <p className="font-sans text-sm text-white/65 leading-relaxed mb-5">
                  {labels.ctaSidebarBody}
                </p>
                <Link
                  href={contactHref}
                  className={cn(
                    'group flex items-center justify-center gap-2 w-full',
                    'bg-brand-500 text-white rounded-sm',
                    'font-display font-semibold text-[0.75rem] tracking-[0.04em] uppercase',
                    'py-3.5 px-4',
                    'transition-all duration-200',
                    'hover:bg-brand-400',
                    'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]'
                  )}
                >
                  {labels.ctaSidebarBtn}
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Related services */}
            {relatedServices.length > 0 && (
              <ScrollReveal delay={0.16}>
                <div className="bg-white rounded-xl p-6 border border-neutral-200">
                  <h3 className="font-display font-semibold text-neutral-900 text-[0.75rem] tracking-[0.06em] uppercase mb-4">
                    {labels.related}
                  </h3>
                  <ul className="space-y-3" role="list">
                    {relatedServices.map((related) => {
                      const RelIcon = getDynamicIcon(related.icon)
                      return (
                        <li key={related.slug}>
                          <Link
                            href={`${basePath}/${related.slug}`}
                            className={cn(
                              'group flex items-center gap-3',
                              'font-sans text-sm text-neutral-700',
                              'hover:text-brand-500',
                              'transition-colors duration-150',
                              'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm'
                            )}
                          >
                            {RelIcon && (
                              <RelIcon
                                size={14}
                                strokeWidth={1.5}
                                className="text-neutral-400 group-hover:text-brand-500 transition-colors duration-150 flex-shrink-0"
                              />
                            )}
                            <span className="flex-1 leading-snug">{related.title}</span>
                            <ChevronRight
                              size={12}
                              className="text-neutral-300 group-hover:text-brand-300 transition-colors duration-150 flex-shrink-0"
                            />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {/* Back link */}
            <ScrollReveal delay={0.2}>
              <Link
                href={basePath}
                className={cn(
                  'group inline-flex items-center gap-2',
                  'font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase',
                  'text-neutral-400 hover:text-brand-500',
                  'transition-colors duration-150',
                  'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm'
                )}
              >
                ← {labels.back}
              </Link>
            </ScrollReveal>

          </aside>
        </div>
      </div>
    </section>
  )
}
