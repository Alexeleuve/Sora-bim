'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'

interface SoraOSHeroProps {
  label: string
  headline: string
  subheadline: string
}

export default function SoraOSHero({ label, headline, subheadline }: SoraOSHeroProps) {
  const prefersReduced = useReducedMotion()

  const variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }
  const item = {
    hidden:  { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0, 0, 0.2, 1] } },
  }

  return (
    <section
      className="relative min-h-[60vh] flex items-end overflow-hidden bg-neutral-900"
      aria-labelledby="sora-os-page-headline"
    >
      {/* BG image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sora-os-particles.jpg"
          alt="Flujo de partículas — SORA OS sistema de integración"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.3) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Node pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(56,189,248,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-section relative z-10 pt-32 pb-16">
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={item}>
            <SectionLabel dark>{label}</SectionLabel>
          </motion.div>

          {/* SORA OS typographic logotype */}
          <motion.div variants={item} className="mb-4">
            <span
              className="font-display font-black tracking-[0.04em] uppercase leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                background: 'linear-gradient(135deg, #38BDF8 0%, #1687D9 60%, #38BDF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SORA OS
            </span>
          </motion.div>

          {/* Gradient rule */}
          <motion.div
            variants={item}
            className="mb-6"
            aria-hidden="true"
          >
            <div
              style={{
                width: '80px',
                height: '2px',
                background: 'linear-gradient(to right, #38BDF8, #1687D9)',
              }}
            />
          </motion.div>

          <motion.h1
            id="sora-os-page-headline"
            variants={item}
            className="font-display font-bold text-white leading-[1.1] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
          >
            {headline}
          </motion.h1>

          <motion.p variants={item} className="font-sans text-base text-white/65 leading-relaxed max-w-xl">
            {subheadline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
