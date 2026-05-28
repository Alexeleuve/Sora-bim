'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LazySectionProps {
  children:    React.ReactNode
  className?:  string
  rootMargin?: string
  minHeight?:  number  // reserve space to prevent layout shift
  fallback?:   React.ReactNode
}

/**
 * LazySection
 * Defers rendering of content until it's near the viewport.
 * Prevents unnecessary JS execution and rendering for below-fold content.
 *
 * Use for heavy sections that are far below the fold:
 * - Coverage section
 * - Blog preview
 * - Newsletter
 *
 * NOTE: Don't use for Hero or above-fold content.
 */
export default function LazySection({
  children,
  className,
  rootMargin = '400px',
  minHeight,
  fallback,
}: LazySectionProps) {
  const ref           = useRef<HTMLDivElement>(null)
  const [render, setRender] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRender(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div
      ref={ref}
      className={className}
      style={!render && minHeight ? { minHeight } : undefined}
    >
      {render ? children : (fallback ?? null)}
    </div>
  )
}
