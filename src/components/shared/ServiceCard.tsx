'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge/Badge'
import IconContainer from '@/components/ui/IconContainer/IconContainer'
import { getDynamicIcon } from '@/lib/icons'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  tags?: string[]
  href: string
  ctaLabel: string
  variant?: 'default' | 'compact'
  className?: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  tags,
  href,
  ctaLabel,
  variant = 'default',
  className,
}: ServiceCardProps) {
  const Icon = getDynamicIcon(icon)

  return (
    <Link
      href={href}
      className={cn(
        'group block',
        'bg-white border border-neutral-300 rounded-xl',
        'transition-all duration-250 ease-default',
        'hover:border-brand-500 hover:-translate-y-1',
        'hover:shadow-[0_12px_32px_rgba(3,60,119,0.12),0_4px_8px_rgba(3,60,119,0.08)]',
        'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]',
        variant === 'default' ? 'p-8' : 'p-6',
        className
      )}
      aria-label={title}
    >
      {/* Icon */}
      <IconContainer variant="light" className="mb-5">
        {Icon && (
          <Icon size={20} className="text-brand-800" strokeWidth={1.5} />
        )}
      </IconContainer>

      {/* Title */}
      <h3 className={cn(
        'font-display font-semibold text-neutral-900',
        'transition-colors duration-200 group-hover:text-brand-500',
        'mb-2',
        variant === 'default' ? 'text-xl' : 'text-lg'
      )}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn(
        'font-sans text-neutral-600 leading-relaxed',
        variant === 'default' ? 'text-sm mb-4' : 'text-sm mb-3',
        variant === 'default' && 'line-clamp-3'
      )}>
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && variant === 'default' && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <Badge key={tag} variant="service">{tag}</Badge>
          ))}
        </div>
      )}

      {/* CTA */}
      <span className={cn(
        'inline-flex items-center gap-1.5',
        'font-display font-semibold text-[0.6875rem] tracking-[0.04em] uppercase',
        'text-brand-500',
        'transition-colors duration-200 group-hover:text-brand-600'
      )}>
        {ctaLabel}
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
