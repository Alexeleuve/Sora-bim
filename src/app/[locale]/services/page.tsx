import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta, getServicesMetadata } from '@/lib/seo'
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import BreadcrumbNav from '@/components/shared/BreadcrumbNav'
import ServicesHero from '@/components/sections/services/ServicesHero'
import ServicesGrid from '@/components/sections/services/ServicesGrid'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const seoData = getServicesMetadata(locale as Locale)
  return genMeta(seoData, locale as Locale)
}

export default async function ServicesPageEN({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const t = await getTranslations('services')
  const tCommon = await getTranslations('common')
  const basePath = `/${locale}/services`
  const contactHref = `/${locale}/contact`

  const services = t.raw('items') as ServiceItem[]
  const heroData = {
    label:       t('hero.label'),
    headline:    t('hero.headline'),
    subheadline: t('hero.subheadline'),
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
    { name: heroData.label, url: basePath },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />
      <SiteLayout>
        <ServicesHero {...heroData} />

        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="container-section py-3">
            <BreadcrumbNav
              items={[
                { label: tCommon('breadcrumb.home'), href: `/${locale}/` },
                { label: heroData.label },
              ]}
            />
          </div>
        </div>

        <ServicesGrid
          services={services}
          basePath={basePath}
          allLabel="All"
        />

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
