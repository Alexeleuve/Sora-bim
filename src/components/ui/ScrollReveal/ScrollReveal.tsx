'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children:   React.ReactNode
  delay?:     number
  duration?:  number
  yOffset?:   number
  className?: string
  once?:      boolean
  threshold?: number
}

export default function ScrollReveal({ children, delay = 0, duration = 0.5, yOffset = 20, className, once = true, threshold = 0.12 }: ScrollRevealProps) {
  const prefersReduced = useReducedMotion()
  const variants = {
    hidden:  { opacity: 0, y: prefersReduced ? 0 : yOffset },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0.01 : duration, delay: prefersReduced ? 0 : delay, ease: [0, 0, 0.2, 1] as [number,number,number,number] } },
  }
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial="hidden" whileInView="visible" viewport={{ once, amount: threshold }} variants={variants} className={className}>
        {children}
      </m.div>
    </LazyMotion>
  )
}

interface StaggerContainerProps { children: React.ReactNode; staggerDelay?: number; className?: string; delayStart?: number }

export function StaggerContainer({ children, staggerDelay = 0.08, className, delayStart = 0 }: StaggerContainerProps) {
  const prefersReduced = useReducedMotion()
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: prefersReduced ? 0 : staggerDelay, delayChildren: prefersReduced ? 0 : delayStart } } }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <m.div variants={{ hidden: { opacity: 0, y: prefersReduced ? 0 : 18 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0.01 : 0.45, ease: [0,0,0.2,1] as [number,number,number,number] } } }} className={className}>
      {children}
    </m.div>
  )
}
