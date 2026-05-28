'use client'

import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import BreadcrumbNav from '@/components/shared/BreadcrumbNav'
import type { BreadcrumbItem } from '@/types'

interface PageHeroProps {
  label?: string
  headline: string
  subheadline?: string
  breadcrumbs?: BreadcrumbItem[]
  className?: string
  centered?: boolean
  children?: React.ReactNode
}

export default function PageHero({
  label,
  headline,
  subheadline,
  breadcrumbs,
  className,
  centered = false,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'bg-neutral-900 section-py-sm',
        className
      )}
    >
      <div className="container-section">
        {breadcrumbs && (
          <BreadcrumbNav
            items={breadcrumbs}
            dark
            className="mb-8"
          />
        )}
        <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
          {label && (
            <SectionLabel dark>{label}</SectionLabel>
          )}
          <h1 className={cn(
            'font-display font-bold text-white',
            'text-4xl md:text-5xl lg:text-[3rem] leading-[1.1] tracking-[-0.025em]',
            'mb-4'
          )}>
            {headline}
          </h1>
          {subheadline && (
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              {subheadline}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
