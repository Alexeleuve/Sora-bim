'use client'

import { useEffect, useState } from 'react'

/**
 * useReducedMotion
 * Returns true if the user has requested reduced motion via OS settings.
 * Use this to disable or simplify animations.
 *
 * Works with server-side rendering: defaults to false on server,
 * then syncs with the media query on the client.
 */
export function useReducedMotionPref(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

/**
 * useAnimationConfig
 * Returns Framer Motion-compatible transition config
 * that respects reduced motion preference.
 */
export function useAnimationConfig(
  normalConfig: Record<string, unknown>,
  reducedConfig: Record<string, unknown> = { duration: 0.01 }
) {
  const prefersReduced = useReducedMotionPref()
  return prefersReduced ? reducedConfig : normalConfig
}
