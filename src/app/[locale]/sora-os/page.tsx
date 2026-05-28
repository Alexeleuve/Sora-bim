import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta, getSoraOSMetadata } from '@/lib/seo'
import { getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'

import SoraOSHero from '@/components/sections/sora-os/SoraOSHero'
import SoraOSPrinciple from '@/components/sections/sora-os/SoraOSPrinciple'
import SoraOSPillars from '@/components/sections/sora-os/SoraOSPillars'
import SoraOSFlow from '@/components/sections/sora-os/SoraOSFlow'
import SoraOSStandards from '@/components/sections/sora-os/SoraOSStandards'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const seoData = getSoraOSMetadata(locale as Locale)
  return genMeta(seoData, locale as Locale)
}

export default async function SoraOSPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const t = await getTranslations('soraOs')
  const tCommon = await getTranslations('common')
  const isEs = locale === 'es'
  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`
  const servicesHref = isEs ? `/${locale}/servicios` : `/${locale}/services`

  const heroData = {
    label:       t('hero.label'),
    headline:    t('hero.headline'),
    subheadline: t('hero.subheadline'),
  }
  const principleData = {
    headline:  t('principle.headline'),
    body:      t('principle.body'),
    statement: t('principle.statement'),
  }
  const pillars = t.raw('pillars') as { icon: string; title: string; description: string }[]
  const flowData = {
    headline: t('flow.headline'),
    items:    t.raw('flow.items') as string[],
  }
  const standardsData = {
    headline: t('standards.headline'),
    body:     t('standards.body'),
    items:    t.raw('standards.items') as string[],
  }
  const ctaData = {
    headline:  t('cta.headline'),
    primary:   t('cta.primary'),
    secondary: t('cta.secondary'),
  }

  const schemas = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
      { name: 'SORA OS', url: `/${locale}/sora-os` },
    ]),
  ]

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>
        {/* Immersive dark hero */}
        <SoraOSHero {...heroData} />

        {/* The principle — centered narrative statement */}
        <SoraOSPrinciple {...principleData} />

        {/* 6 pillars */}
        <SoraOSPillars pillars={pillars} />

        {/* Flow diagram over nodes image */}
        <SoraOSFlow {...flowData} />

        {/* Standards that inspire SORA OS */}
        <SoraOSStandards {...standardsData} />

        {/* CTA */}
        <CTASection
          headline={ctaData.headline}
          primaryLabel={ctaData.primary}
          primaryHref={contactHref}
          secondaryLabel={ctaData.secondary}
          secondaryHref={servicesHref}
          variant="dark"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
