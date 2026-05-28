'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BreadcrumbItem } from '@/types'

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  dark?: boolean
  className?: string
}

export default function BreadcrumbNav({ items, dark = false, className }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol
        className="flex items-center gap-1 flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li
              key={index}
              className="flex items-center gap-1"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'font-sans text-sm transition-colors duration-150',
                    dark
                      ? 'text-white/50 hover:text-white/90'
                      : 'text-neutral-500 hover:text-brand-500'
                  )}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'font-sans text-sm',
                    isLast
                      ? dark ? 'text-white/70' : 'text-neutral-600'
                      : dark ? 'text-white/50' : 'text-neutral-500'
                  )}
                  itemProp="name"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {!isLast && (
                <ChevronRight
                  size={12}
                  className={cn(
                    'flex-shrink-0',
                    dark ? 'text-white/30' : 'text-neutral-400'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
