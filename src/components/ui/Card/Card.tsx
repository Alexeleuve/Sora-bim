'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  variant?: 'default' | 'dark' | 'flat'
  hover?: boolean
  className?: string
  children: React.ReactNode
  as?: 'div' | 'article' | 'li'
}

export default function Card({
  variant = 'default',
  hover = true,
  className,
  children,
  as: Tag = 'div',
}: CardProps) {
  const variants = {
    default: cn(
      'bg-white border border-neutral-300 rounded-xl p-8',
      hover && [
        'transition-all duration-250 ease-default',
        'hover:border-brand-500 hover:-translate-y-1',
        'hover:shadow-[0_12px_32px_rgba(3,60,119,0.12),0_4px_8px_rgba(3,60,119,0.08)]',
      ]
    ),
    dark: cn(
      'bg-brand-500/[0.05] border border-brand-300/15 rounded-[0.625rem] p-7',
      hover && [
        'transition-all duration-250 ease-default',
        'hover:bg-brand-500/10 hover:border-brand-300/35',
      ]
    ),
    flat: cn(
      'bg-neutral-50 border border-neutral-200 rounded-xl p-8',
      hover && [
        'transition-all duration-200 ease-default',
        'hover:bg-white hover:border-neutral-300 hover:shadow-md',
      ]
    ),
  }

  return (
    <Tag className={cn(variants[variant], className)}>
      {children}
    </Tag>
  )
}
