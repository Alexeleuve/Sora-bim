import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { SectorItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import SectorsIndex from '@/components/sections/sectors/SectorsIndex'
import { getBreadcrumbSchema } from '@/lib/schema'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations('sectors')
  return genMeta({
    title: 'Sectors',
    description: t('hero.subheadline'),
    canonical: `/en/sectors/`,
    alternates: { es: '/es/sectores/', en: '/en/sectors/' },
  }, 'en')
}

export default async function SectorsPageEN({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const t = await getTranslations('sectors')
  const sectors = t.raw('items') as SectorItem[]
  const basePath = `/en/sectors`
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: `/en/` },
    { name: 'Sectors', url: basePath },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <SectorsIndex
          sectors={sectors}
          basePath={basePath}
          label={t('hero.label')}
          headline={t('hero.headline')}
          subheadline={t('hero.subheadline')}
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
