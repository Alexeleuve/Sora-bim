import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Locale } from '@/types'

// ─── CLASS UTILITY ───────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── DATE FORMATTING ─────────────────────────────────────────────────
export function formatDate(dateString: string, locale: Locale = 'es'): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', options)
}

export function formatDateShort(dateString: string, locale: Locale = 'es'): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', options)
}

// ─── SLUG UTILS ──────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ─── URL UTILS ───────────────────────────────────────────────────────
export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${cleanPath}`
}

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://sorafusion.com'
}

// ─── SEO UTILS ───────────────────────────────────────────────────────
export function buildSEOTitle(pageTitle: string, siteName = 'SORA | Technical BIM Integration'): string {
  if (!pageTitle) return siteName
  return `${pageTitle} — ${siteName}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// ─── NUMBER FORMATTING ───────────────────────────────────────────────
export function formatNumber(value: number, locale: Locale = 'es'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-MX' : 'en-US').format(value)
}

// ─── DEBOUNCE ────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// ─── EMAIL VALIDATION ────────────────────────────────────────────────
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// ─── READING TIME ────────────────────────────────────────────────────
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// ─── LOCALE UTILS ────────────────────────────────────────────────────
export function isValidLocale(locale: string): locale is Locale {
  return ['es', 'en'].includes(locale)
}

// ─── IMAGE UTILS ─────────────────────────────────────────────────────
export function getImagePath(filename: string): string {
  return `/images/${filename}`
}

// ─── ARRAY UTILS ─────────────────────────────────────────────────────
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}
