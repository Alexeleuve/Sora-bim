'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'

/**
 * MotionProvider
 * Wraps the app with Framer Motion's LazyMotion + domAnimation feature set.
 * This code-splits the motion bundle (~18KB gzip) so it only loads when needed.
 *
 * Usage:
 *   // In a client component instead of motion.div, use m.div
 *   import { m } from 'framer-motion'
 *   <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
 *
 * The provider should wrap sections that use animations, not the entire layout.
 */
interface MotionProviderProps {
  children: React.ReactNode
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

// Re-export m for convenience
export { m }
