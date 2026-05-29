'use client'

import { useReducedMotionPref } from '@/hooks/useReducedMotion'
import { useIntersection } from '@/hooks/useIntersection'
import { cn } from '@/lib/utils'

// ─── SCROLL REVEAL ───────────────────────────────────────────────────
interface ScrollRevealProps {
  children:   React.ReactNode
  delay?:     number   // ms
  className?: string
  once?:      boolean
  threshold?: number
  yOffset?:   number   // kept for API compat, controls which animation class
}

export default function ScrollReveal({
  children,
  delay     = 0,
  className,
  once      = true,
  threshold = 0.12,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotionPref()
  const { ref, visible } = useIntersection({ threshold, once })

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity:           visible || prefersReduced ? 1 : 0,
        transform:         visible || prefersReduced ? 'translateY(0)' : 'translateY(20px)',
        transition:        prefersReduced
          ? 'none'
          : `opacity 500ms cubic-bezier(0,0,0.2,1) ${delay}ms, transform 500ms cubic-bezier(0,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── STAGGER CONTAINER ───────────────────────────────────────────────
interface StaggerContainerProps {
  children:      React.ReactNode
  staggerDelay?: number  // ms between items
  className?:    string
  delayStart?:   number  // ms before first item
}

export function StaggerContainer({
  children,
  staggerDelay = 80,
  className,
  delayStart   = 0,
}: StaggerContainerProps) {
  const { ref, visible } = useIntersection({ threshold: 0.08, once: true })

  return (
    <div ref={ref} className={className} data-stagger-start={delayStart} data-stagger-step={staggerDelay}>
      {visible
        ? children
        : <div style={{ opacity: 0 }}>{children}</div>
      }
    </div>
  )
}

// ─── STAGGER ITEM ────────────────────────────────────────────────────
export function StaggerItem({
  children,
  className,
  index = 0,
  baseDelay = 0,
  stepDelay = 80,
}: {
  children:   React.ReactNode
  className?: string
  index?:     number
  baseDelay?: number
  stepDelay?: number
}) {
  const prefersReduced = useReducedMotionPref()
  const { ref, visible } = useIntersection({ threshold: 0.08, once: true })
  const delay = prefersReduced ? 0 : baseDelay + index * stepDelay

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:   visible || prefersReduced ? 1 : 0,
        transform: visible || prefersReduced ? 'translateY(0)' : 'translateY(18px)',
        transition: prefersReduced
          ? 'none'
          : `opacity 450ms cubic-bezier(0,0,0.2,1) ${delay}ms, transform 450ms cubic-bezier(0,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
