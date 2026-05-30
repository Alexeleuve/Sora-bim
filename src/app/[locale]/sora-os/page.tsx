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
  return genMeta(getSoraOSMetadata(locale as Locale), locale as Locale)
}

export default async function SoraOSPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()
  const t       = await getTranslations('soraOs')
  const tCommon = await getTranslations('common')
  const isEs    = locale === 'es'
  return (
    <>
      <SchemaOrg schema={[getOrganizationSchema(), getBreadcrumbSchema([{ name: tCommon('breadcrumb.home'), url: `/${locale}/` }, { name: 'SORA OS', url: `/${locale}/sora-os` }])]} />
      <SiteLayout>
        <SoraOSHero label={t('hero.label')} headline={t('hero.headline')} subheadline={t('hero.subheadline')} />
        <SoraOSPrinciple headline={t('principle.headline')} body={t('principle.body')} statement={t('principle.statement')} />
        <SoraOSPillars pillars={t.raw('pillars') as { icon: string; title: string; description: string }[]} />
        <SoraOSFlow headline={t('flow.headline')} items={t.raw('flow.items') as string[]} />
        <SoraOSStandards headline={t('standards.headline')} body={t('standards.body')} items={t.raw('standards.items') as string[]} />
        <CTASection headline={t('cta.headline')} primaryLabel={t('cta.primary')} primaryHref={isEs ? `/${locale}/contacto` : `/${locale}/contact`} secondaryLabel={t('cta.secondary')} secondaryHref={isEs ? `/${locale}/servicios` : `/${locale}/services`} variant="dark" />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
