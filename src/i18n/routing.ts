import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/servicios': {
      es: '/servicios',
      en: '/services',
    },
    '/servicios/integracion-bim': {
      es: '/servicios/integracion-bim',
      en: '/services/bim-integration',
    },
    '/servicios/coordinacion-bim': {
      es: '/servicios/coordinacion-bim',
      en: '/services/bim-coordination',
    },
    '/servicios/sistemas-especiales': {
      es: '/servicios/sistemas-especiales',
      en: '/services/special-systems',
    },
    '/servicios/gestion-informacion': {
      es: '/servicios/gestion-informacion',
      en: '/services/information-management',
    },
    '/servicios/bim-4d': {
      es: '/servicios/bim-4d',
      en: '/services/bim-4d',
    },
    '/servicios/bim-5d': {
      es: '/servicios/bim-5d',
      en: '/services/bim-5d',
    },
    '/sectores': {
      es: '/sectores',
      en: '/sectors',
    },
    '/sectores/industrial': {
      es: '/sectores/industrial',
      en: '/sectors/industrial',
    },
    '/sectores/data-centers': {
      es: '/sectores/data-centers',
      en: '/sectors/data-centers',
    },
    '/sectores/hospitales': {
      es: '/sectores/hospitales',
      en: '/sectors/hospitals',
    },
    '/sectores/comercial': {
      es: '/sectores/comercial',
      en: '/sectors/commercial',
    },
    '/sectores/infraestructura': {
      es: '/sectores/infraestructura',
      en: '/sectors/infrastructure',
    },
    '/sora-os': {
      es: '/sora-os',
      en: '/sora-os',
    },
    '/blog': {
      es: '/blog',
      en: '/blog',
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
