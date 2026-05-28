import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, SectorItem, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import PageHero from '@/components/shared/PageHero'
import SectorDetail from '@/components/sections/sectors/SectorDetail'

// EN slugs match ES slugs in this project (same slugs used in both locales)
const EN_SLUGS = ['industrial', 'data-centers', 'hospitals', 'commercial', 'infrastructure']
const ES_SLUGS = ['industrial', 'data-centers', 'hospitales', 'comercial', 'infraestructura']

const SERVICE_SLUG_TO_INDEX: Record<string, number> = {
  'bim-integration': 0, 'bim-coordination': 1,
  'special-systems': 2, 'information-management': 3,
  'bim-4d': 4, 'bim-5d': 5,
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = await getTranslations('sectors')
  const sectors = t.raw('items') as SectorItem[]
  const index = EN_SLUGS.indexOf(slug)
  if (index === -1) return {}
  const sector = sectors[index]
  return genMeta({
    title: sector.title,
    description: sector.tagline,
    canonical: `/en/sectors/${slug}/`,
    alternates: {
      es: `/es/sectores/${ES_SLUGS[index]}/`,
      en: `/en/sectors/${slug}/`,
    },
  }, 'en')
}

export default async function SectorDetailPageEN({ params }: Props) {
  const { locale, slug } = await params
  if (locale !== 'en') notFound()

  const tSectors = await getTranslations('sectors')
  const tServices = await getTranslations('services')

  const sectors = tSectors.raw('items') as SectorItem[]
  const services = tServices.raw('items') as ServiceItem[]
  const index = EN_SLUGS.indexOf(slug)
  if (index === -1) notFound()

  const sector = sectors[index]
  const basePath = `/en/sectors`
  const servicesBasePath = `/en/services`
  const contactHref = `/en/contact`

  const relatedServices = sector.services
    .map((sSlug) => {
      const idx = SERVICE_SLUG_TO_INDEX[sSlug]
      return idx !== undefined ? services[idx] : null
    })
    .filter(Boolean) as ServiceItem[]

  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: `/en/` },
    { name: 'Sectors', url: basePath },
    { name: sector.title, url: `${basePath}/${slug}` },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <PageHero
          label="Sectors"
          headline={sector.title}
          subheadline={sector.tagline}
          breadcrumbs={[
            { label: 'Home', href: `/en/` },
            { label: 'Sectors', href: basePath },
            { label: sector.title },
          ]}
        />

        <SectorDetail
          sector={sector}
          relatedServices={relatedServices}
          servicesBasePath={servicesBasePath}
          contactHref={contactHref}
          locale={locale}
          labels={{
            systems: 'Systems we integrate',
            services: 'Applied services',
            cta: 'Technical assessment',
            back: 'All sectors',
          }}
        />

        <CTASection
          headline={`Do you have a ${sector.title} project?`}
          body="Schedule a technical session and together we evaluate your project coordination challenges."
          primaryLabel="Schedule Technical Session"
          primaryHref={contactHref}
          secondaryLabel="View All Sectors"
          secondaryHref={basePath}
          variant="light"
        />
      </SiteLayout>
    </>
  )
}

export async function generateStaticParams() {
  return EN_SLUGS.map((slug) => ({ locale: 'en', slug }))
}
