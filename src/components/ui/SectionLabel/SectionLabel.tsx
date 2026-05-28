'use client'

import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  dark?: boolean
  className?: string
}

export default function SectionLabel({ children, dark = false, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5',
        'font-display font-semibold text-[0.6875rem] tracking-[0.12em] uppercase',
        'mb-3',
        dark ? 'text-brand-300' : 'text-brand-500',
        className
      )}
    >
      <span
        className={cn(
          'block w-6 h-[1.5px] flex-shrink-0',
          dark ? 'bg-brand-300' : 'bg-brand-500'
        )}
        aria-hidden="true"
      />
      {children}
    </p>
  )
}
