'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  dark?: boolean
  className?: string
}

export default function LanguageSwitcher({ dark = false, className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return
    // Replace current locale prefix with new one
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const locales = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
  ]

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Globe
        size={14}
        className={cn('mr-1', dark ? 'text-white/40' : 'text-neutral-400')}
        aria-hidden="true"
      />
      {locales.map((loc, i) => (
        <span key={loc.code} className="flex items-center gap-1">
          <button
            onClick={() => switchLocale(loc.code)}
            className={cn(
              'font-display font-semibold text-[0.6875rem] tracking-[0.08em] uppercase',
              'transition-colors duration-150',
              'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm',
              locale === loc.code
                ? dark ? 'text-white' : 'text-brand-800'
                : dark ? 'text-white/40 hover:text-white/70' : 'text-neutral-400 hover:text-neutral-600',
              locale === loc.code && 'cursor-default'
            )}
            aria-current={locale === loc.code ? 'true' : undefined}
            aria-label={`Switch to ${loc.code === 'es' ? 'Spanish' : 'English'}`}
          >
            {loc.label}
          </button>
          {i < locales.length - 1 && (
            <span
              className={cn('text-[0.6875rem]', dark ? 'text-white/20' : 'text-neutral-300')}
              aria-hidden="true"
            >
              |
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
