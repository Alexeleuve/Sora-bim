import { defineRouting } from 'next-intl/routing'

/**
 * Routing configuration for next-intl.
 *
 * NOTE: `pathnames` is intentionally omitted.
 *
 * The `pathnames` feature rewrites locale-specific URLs (e.g. /sectores → /sectors)
 * and requires a middleware.ts to resolve locales from those rewrites at runtime.
 * With `output: 'export'` there is no middleware runtime — so `pathnames` causes
 * next-intl's `getLocale()` to fall back to reading HTTP headers, which breaks
 * static export with the error:
 *   "Route couldn't be rendered statically because it used headers()"
 *
 * Locale-specific paths are handled by separate folder pairs instead:
 *   /sectores/ + /sectors/   — each folder serves one locale
 *   /servicios/ + /services/ — each folder serves one locale
 *   /nosotros/ + /about/     — etc.
 */
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
})
