import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import type { SectorItem, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import PageHero from '@/components/shared/PageHero'
import SectorDetail from '@/components/sections/sectors/SectorDetail'

import enMessages from '@/messages/en.json'

// EN slugs in display order — index matches sectors.items array position
const EN_SLUGS = ['industrial', 'data-centers', 'hospitals', 'commercial', 'infrastructure']
// ES counterparts at same indices (for hreflang alternates)
const ES_SLUGS = ['industrial', 'data-centers', 'hospitales', 'comercial', 'infraestructura']

// All EN service slugs → index in services.items
const SVC_IDX: Record<string, number> = {
  'bim-integration': 0, 'bim-coordination': 1, 'special-systems': 2,
  'electrical-systems': 3, 'information-management': 4, 'bim-4d': 5, 'bim-5d': 6,
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const index = EN_SLUGS.indexOf(slug)
  if (index === -1) return {}
  const sector = (enMessages.sectors.items as unknown as SectorItem[])[index]
  return genMeta({
    title:       sector.title,
    description: sector.tagline,
    canonical:   `/en/sectors/${slug}/`,
    alternates:  { es: `/es/sectores/${ES_SLUGS[index]}/`, en: `/en/sectors/${slug}/` },
  }, 'en')
}

export default async function SectorDetailPageEN({ params }: Props) {
  const { locale, slug } = await params
  if (locale !== 'en') notFound()

  const index = EN_SLUGS.indexOf(slug)
  if (index === -1) notFound()

  const sectors  = enMessages.sectors.items  as unknown as SectorItem[]
  const services = enMessages.services.items as unknown as ServiceItem[]
  const sector   = sectors[index]
  const basePath        = `/en/sectors`
  const servicesBasePath = `/en/services`
  const contactHref     = `/en/contact`

  const relatedServices = (sector.services as unknown as string[])
    .map((sSlug) => { const i = SVC_IDX[sSlug]; return i !== undefined ? services[i] : null })
    .filter(Boolean) as ServiceItem[]

  const breadcrumb = getBreadcrumbSchema([
    { name: enMessages.common.breadcrumb.home, url: `/en/` },
    { name: enMessages.sectors.hero.label,     url: basePath },
    { name: sector.title,                       url: `${basePath}/${slug}` },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <PageHero
          label={enMessages.sectors.hero.label}
          headline={sector.title}
          subheadline={sector.tagline}
          breadcrumbs={[
            { label: enMessages.common.breadcrumb.home, href: `/en/` },
            { label: enMessages.sectors.hero.label,     href: basePath },
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
            systems:  'Systems we integrate',
            services: 'Applied services',
            cta:      'Technical assessment',
            back:     'All sectors',
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

export function generateStaticParams() {
  return EN_SLUGS.map((slug) => ({ locale: 'en', slug }))
}
