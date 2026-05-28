import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, SectorItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import SectorsIndex from '@/components/sections/sectors/SectorsIndex'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('sectors')
  return genMeta({
    title: t('hero.label'),
    description: t('hero.subheadline'),
    canonical: `/${locale}/sectores/`,
    alternates: { es: '/es/sectores/', en: '/en/sectors/' },
  }, locale as Locale)
}

export default async function SectoresPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const t = await getTranslations('sectors')
  const tCommon = await getTranslations('common')
  const isEs = locale === 'es'
  const basePath = isEs ? `/${locale}/sectores` : `/${locale}/sectors`
  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`
  const sectors = t.raw('items') as SectorItem[]

  const breadcrumb = getBreadcrumbSchema([
    { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
    { name: t('hero.label'), url: basePath },
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
          ctaLabel={isEs ? 'Ver sector' : 'View sector'}
        />
        <CTASection
          headline={isEs ? 'Tu proyecto tiene un sector. Nosotros tenemos la experiencia.' : 'Your project has a sector. We have the expertise.'}
          primaryLabel={isEs ? 'Solicitar Diagnóstico' : 'Request Assessment'}
          primaryHref={contactHref}
          variant="light"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
