'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import { cn } from '@/lib/utils'

interface SoraOSFlowProps {
  headline: string
  items:    string[]
}

export default function SoraOSFlow({ headline, items }: SoraOSFlowProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '400px' }}
      aria-label="Flujo de integración SORA OS"
    >
      {/* Background nodes image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sora-os-nodes.jpg"
          alt="Red de nodos técnicos — fondo decorativo SORA OS"
          fill
          aria-hidden="true"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(15,23,42,0.78)' }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[400px] section-py">
        <div className="container-section">
          <ScrollReveal delay={0}>
            <h2
              className="font-display font-bold text-white text-center mb-12 tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)' }}
            >
              {headline}
            </h2>
          </ScrollReveal>

          {/* Flow items — each wrapped in ScrollReveal with stagger */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0 flex-wrap">
            {items.map((item, i) => (
              <div key={item} className="flex flex-col sm:flex-row items-center">

                {/* Item card — motion.div → div with animate-fade-in-up + delay */}
                <div
                  className={cn(
                    'flex flex-col items-center gap-2 px-6 py-5',
                    'bg-white/[0.05] border border-white/10 rounded-xl',
                    'backdrop-blur-sm',
                    'min-w-[130px] text-center',
                    'animate-fade-in-up',
                    i === 0 && 'border-brand-300/30 bg-brand-300/[0.06]'
                  )}
                  style={{
                    animationDelay:    `${200 + i * 150}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <span
                    className={cn(
                      'font-display font-bold text-[0.5rem] tracking-[0.14em] uppercase mb-1',
                      i === 0 ? 'text-brand-300' : 'text-white/30'
                    )}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-sm tracking-[-0.01em]',
                      i === 0 ? 'text-brand-300' : 'text-white/75'
                    )}
                  >
                    {item}
                  </span>
                </div>

                {/* Arrow connector — motion.div → div with animate-fade-in + delay */}
                {i < items.length - 1 && (
                  <div
                    className="flex items-center justify-center w-10 h-10 flex-shrink-0 rotate-90 sm:rotate-0 animate-fade-in"
                    style={{
                      animationDelay:    `${350 + i * 150}ms`,
                      animationFillMode: 'both',
                    }}
                    aria-hidden="true"
                  >
                    <ArrowRight size={16} className="text-brand-300/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
