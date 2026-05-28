import { getBaseUrl } from '@/lib/utils'
import type { BlogPost } from '@/types'

const BASE_URL = getBaseUrl()

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'SORA | Technical BIM Integration',
    alternateName: 'SORA BIM',
    url: BASE_URL,
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/sora-logo.png`, width: 200, height: 60 },
    description: 'Empresa especializada en Integración BIM de Sistemas Especiales para proyectos industriales, data centers, hospitales e infraestructura crítica. Coordinación BIM, ISO 19650, CDE, BMS, Telecomunicaciones, Seguridad Electrónica y Gestión de Información.',
    address: { '@type': 'PostalAddress', addressCountry: 'MX', addressRegion: 'Ciudad de México', addressLocality: 'Ciudad de México' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'info@sorafusion.com', availableLanguage: ['Spanish', 'English'] },
    sameAs: [ 'https://www.linkedin.com/company/sora-techbim',
  'https://www.instagram.com/sora.techbim',
  'https://www.facebook.com/sora.techbim'],
    knowsAbout: [ 'BIM Integration',
 'BIM Coordination',
 'ISO 19650',
 'Common Data Environment',
 'Building Information Modeling',
 'BMS Integration',
 'Special Systems BIM',
 'Electrical BIM',
 'Data Center BIM',
 'Industrial BIM',
 'Information Management',
 'Digital Construction',
 '4D BIM',
 '5D BIM',
 'Telecommunications BIM',
 'Security Systems BIM'],
    areaServed: { '@type': 'Country', name: 'Mexico' },
  }
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'SORA | Technical BIM Integration',
    description: 'Integración BIM de Sistemas Especiales para proyectos de alta complejidad.',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/es/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['es-MX', 'en-US'],
  }
}

export function getServiceSchema(name: string, description: string, serviceType: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name, description,
    provider: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'SORA | Technical BIM Integration' },
    serviceType,
    areaServed: { '@type': 'Country', name: 'Mexico' },
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'SORA BIM Integration Services' },
  }
}

export function getArticleSchema(post: BlogPost, locale: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${BASE_URL}${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}${url}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
    publisher: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'SORA | Technical BIM Integration', logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/sora-logo.png` } },
    ...(post.coverImage && { image: { '@type': 'ImageObject', url: `${BASE_URL}${post.coverImage}` } }),
    inLanguage: locale === 'es' ? 'es-MX' : 'en-US',
    isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
    about: [
      { '@type': 'Thing', name: 'Building Information Modeling' },
      { '@type': 'Thing', name: 'BIM Integration' },
      { '@type': 'Thing', name: 'ISO 19650' },
    ],
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function getSoftwareAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${BASE_URL}/es/sora-os/#sora-os`,
    name: 'SORA OS',
    description: 'Framework propietario de integración técnica BIM que conecta información, procesos, personas y tecnología bajo ISO 19650.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'MXN' },
    author: { '@type': 'Organization', '@id': `${BASE_URL}/#organization` },
    featureList: ['ISO 19650 Compliance','CDE Management','BIM Coordination','Information Governance','Workflow Automation','Full Traceability'],
  }
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'SORA | Technical BIM Integration',
    url: BASE_URL,
    email: 'info@sorafusion.com',
    address: { '@type': 'PostalAddress', addressCountry: 'MX', addressRegion: 'CDMX', addressLocality: 'Ciudad de México' },
    geo: { '@type': 'GeoCoordinates', latitude: 19.4326, longitude: -99.1332 },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' }],
    priceRange: '$$$$',
    currenciesAccepted: 'MXN, USD',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'BIM Integration Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integración BIM' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Coordinación BIM' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sistemas Especiales BIM' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de Información ISO 19650' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BIM 4D' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BIM 5D' } },
      ],
    },
  }
}
