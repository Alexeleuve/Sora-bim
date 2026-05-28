'use client'

import { useEffect, useState, useCallback } from 'react'

interface ScrollState {
  y:          number  // scrollY in px
  direction:  'up' | 'down' | null
  progress:   number  // 0–100
  atTop:      boolean
  atBottom:   boolean
  pastThreshold: boolean
}

/**
 * useScrollProgress
 * Tracks scroll position, direction, and progress.
 * Throttled to animation frame for performance.
 *
 * @param threshold - px threshold for pastThreshold flag (default 80)
 */
export function useScrollProgress(threshold = 80): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y:             0,
    direction:     null,
    progress:      0,
    atTop:         true,
    atBottom:      false,
    pastThreshold: false,
  })

  const update = useCallback(() => {
    const y           = window.scrollY
    const docHeight   = document.documentElement.scrollHeight - window.innerHeight
    const progress    = docHeight > 0 ? Math.round((y / docHeight) * 100) : 0

    setState((prev) => ({
      y,
      direction:     y > prev.y ? 'down' : y < prev.y ? 'up' : prev.direction,
      progress,
      atTop:         y <= 0,
      atBottom:      y >= docHeight - 10,
      pastThreshold: y > threshold,
    }))
  }, [threshold])

  useEffect(() => {
    let rafId: number

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [update])

  return state
}
