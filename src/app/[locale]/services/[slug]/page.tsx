import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import PageHero from '@/components/shared/PageHero'
import ServiceDetail from '@/components/sections/services/ServiceDetail'

// EN slug → item index
const EN_SLUG_MAP: Record<string, number> = {
  'bim-integration':       0,
  'bim-coordination':      1,
  'special-systems':       2,
  'information-management': 3,
  'bim-4d':                4,
  'bim-5d':                5,
}

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations('services')
  const services = t.raw('items') as ServiceItem[]
  const index = EN_SLUG_MAP[slug]
  if (index === undefined) return {}
  const service = services[index]
  return genMeta(
    {
      title: service.title,
      description: service.shortDescription,
      canonical: `/en/services/${slug}/`,
      alternates: {
        es: `/es/servicios/${service.slug}/`,
        en: `/en/services/${slug}/`,
      },
    },
    'en'
  )
}

export default async function ServiceDetailPageEN({ params }: Props) {
  const { locale, slug } = await params
  if (locale !== 'en') notFound()

  const t = await getTranslations('services')
  const tCommon = await getTranslations('common')
  const basePath = `/${locale}/services`
  const contactHref = `/${locale}/contact`

  const services = t.raw('items') as ServiceItem[]
  const index = EN_SLUG_MAP[slug]
  if (index === undefined) notFound()

  const service = services[index]
  const relatedServices = services.filter((_, i) => i !== index).slice(0, 3)

  const schemas = [
    getServiceSchema(service.title, service.description, 'BIM Integration Service'),
    getBreadcrumbSchema([
      { name: 'Home', url: `/en/` },
      { name: 'Services', url: basePath },
      { name: service.title, url: `${basePath}/${slug}` },
    ]),
  ]

  const labels = {
    benefits:      'Key benefits',
    useCases:      'Use cases',
    standards:     'Applied standards',
    related:       'Related services',
    ctaSidebar:    'Request an assessment',
    ctaSidebarBody:'We identify your project needs at no cost and no commitment.',
    ctaSidebarBtn: 'Schedule technical session',
    back:          'All services',
  }

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>
        <PageHero
          label="Services"
          headline={service.title}
          subheadline={service.shortDescription}
          breadcrumbs={[
            { label: 'Home', href: `/en/` },
            { label: 'Services', href: basePath },
            { label: service.title },
          ]}
        />

        <ServiceDetail
          service={service}
          relatedServices={relatedServices}
          basePath={basePath}
          locale={locale}
          labels={labels}
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

export async function generateStaticParams() {
  return Object.keys(EN_SLUG_MAP).map((slug) => ({ locale: 'en', slug }))
}
