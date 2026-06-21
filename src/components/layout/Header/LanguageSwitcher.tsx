'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  dark?: boolean
  className?: string
}

// ── Section path translation (mirrors routing.ts pathnames) ───────────────────
const ES_TO_EN: Record<string, string> = {
  'servicios':       'services',
  'sectores':        'sectors',
  'nosotros':        'about',
  'contacto':        'contact',
  'casos-de-exito':  'case-studies',
  'categoria':       'category',
  // same in both locales:
  'blog':            'blog',
  'sora-os':         'sora-os',
}
const EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(ES_TO_EN).map(([k, v]) => [v, k])
)

// ── Service slug translation ──────────────────────────────────────────────────
const SERVICE_ES_TO_EN: Record<string, string> = {
  'integracion-bim':    'bim-integration',
  'coordinacion-bim':   'bim-coordination',
  'sistemas-especiales': 'special-systems',
  'sistemas-electricos': 'electrical-systems',
  'gestion-informacion': 'information-management',
  'bim-4d':             'bim-4d',
  'bim-5d':             'bim-5d',
}
const SERVICE_EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_ES_TO_EN).map(([k, v]) => [v, k])
)

// ── Sector slug translation ───────────────────────────────────────────────────
const SECTOR_ES_TO_EN: Record<string, string> = {
  'industrial':      'industrial',
  'data-centers':    'data-centers',
  'hospitales':      'hospitals',
  'comercial':       'commercial',
  'infraestructura': 'infrastructure',
}
const SECTOR_EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(SECTOR_ES_TO_EN).map(([k, v]) => [v, k])
)

/**
 * Translates a full pathname from one locale to another.
 *
 * Strategy:
 * 1. Strip the locale prefix to get the raw path segments.
 * 2. Normalize segment[0] (section) to its ES canonical form.
 * 3. Translate section + slug to the target locale.
 * 4. Reassemble with the new locale prefix.
 */
function translatePath(
  fullPath: string,   // e.g. '/es/servicios/integracion-bim'
  fromLocale: string,
  toLocale:   string,
): string {
  // Split and drop the locale prefix
  const parts    = fullPath.split('/').filter(Boolean) // ['es', 'servicios', 'integracion-bim']
  const [, ...rest] = parts // ['servicios', 'integracion-bim']

  if (rest.length === 0) return `/${toLocale}`

  const [section, slug, ...tail] = rest

  // Step 1: resolve to ES canonical section name
  const canonicalSection =
    fromLocale === 'en' ? (EN_TO_ES[section] ?? section) : section

  // Step 2: translate section to target locale
  const targetSection =
    toLocale === 'en' ? (ES_TO_EN[canonicalSection] ?? canonicalSection) : canonicalSection

  // Step 3: translate slug if present
  let targetSlug = slug
  if (slug) {
    if (canonicalSection === 'servicios') {
      targetSlug =
        fromLocale === 'es'
          ? (SERVICE_ES_TO_EN[slug] ?? slug)
          : (SERVICE_EN_TO_ES[slug] ?? slug)
    } else if (canonicalSection === 'sectores') {
      targetSlug =
        fromLocale === 'es'
          ? (SECTOR_ES_TO_EN[slug] ?? slug)
          : (SECTOR_EN_TO_ES[slug] ?? slug)
    }
    // blog slugs are the same in both locales — no translation needed
  }

  // Reassemble
  const segments = [toLocale, targetSection, targetSlug, ...tail].filter(Boolean)
  return '/' + segments.join('/')
}

export default function LanguageSwitcher({ dark = false, className }: LanguageSwitcherProps) {
  const locale   = useLocale()
  const pathname = usePathname() // full path including locale, e.g. '/es/servicios/integracion-bim'
  const router   = useRouter()

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return
    const newPath = translatePath(pathname, locale, newLocale)
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
