'use client'

import { cn } from '@/lib/utils'

interface IconContainerProps {
  children: React.ReactNode
  variant?: 'light' | 'dark' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function IconContainer({
  children,
  variant = 'light',
  size = 'md',
  className,
}: IconContainerProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const variants = {
    light:    'bg-brand-50',
    dark:     'bg-brand-300/10',
    outlined: 'bg-transparent border border-neutral-300',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center flex-shrink-0',
        'rounded-md',
        sizes[size],
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  )
}
