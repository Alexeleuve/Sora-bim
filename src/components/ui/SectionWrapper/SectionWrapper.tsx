'use client'

import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id?: string
  className?: string
  background?: 'light' | 'dark' | 'white' | 'brand' | 'accent' | 'transparent'
  children: React.ReactNode
  fullWidth?: boolean
  noPadding?: boolean
  as?: 'section' | 'div' | 'article'
}

const backgrounds = {
  light:       'bg-neutral-50',
  dark:        'bg-neutral-900',
  white:       'bg-white',
  brand:       'bg-brand-800',
  accent:      'bg-brand-50',
  transparent: 'bg-transparent',
}

export default function SectionWrapper({
  id,
  className,
  background = 'light',
  children,
  fullWidth = false,
  noPadding = false,
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        backgrounds[background],
        !noPadding && 'section-py',
        className
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="container-section">
          {children}
        </div>
      )}
    </Tag>
  )
}
