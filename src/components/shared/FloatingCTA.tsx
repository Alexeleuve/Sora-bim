'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingCTAProps {
  label: string
  href: string
  className?: string
}

export default function FloatingCTA({ label, href, className }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      setVisible(pct > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
          className={cn(
            'fixed bottom-6 left-4 right-4 z-50 md:hidden',
            className
          )}
        >
          <Link
            href={href}
            className={cn(
              'flex items-center justify-center w-full',
              'bg-brand-500 text-white rounded-sm',
              'font-display font-semibold text-sm tracking-[0.04em] uppercase',
              'py-4 px-6',
              'shadow-brand-lg',
              'transition-colors duration-200',
              'hover:bg-brand-600',
              'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]'
            )}
          >
            {label}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
