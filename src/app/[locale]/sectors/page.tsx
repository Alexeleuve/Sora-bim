import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import type { SectorItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import SectorsIndex from '@/components/sections/sectors/SectorsIndex'

import enMessages from '@/messages/en.json'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sc = enMessages.sectors
  return genMeta({
    title:       sc.hero.label,
    description: sc.hero.subheadline,
    canonical:   `/en/sectors/`,
    alternates:  { es: '/es/sectores/', en: '/en/sectors/' },
  }, 'en')
}

export default async function SectorsPageEN({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const sc       = enMessages.sectors
  const basePath = `/en/sectors`

  const breadcrumb = getBreadcrumbSchema([
    { name: enMessages.common.breadcrumb.home, url: `/en/` },
    { name: sc.hero.label,                     url: basePath },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <SectorsIndex
          sectors={sc.items as unknown as SectorItem[]}
          basePath={basePath}
          label={sc.hero.label}
          headline={sc.hero.headline}
          subheadline={sc.hero.subheadline}
          ctaLabel="View sector"
        />
        <CTASection
          headline="Your project has a sector. We have the expertise."
          primaryLabel="Request Assessment"
          primaryHref="/en/contact"
          variant="light"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }]
}
