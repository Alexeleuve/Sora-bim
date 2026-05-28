'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import ServiceCard from '@/components/shared/ServiceCard'

interface ServiceItem {
  slug: string
  icon: string
  title: string
  shortDescription: string
  standards: string[]
  cta: string
  category?: string
}

interface ServicesGridProps {
  services: ServiceItem[]
  basePath: string
  filters?: { label: string; value: string }[]
  allLabel?: string
}

export default function ServicesGrid({
  services,
  basePath,
  filters,
  allLabel = 'Todos',
}: ServicesGridProps) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? services
    : services.filter((s) => s.category === active)

  return (
    <section className="bg-neutral-50 section-py" aria-label="Listado de servicios">
      <div className="container-section">

        {/* Filter tabs */}
        {filters && filters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Filtrar servicios">
            <button
              role="tab"
              aria-selected={active === 'all'}
              onClick={() => setActive('all')}
              className={cn(
                'font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase',
                'px-4 py-2 rounded-sm border transition-all duration-150',
                'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]',
                active === 'all'
                  ? 'bg-brand-800 text-white border-brand-800'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-500 hover:text-brand-500'
              )}
            >
              {allLabel}
            </button>
            {filters.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={active === f.value}
                onClick={() => setActive(f.value)}
                className={cn(
                  'font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase',
                  'px-4 py-2 rounded-sm border transition-all duration-150',
                  'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]',
                  active === f.value
                    ? 'bg-brand-800 text-white border-brand-800'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-500 hover:text-brand-500'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Services grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role={filters ? 'tabpanel' : undefined}
        >
          {filtered.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.07} threshold={0.04}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.shortDescription}
                tags={service.standards}
                href={`${basePath}/${service.slug}`}
                ctaLabel={service.cta}
                className="h-full"
              />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
