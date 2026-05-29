import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta, getServicesMetadata } from '@/lib/seo'
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import BreadcrumbNav from '@/components/shared/BreadcrumbNav'
import ServicesHero from '@/components/sections/services/ServicesHero'
import ServicesGrid from '@/components/sections/services/ServicesGrid'

import enMessages from '@/messages/en.json'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getServicesMetadata(locale as Locale), locale as Locale)
}

export default async function ServicesPageEN({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const sv       = enMessages.services
  const basePath = `/en/services`
  const contactHref = `/en/contact`

  const services = sv.items as unknown as ServiceItem[]
  const heroData = { label: sv.hero.label, headline: sv.hero.headline, subheadline: sv.hero.subheadline }

  const schemas = [
    getBreadcrumbSchema([
      { name: enMessages.common.breadcrumb.home, url: `/en/` },
      { name: heroData.label,                    url: basePath },
    ]),
    ...services.map((s) => getServiceSchema(s.title, s.shortDescription, 'BIM Integration Service')),
  ]

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>
        <ServicesHero {...heroData} />
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="container-section py-3">
            <BreadcrumbNav items={[{ label: enMessages.common.breadcrumb.home, href: `/en/` }, { label: heroData.label }]} />
          </div>
        </div>
        <ServicesGrid services={services} basePath={basePath} allLabel="All" />
        <CTASection
          headline="Not sure which service you need?"
          body="We start with a free technical assessment to identify exactly what your project needs."
          primaryLabel="Request Assessment"
          primaryHref={contactHref}
          variant="light"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }]
}
