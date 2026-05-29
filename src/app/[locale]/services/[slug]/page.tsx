import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import PageHero from '@/components/shared/PageHero'
import ServiceDetail from '@/components/sections/services/ServiceDetail'

import enMessages from '@/messages/en.json'
import esMessages from '@/messages/es.json'

// EN slugs → index in services.items (7 items)
const EN_SLUG_MAP: Record<string, number> = {
  'bim-integration':        0,
  'bim-coordination':       1,
  'special-systems':        2,
  'electrical-systems':     3,
  'information-management': 4,
  'bim-4d':                 5,
  'bim-5d':                 6,
}
// ES counterparts (same order)
const ES_SLUGS = Object.keys({
  'integracion-bim':    0, 'coordinacion-bim':   1, 'sistemas-especiales': 2,
  'sistemas-electricos':3, 'gestion-informacion': 4, 'bim-4d': 5, 'bim-5d': 6,
})

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const index = EN_SLUG_MAP[slug]
  if (index === undefined) return {}
  const service = (enMessages.services.items as unknown as ServiceItem[])[index]
  return genMeta({
    title:       service.title,
    description: service.shortDescription,
    canonical:   `/en/services/${slug}/`,
    alternates:  { es: `/es/servicios/${ES_SLUGS[index]}/`, en: `/en/services/${slug}/` },
  }, 'en')
}

export default async function ServiceDetailPageEN({ params }: Props) {
  const { locale, slug } = await params
  if (locale !== 'en') notFound()

  const index = EN_SLUG_MAP[slug]
  if (index === undefined) notFound()

  const services        = enMessages.services.items as unknown as ServiceItem[]
  const service         = services[index]
  const relatedServices = services.filter((_, i) => i !== index).slice(0, 3)
  const basePath    = `/en/services`
  const contactHref = `/en/contact`

  const schemas = [
    getServiceSchema(service.title, service.description, 'BIM Integration Service'),
    getBreadcrumbSchema([
      { name: enMessages.common.breadcrumb.home,   url: `/en/` },
      { name: enMessages.services.hero.label,       url: basePath },
      { name: service.title,                        url: `${basePath}/${slug}` },
    ]),
  ]

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>
        <PageHero
          label={enMessages.services.hero.label}
          headline={service.title}
          subheadline={service.shortDescription}
          breadcrumbs={[
            { label: enMessages.common.breadcrumb.home,   href: `/en/` },
            { label: enMessages.services.hero.label,       href: basePath },
            { label: service.title },
          ]}
        />
        <ServiceDetail
          service={service}
          relatedServices={relatedServices}
          basePath={basePath}
          locale={locale}
          labels={{
            benefits:       'Key benefits',
            useCases:       'Use cases',
            standards:      'Applied standards',
            related:        'Related services',
            ctaSidebar:     'Request an assessment',
            ctaSidebarBody: 'We identify your project needs at no cost and no commitment.',
            ctaSidebarBtn:  'Schedule technical session',
            back:           'All services',
          }}
        />
        <CTASection
          headline="Ready to integrate your project systems?"
          body="Schedule a free technical session and together we evaluate your project needs."
          primaryLabel="Schedule Technical Session"
          primaryHref={contactHref}
          secondaryLabel="View All Services"
          secondaryHref={basePath}
          variant="light"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return Object.keys(EN_SLUG_MAP).map((slug) => ({ locale: 'en', slug }))
}
