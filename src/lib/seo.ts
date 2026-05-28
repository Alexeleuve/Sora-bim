import type { Metadata } from 'next'
import type { Locale, SEOProps } from '@/types'
import { getBaseUrl } from '@/lib/utils'

const BASE_URL = getBaseUrl()

export const SITE_CONFIG = {
  name:      'SORA | Technical BIM Integration',
  shortName: 'SORA BIM',
  url:       BASE_URL,
  twitter:   '@soratechbim',
  locale: { es: 'es_MX', en: 'en_US' },
  description: {
    es: 'Integración BIM de Sistemas Especiales para proyectos de alta complejidad. ISO 19650 · CDE · BIM 4D · BIM 5D. No modelamos. Integramos.',
    en: "BIM Integration for Special Systems in high-complexity projects. ISO 19650 · CDE · BIM 4D · BIM 5D. We don't model. We integrate.",
  },
  keywords: {
    es: ['integración BIM','BIM México','coordinación BIM','BIM Manager México','sistemas especiales BIM','ISO 19650 México','BIM industrial','BIM data centers','BIM hospitales','BIM MEP','BIM BMS','CDE construcción','gestión información BIM','BIM 4D','BIM 5D','SORA BIM'],
    en: ['BIM integration','BIM Mexico','BIM coordination','BIM Manager Mexico','special systems BIM','ISO 19650 Mexico','industrial BIM','data center BIM','hospital BIM','MEP BIM','BMS BIM','CDE construction','BIM information management','BIM 4D','BIM 5D'],
  },
} as const

export function generateMetadata(props: SEOProps, locale: Locale = 'es'): Metadata {
  const { title, description, canonical, ogImage, ogType = 'website', noindex = false, alternates } = props
  const fullTitle  = title ? `${title} — ${SITE_CONFIG.name}` : SITE_CONFIG.name
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined
  const ogImageUrl   = ogImage ?? `${BASE_URL}/images/og-default.jpg`

  return {
    title, description,
    keywords: SITE_CONFIG.keywords[locale].join(', '),
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: {
      ...(canonicalUrl && { canonical: canonicalUrl }),
      ...(alternates && { languages: { es: `${BASE_URL}${alternates.es}`, en: `${BASE_URL}${alternates.en}`, 'x-default': `${BASE_URL}${alternates.es}` } }),
    },
    openGraph: {
      title: fullTitle, description, url: canonicalUrl,
      siteName: SITE_CONFIG.name, locale: SITE_CONFIG.locale[locale], type: ogType,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: fullTitle, type: 'image/jpeg' }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, site: SITE_CONFIG.twitter, creator: SITE_CONFIG.twitter, images: [ogImageUrl] },
  }
}

export function getHomeMetadata(locale: Locale): SEOProps {
  const isEs = locale === 'es'
  return {
    title: isEs ? 'Integración BIM para Sistemas Especiales de Alta Complejidad' : 'BIM Integration for High-Complexity Special Systems',
    description: isEs ? 'SORA integra información crítica para proyectos industriales, data centers, hospitales e infraestructura. ISO 19650 · CDE · BIM. No modelamos. Integramos.' : "SORA integrates critical information for industrial, data center, hospital and infrastructure projects. ISO 19650 · CDE · BIM. We don't model. We integrate.",
    canonical: `/${locale}/`, alternates: { es: '/es/', en: '/en/' },
  }
}

export function getServicesMetadata(locale: Locale): SEOProps {
  const isEs = locale === 'es'
  return {
    title: isEs ? 'Servicios de Integración BIM' : 'BIM Integration Services',
    description: isEs ? 'Integración BIM, Coordinación BIM, Sistemas Especiales, ISO 19650, CDE, BIM 4D y BIM 5D para proyectos industriales, data centers, hospitales e infraestructura en México.' : 'BIM Integration, BIM Coordination, Special Systems, ISO 19650, CDE, BIM 4D and BIM 5D for industrial, data center, hospital and infrastructure projects.',
    canonical: isEs ? '/es/servicios/' : '/en/services/', alternates: { es: '/es/servicios/', en: '/en/services/' },
  }
}

export function getSoraOSMetadata(locale: Locale): SEOProps {
  const isEs = locale === 'es'
  return {
    title: isEs ? 'SORA OS — El Sistema Operativo de la Integración BIM Técnica' : 'SORA OS — The Operating System of Technical BIM Integration',
    description: isEs ? 'SORA OS es el framework propietario que conecta información, procesos, personas y tecnología bajo ISO 19650 para proyectos de construcción de alta complejidad.' : 'SORA OS is the proprietary framework connecting information, processes, people and technology under ISO 19650 for high-complexity construction projects.',
    canonical: `/${locale}/sora-os/`, alternates: { es: '/es/sora-os/', en: '/en/sora-os/' },
  }
}

export function getBlogMetadata(locale: Locale): SEOProps {
  const isEs = locale === 'es'
  return {
    title: isEs ? 'Blog BIM — ISO 19650, CDE, Sistemas Especiales y Transformación Digital' : 'BIM Blog — ISO 19650, CDE, Special Systems and Digital Transformation',
    description: isEs ? 'Artículos técnicos sobre integración BIM, ISO 19650, CDE, sistemas especiales y transformación digital en la industria de la construcción en México.' : 'Technical articles on BIM integration, ISO 19650, CDE, special systems and digital transformation in the construction industry.',
    canonical: `/${locale}/blog/`, alternates: { es: '/es/blog/', en: '/en/blog/' },
  }
}

export function getAboutMetadata(locale: Locale): SEOProps {
  const isEs = locale === 'es'
  return {
    title: isEs ? 'Nosotros — Empresa de Integración BIM Técnica en México' : 'About — Technical BIM Integration Company in Mexico',
    description: isEs ? 'SORA es una empresa especializada en integración técnica BIM para proyectos de alta complejidad. ISO 19650, CDE, coordinación multidisciplinaria y sistemas especiales.' : 'SORA is a company specialized in technical BIM integration for high-complexity projects. ISO 19650, CDE, multidisciplinary coordination and special systems.',
    canonical: isEs ? '/es/nosotros/' : '/en/about/', alternates: { es: '/es/nosotros/', en: '/en/about/' },
  }
}

export function getContactMetadata(locale: Locale): SEOProps {
  const isEs = locale === 'es'
  return {
    title: isEs ? 'Contacto — Solicitar Diagnóstico Técnico BIM Gratuito' : 'Contact — Request Free BIM Technical Assessment',
    description: isEs ? 'Solicita un diagnóstico técnico gratuito con SORA. Identificamos brechas de coordinación BIM, gestión de información e integración de sistemas especiales en tu proyecto.' : 'Request a free technical assessment with SORA. We identify BIM coordination gaps, information management and special systems integration needs in your project.',
    canonical: isEs ? '/es/contacto/' : '/en/contact/', alternates: { es: '/es/contacto/', en: '/en/contact/' },
  }
}

export function getCaseStudiesMetadata(locale: Locale): SEOProps {
  const isEs = locale === 'es'
  return {
    title: isEs ? 'Casos de Éxito — Integración BIM en Proyectos de Alta Complejidad' : 'Case Studies — BIM Integration in High-Complexity Projects',
    description: isEs ? 'Proyectos reales de integración técnica BIM ejecutados por SORA: coordinación de sistemas especiales, ISO 19650 y gestión de información.' : 'Real technical BIM integration projects by SORA: special systems coordination, ISO 19650 and information management.',
    canonical: isEs ? '/es/casos-de-exito/' : '/en/case-studies/', alternates: { es: '/es/casos-de-exito/', en: '/en/case-studies/' },
  }
}
