'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'service' | 'technical' | 'technical-dark' | 'sector' | 'status-new' | 'status-featured'
  className?: string
  children: React.ReactNode
}

export default function Badge({ variant = 'service', className, children }: BadgeProps) {
  const variants = {
    service: 'bg-brand-50 text-brand-500 font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase px-2.5 py-1 rounded-sm',
    technical: 'font-mono text-[0.75rem] tracking-[-0.01em] px-2.5 py-[5px] border border-brand-800/25 text-brand-800 rounded-sm',
    'technical-dark': 'font-mono text-[0.75rem] tracking-[-0.01em] px-2.5 py-[5px] border border-brand-300/30 text-brand-300 rounded-sm',
    sector: 'bg-neutral-100 text-neutral-600 font-sans font-medium text-xs px-2.5 py-1 rounded-sm',
    'status-new': 'bg-success-100 text-success-700 font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase px-3 py-1 rounded-full',
    'status-featured': 'bg-brand-50 text-brand-800 font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase px-3 py-1 rounded-full',
  }

  return (
    <span className={cn('inline-flex items-center', variants[variant], className)}>
      {children}
    </span>
  )
}
