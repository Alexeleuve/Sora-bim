import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',

  // pathnames maps a shared filesystem path to locale-specific URLs.
  // next-intl middleware handles the rewrites at runtime.
  // This eliminates the need for duplicate folders (services/ + servicios/, etc.)
  pathnames: {
    '/': '/',
    '/servicios': {
      es: '/servicios',
      en: '/services',
    },
    '/servicios/[slug]': {
      es: '/servicios/[slug]',
      en: '/services/[slug]',
    },
    '/sectores': {
      es: '/sectores',
      en: '/sectors',
    },
    '/sectores/[slug]': {
      es: '/sectores/[slug]',
      en: '/sectors/[slug]',
    },
    '/sora-os': {
      es: '/sora-os',
      en: '/sora-os',
    },
    '/blog': {
      es: '/blog',
      en: '/blog',
    },
    '/blog/categoria/[category]': {
      es: '/blog/categoria/[category]',
      en: '/blog/category/[category]',
    },
    '/nosotros': {
      es: '/nosotros',
      en: '/about',
    },
    '/casos-de-exito': {
      es: '/casos-de-exito',
      en: '/case-studies',
    },
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
  },
})
