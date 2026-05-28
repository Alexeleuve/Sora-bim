'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  value: number; suffix?: string; prefix?: string
  duration?: number; className?: string; separator?: boolean
}

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1200, className, separator = false }: AnimatedCounterProps) {
  const [count, setCount]   = useState(0)
  const [hasRun, setHasRun] = useState(false)
  const containerRef        = useRef<HTMLSpanElement>(null)
  const rafRef              = useRef<number>(0)

  const fmt = useCallback((n: number) => separator ? n.toLocaleString('es-MX') : String(n), [separator])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setCount(value); return }
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || hasRun) return
      setHasRun(true)
      observer.disconnect()
      const startTime = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased    = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * value))
        if (progress < 1) rafRef.current = requestAnimationFrame(tick)
        else setCount(value)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [value, duration, hasRun])

  return (
    <span ref={containerRef} className={cn('tabular-nums', className)} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{fmt(count)}{suffix}
    </span>
  )
}
