import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta, getHomeMetadata } from '@/lib/seo'
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema'
import type { Locale } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import HeroSection from '@/components/sections/home/HeroSection'
import AboutSection from '@/components/sections/home/AboutSection'
import ServicesSection from '@/components/sections/home/ServicesSection'
import MethodologySection from '@/components/sections/home/MethodologySection'
import SoraOSSection from '@/components/sections/home/SoraOSSection'
import BIMTechSection from '@/components/sections/home/BIMTechSection'
import ConstructionSection from '@/components/sections/home/ConstructionSection'
import InnovationSection from '@/components/sections/home/InnovationSection'
import SectorsSection from '@/components/sections/home/SectorsSection'
import CoverageSection from '@/components/sections/home/CoverageSection'

import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

type Messages = typeof esMessages
function getMsg(locale: string): Messages {
  return locale === 'en' ? (enMessages as unknown as Messages) : esMessages
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getHomeMetadata(locale as Locale), locale as Locale)
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const m    = getMsg(locale)
  const isEs = locale === 'es'
  const contactHref  = isEs ? `/${locale}/contacto`  : `/${locale}/contact`
  const servicesHref = isEs ? `/${locale}/servicios` : `/${locale}/services`

  const h  = m.home
  const sv = m.services
  const sc = m.sectors

  const heroData = {
    label: h.hero.label, headline: h.hero.headline, subheadline: h.hero.subheadline,
    ctaPrimary: h.hero.ctaPrimary, ctaSecondary: h.hero.ctaSecondary,
    statement: h.hero.statement, scrollLabel: h.hero.scrollLabel,
  }
  const aboutData = {
    label: h.about.label, headline: h.about.headline, body: h.about.body,
    stats: h.about.stats as unknown as { value: number; suffix: string; label: string }[],
    cta: h.about.cta,
  }
  const servicesData = {
    label: h.services.label, headline: h.services.headline, subheadline: h.services.subheadline,
    services: sv.items as unknown as { slug: string; icon: string; title: string; shortDescription: string; standards: string[]; cta: string }[],
    ctaLabel: h.services.cta,
  }
  const methodologyData = {
    label: h.methodology.label, headline: h.methodology.headline,
    steps: h.methodology.steps as unknown as { number: string; title: string; description: string }[],
    quote: h.methodology.quote, quoteAuthor: h.methodology.quoteAuthor,
  }
  const soraOsData = {
    label: h.soraOs.label, title: h.soraOs.title, headline: h.soraOs.headline, body: h.soraOs.body,
    pillars: h.soraOs.pillars as unknown as { icon: string; title: string; description: string }[],
    cta: h.soraOs.cta,
  }
  const bimTechData = {
    label: h.bimTech.label, headline: h.bimTech.headline, body: h.bimTech.body,
    tools: h.bimTech.tools as unknown as string[], cta: h.bimTech.cta,
  }
  const constructionData = {
    label: h.construction.label, headline: h.construction.headline, body: h.construction.body,
    stats: h.construction.stats as unknown as { value: number; suffix: string; label: string }[],
  }
  const innovationData = {
    label: h.innovation.label, headline: h.innovation.headline, body: h.innovation.body,
    flow: h.innovation.flow as unknown as string[], cta: h.innovation.cta,
  }
  const sectorsData = {
    label: h.sectors.label, headline: h.sectors.headline,
    sectors: sc.items as unknown as { slug: string; icon: string; title: string; tagline: string }[],
    cta: h.sectors.cta,
  }
  const coverageData = {
    label: h.coverage.label, headline: h.coverage.headline, subheadline: h.coverage.subheadline,
    locations: h.coverage.locations as unknown as { city: string; role: string; description: string }[],
    alliance: h.coverage.alliance as unknown as { title: string; body: string },
  }
  const ctaData = { headline: h.cta.headline, body: h.cta.body, primary: h.cta.primary, secondary: h.cta.secondary }

  return (
    <>
      <SchemaOrg schema={[getOrganizationSchema(), getWebsiteSchema()]} />
      <SiteLayout>
        <HeroSection {...heroData} />
        <AboutSection {...aboutData} />
        <ServicesSection {...servicesData} />
        <MethodologySection {...methodologyData} />
        <SoraOSSection {...soraOsData} />
        <BIMTechSection {...bimTechData} />
        <ConstructionSection {...constructionData} />
        <InnovationSection {...innovationData} />
        <SectorsSection {...sectorsData} />
        <CoverageSection {...coverageData} />
        <CTASection
          headline={ctaData.headline} body={ctaData.body}
          primaryLabel={ctaData.primary} primaryHref={contactHref}
          secondaryLabel={ctaData.secondary} secondaryHref={servicesHref}
          variant="light"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
