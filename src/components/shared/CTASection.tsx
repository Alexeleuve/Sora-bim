'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackDiagnosticClick } from '@/lib/analytics'
import Button from '@/components/ui/Button/Button'

interface CTASectionProps {
  headline: string
  body?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  variant?: 'light' | 'dark' | 'brand'
  className?: string
}

export default function CTASection({
  headline,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'light',
  className,
}: CTASectionProps) {
  const backgrounds   = { light: 'bg-brand-50',     dark: 'bg-neutral-900', brand: 'bg-brand-800' }
  const headlineColors = { light: 'text-neutral-900', dark: 'text-white',    brand: 'text-white' }
  const bodyColors    = { light: 'text-neutral-600', dark: 'text-white/65',  brand: 'text-white/75' }

  return (
    <section className={cn('section-py', backgrounds[variant], className)}>
      <div className="container-section">
        <div className="max-w-content mx-auto text-center">
          <h2 className={cn(
            'font-display font-bold leading-[1.15] tracking-[-0.02em] mb-4',
            'text-3xl md:text-4xl',
            headlineColors[variant]
          )}>
            {headline}
          </h2>
          {body && (
            <p className={cn('text-lg leading-relaxed mb-8 max-w-xl mx-auto', bodyColors[variant])}>
              {body}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={primaryHref}
              variant={variant === 'light' ? 'primary' : 'outline-light'}
              size="lg"
              icon={<ArrowRight size={16} />}
              onClick={() =>
                trackDiagnosticClick({
                  cta_label:    primaryLabel,
                  cta_location: 'cta_section',
                  href:         primaryHref,
                })
              }
            >
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button
                href={secondaryHref}
                variant={variant === 'light' ? 'secondary' : 'outline-light'}
                size="lg"
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
