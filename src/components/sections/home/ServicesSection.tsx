'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import ServiceCard from '@/components/shared/ServiceCard'
import { getDynamicIcon } from '@/lib/icons'

interface ServiceItem {
  slug: string
  icon: string
  title: string
  shortDescription: string
  standards: string[]
  cta: string
}

interface ServicesSectionProps {
  label: string
  headline: string
  subheadline: string
  services: ServiceItem[]
  ctaLabel: string
}

export default function ServicesSection({
  label, headline, subheadline, services, ctaLabel,
}: ServicesSectionProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const basePath = isEs ? `/${locale}/servicios` : `/${locale}/services`
  const allServicesHref = basePath

  return (
    <section
      className="bg-white section-py"
      id="servicios"
      aria-labelledby="services-headline"
    >
      <div className="container-section">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <ScrollReveal>
            <SectionLabel>{label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2
              id="services-headline"
              className="font-display font-bold text-neutral-900 leading-[1.15] tracking-[-0.02em] mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
            >
              {headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="font-sans text-base text-neutral-600 leading-relaxed">
              {subheadline}
            </p>
          </ScrollReveal>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => {
            const slug = isEs ? service.slug : service.slug
              .replace('integracion-bim', 'bim-integration')
              .replace('coordinacion-bim', 'bim-coordination')
              .replace('sistemas-especiales', 'special-systems')
              .replace('gestion-informacion', 'information-management')

            const href = `${basePath}/${slug}`

            return (
              <ScrollReveal
                key={service.slug}
                delay={i * 0.08}
                threshold={0.05}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.shortDescription}
                  tags={service.standards}
                  href={href}
                  ctaLabel={service.cta}
                  className="h-full"
                />
              </ScrollReveal>
            )
          })}
        </div>

        {/* All services CTA */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center">
            <Link
              href={allServicesHref}
              className={cn(
                'group inline-flex items-center gap-2',
                'bg-transparent border border-brand-800 text-brand-800 rounded-sm',
                'font-display font-semibold text-[0.8125rem] tracking-[0.04em] uppercase',
                'px-8 py-3.5',
                'transition-all duration-200',
                'hover:bg-brand-50 hover:border-brand-500 hover:text-brand-500',
                'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]'
              )}
            >
              {ctaLabel}
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
