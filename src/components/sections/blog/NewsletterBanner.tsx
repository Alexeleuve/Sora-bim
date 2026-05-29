'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { cn, isValidEmail } from '@/lib/utils'

interface NewsletterBannerProps {
  headline: string
  body: string
  placeholder: string
  cta: string
  privacy: string
}

export default function NewsletterBanner({
  headline,
  body,
  placeholder,
  cta,
  privacy,
}: NewsletterBannerProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Por favor ingresa un correo válido')
      return
    }
    setError('')
    setStatus('submitting')

    // Simulate — connect to Mailchimp/ConvertKit/etc in production
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
  }

  return (
    <section className="bg-brand-800 section-py-sm" aria-labelledby="newsletter-headline">
      <div className="container-section">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="newsletter-headline"
            className="font-display font-bold text-white leading-[1.15] tracking-[-0.02em] mb-3"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            {headline}
          </h2>
          <p className="font-sans text-sm text-white/60 leading-relaxed mb-8">
            {body}
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 text-success-100">
              <CheckCircle2 size={20} />
              <span className="font-sans text-sm">
                ¡Suscripción confirmada! Recibirás el próximo artículo.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Formulario de suscripción al newsletter"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder={placeholder}
                  required
                  aria-label={placeholder}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className={cn(
                    'w-full bg-white/10 border rounded-sm',
                    'font-sans text-sm text-white placeholder-white/40',
                    'px-4 py-3 outline-none',
                    'transition-all duration-150',
                    'focus:bg-white/15 focus:border-brand-300',
                    error ? 'border-error-400' : 'border-white/20'
                  )}
                />
                {error && (
                  <p id="newsletter-error" className="text-xs text-error-300 mt-1.5 text-left">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'bg-brand-300 text-neutral-900 rounded-sm',
                  'font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase',
                  'px-6 py-3 whitespace-nowrap',
                  'transition-all duration-200',
                  'hover:bg-white',
                  'disabled:opacity-60 disabled:cursor-not-allowed',
                  'focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[2px]'
                )}
              >
                {status === 'submitting' ? (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <Send size={13} />
                    {cta}
                  </>
                )}
              </button>
            </form>
          )}

          <p className="font-sans text-xs text-white/35 mt-4">{privacy}</p>
        </div>
      </div>
    </section>
  )
}
