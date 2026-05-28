'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

const sizeClasses = {
  sm:  'px-4 py-2 text-xs gap-1.5',
  md:  'px-6 py-3 text-sm gap-2',
  lg:  'px-9 py-4 text-sm gap-2',
}

const variantClasses = {
  primary:       'bg-brand-500 text-white hover:bg-brand-600 hover:-translate-y-px hover:shadow-brand active:bg-brand-800 active:translate-y-0',
  secondary:     'bg-transparent text-brand-800 border border-brand-800 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-500',
  'outline-light':'bg-transparent text-white border border-white/40 hover:bg-white/[0.08] hover:border-white/80',
  accent:        'bg-transparent text-brand-300 border border-brand-300 hover:bg-brand-300/10',
  ghost:         'bg-transparent text-brand-500 hover:text-brand-800 hover:underline underline-offset-[3px] decoration-[1.5px] px-0 py-0',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  className,
  onClick,
  children,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-display font-semibold tracking-[0.04em] uppercase rounded-sm',
    'transition-all duration-200 ease-default outline-none',
    'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]',
    'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    variant === 'ghost' ? '' : '',
    className
  )

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={cn(
          'flex-shrink-0 transition-transform duration-200 ease-out',
          'group-hover:translate-x-1'
        )}>
          {icon}
        </span>
      )}
      {loading && (
        <svg
          className="animate-spin h-4 w-4 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClasses, 'group')}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      )
    }
    return (
      <Link
        href={href}
        className={cn(baseClasses, 'group')}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(baseClasses, 'group')}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {content}
    </button>
  )
}
