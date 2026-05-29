import type { Metadata } from 'next'
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

import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

type Messages = typeof esMessages
function getMsg(locale: string): Messages {
  return locale === 'en' ? (enMessages as unknown as Messages) : esMessages
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getSoraOSMetadata(locale as Locale), locale as Locale)
}

export default async function SoraOSPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const m    = getMsg(locale)
  const os   = m.soraOs
  const isEs = locale === 'es'
  const contactHref  = isEs ? `/${locale}/contacto`  : `/${locale}/contact`
  const servicesHref = isEs ? `/${locale}/servicios` : `/${locale}/services`

  const schemas = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: m.common.breadcrumb.home, url: `/${locale}/` },
      { name: 'SORA OS',                url: `/${locale}/sora-os` },
    ]),
  ]

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>
        <SoraOSHero
          label={os.hero.label}
          headline={os.hero.headline}
          subheadline={os.hero.subheadline}
        />
        <SoraOSPrinciple
          headline={os.principle.headline}
          body={os.principle.body}
          statement={os.principle.statement}
        />
        <SoraOSPillars
          pillars={os.pillars as unknown as { icon: string; title: string; description: string }[]}
        />
        <SoraOSFlow
          headline={os.flow.headline}
          items={os.flow.items as unknown as string[]}
        />
        <SoraOSStandards
          headline={os.standards.headline}
          body={os.standards.body}
          items={os.standards.items as unknown as string[]}
        />
        <CTASection
          headline={os.cta.headline}
          primaryLabel={os.cta.primary}
          primaryHref={contactHref}
          secondaryLabel={os.cta.secondary}
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
