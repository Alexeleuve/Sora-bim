import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta, getHomeMetadata } from '@/lib/seo'
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema'
import type { Locale } from '@/types'

import SiteLayout    from '@/components/layout/SiteLayout'
import SchemaOrg     from '@/components/shared/SchemaOrg'
import CTASection    from '@/components/shared/CTASection'

import HeroSection         from '@/components/sections/home/HeroSection'
import AboutSection        from '@/components/sections/home/AboutSection'
import ServicesSection     from '@/components/sections/home/ServicesSection'
import MethodologySection  from '@/components/sections/home/MethodologySection'
import SoraOSSection       from '@/components/sections/home/SoraOSSection'
import BIMTechSection      from '@/components/sections/home/BIMTechSection'
import ConstructionSection from '@/components/sections/home/ConstructionSection'
import InnovationSection   from '@/components/sections/home/InnovationSection'
import SectorsSection      from '@/components/sections/home/SectorsSection'
import CoverageSection     from '@/components/sections/home/CoverageSection'

type Props = { params: Promise<{ locale: string }> }

// ── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getHomeMetadata(locale as Locale), locale as Locale)
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const t    = await getTranslations('home')
  const tSvc = await getTranslations('services')
  const tSec = await getTranslations('sectors')

  const isEs        = locale === 'es'
  const contactHref = isEs ? `/${locale}/contacto`  : `/${locale}/contact`
  const servicesHref = isEs ? `/${locale}/servicios` : `/${locale}/services`

  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroData = {
    label:        t('hero.label'),
    headline:     t('hero.headline'),
    subheadline:  t('hero.subheadline'),
    ctaPrimary:   t('hero.ctaPrimary'),
    ctaSecondary: t('hero.ctaSecondary'),
    statement:    t('hero.statement'),
    scrollLabel:  t('hero.scrollLabel'),
  }

  // ── About ─────────────────────────────────────────────────────────────────
  const aboutData = {
    label:    t('about.label'),
    headline: t('about.headline'),
    body:     t('about.body'),
    stats:    t.raw('about.stats') as { value: number; suffix: string; label: string }[],
    cta:      t('about.cta'),
  }

  // ── Services ──────────────────────────────────────────────────────────────
  const servicesData = {
    label:       t('services.label'),
    headline:    t('services.headline'),
    subheadline: t('services.subheadline'),
    services:    tSvc.raw('items') as {
      slug: string; icon: string; title: string
      shortDescription: string; standards: string[]; cta: string
    }[],
    ctaLabel: t('services.cta'),
  }

  // ── Methodology ───────────────────────────────────────────────────────────
  const methodologyData = {
    label:       t('methodology.label'),
    headline:    t('methodology.headline'),
    steps:       t.raw('methodology.steps') as { number: string; title: string; description: string }[],
    quote:       t('methodology.quote'),
    quoteAuthor: t('methodology.quoteAuthor'),
  }

  // ── SORA OS ───────────────────────────────────────────────────────────────
  const soraOsData = {
    label:    t('soraOs.label'),
    title:    t('soraOs.title'),
    headline: t('soraOs.headline'),
    body:     t('soraOs.body'),
    pillars:  t.raw('soraOs.pillars') as { icon: string; title: string; description: string }[],
    cta:      t('soraOs.cta'),
  }

  // ── BIM Tech ──────────────────────────────────────────────────────────────
  const bimTechData = {
    label:    t('bimTech.label'),
    headline: t('bimTech.headline'),
    body:     t('bimTech.body'),
    tools:    t.raw('bimTech.tools') as string[],
    cta:      t('bimTech.cta'),
  }

  // ── Construction ──────────────────────────────────────────────────────────
  const constructionData = {
    label:    t('construction.label'),
    headline: t('construction.headline'),
    body:     t('construction.body'),
    stats:    t.raw('construction.stats') as { value: number; suffix: string; label: string }[],
  }

  // ── Innovation ────────────────────────────────────────────────────────────
  const innovationData = {
    label:    t('innovation.label'),
    headline: t('innovation.headline'),
    body:     t('innovation.body'),
    flow:     t.raw('innovation.flow') as string[],
    cta:      t('innovation.cta'),
  }

  // ── Sectors ───────────────────────────────────────────────────────────────
  const sectorsData = {
    label:    t('sectors.label'),
    headline: t('sectors.headline'),
    sectors:  tSec.raw('items') as { slug: string; icon: string; title: string; tagline: string }[],
    cta:      t('sectors.cta'),
  }

  // ── Coverage ──────────────────────────────────────────────────────────────
  const coverageData = {
    label:       t('coverage.label'),
    headline:    t('coverage.headline'),
    subheadline: t('coverage.subheadline'),
    locations:   t.raw('coverage.locations') as { city: string; role: string; description: string }[],
    alliance:    t.raw('coverage.alliance') as { title: string; body: string },
  }

  // ── Final CTA ─────────────────────────────────────────────────────────────
  const ctaData = {
    headline:  t('cta.headline'),
    body:      t('cta.body'),
    primary:   t('cta.primary'),
    secondary: t('cta.secondary'),
  }

  return (
    <>
      <SchemaOrg schema={[getOrganizationSchema(), getWebsiteSchema()]} />

      <SiteLayout>
        {/* 01 — Hero */}
        <HeroSection {...heroData} />

        {/* 02 — Quiénes Somos */}
        <AboutSection {...aboutData} />

        {/* 03 — Servicios */}
        <ServicesSection {...servicesData} />

        {/* 04 — Metodología */}
        <MethodologySection {...methodologyData} />

        {/* 05 — SORA OS */}
        <SoraOSSection {...soraOsData} />

        {/* 06 — Tecnología BIM */}
        <BIMTechSection {...bimTechData} />

        {/* 07 — Construcción */}
        <ConstructionSection {...constructionData} />

        {/* 08 — Innovación */}
        <InnovationSection {...innovationData} />

        {/* 09 — Sectores */}
        <SectorsSection {...sectorsData} />

        {/* 10 — Cobertura */}
        <CoverageSection {...coverageData} />

        {/* 11 — CTA Final */}
        <CTASection
          headline={ctaData.headline}
          body={ctaData.body}
          primaryLabel={ctaData.primary}
          primaryHref={contactHref}
          secondaryLabel={ctaData.secondary}
          secondaryHref={servicesHref}
          variant="light"
        />
      </SiteLayout>
    </>
  )
}

// ── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
