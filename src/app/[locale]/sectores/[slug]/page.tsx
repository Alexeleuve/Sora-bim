import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, SectorItem, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import PageHero from '@/components/shared/PageHero'
import SectorDetail from '@/components/sections/sectors/SectorDetail'

const ES_SLUGS = ['industrial', 'data-centers', 'hospitales', 'comercial', 'infraestructura']
const SVC_IDX: Record<string, number> = {
  'integracion-bim':0,'bim-integration':0,'coordinacion-bim':1,'bim-coordination':1,
  'sistemas-especiales':2,'special-systems':2,'sistemas-electricos':3,'electrical-systems':3,
  'gestion-informacion':4,'information-management':4,'bim-4d':5,'bim-5d':6,
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t     = await getTranslations('sectors')
  const index = ES_SLUGS.indexOf(slug)
  if (index === -1) return {}
  const sector = (t.raw('items') as SectorItem[])[index]
  const isEs   = locale === 'es'
  return genMeta({
    title: sector.title, description: sector.tagline,
    canonical: isEs ? `/es/sectores/${slug}/` : `/en/sectors/${slug}/`,
    alternates: { es: `/es/sectores/${slug}/`, en: `/en/sectors/${slug}/` },
  }, locale as Locale)
}

export default async function SectorDetailPage({ params }: Props) {
  const { locale, slug } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const tSectors  = await getTranslations('sectors')
  const tServices = await getTranslations('services')
  const tCommon   = await getTranslations('common')
  const index     = ES_SLUGS.indexOf(slug)
  if (index === -1) notFound()

  const isEs            = locale === 'es'
  const basePath        = isEs ? `/${locale}/sectores` : `/${locale}/sectors`
  const servicesBasePath = isEs ? `/${locale}/servicios` : `/${locale}/services`
  const contactHref     = isEs ? `/${locale}/contacto`  : `/${locale}/contact`

  const sectors  = tSectors.raw('items')  as SectorItem[]
  const services = tServices.raw('items') as ServiceItem[]
  const sector   = sectors[index]

  const relatedServices = (sector.services as unknown as string[])
    .map((s) => { const i = SVC_IDX[s]; return i !== undefined ? services[i] : null })
    .filter(Boolean) as ServiceItem[]

  return (
    <>
      <SchemaOrg schema={getBreadcrumbSchema([
        { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
        { name: tSectors('hero.label'),     url: basePath },
        { name: sector.title,               url: `${basePath}/${slug}` },
      ])} />
      <SiteLayout>
        <PageHero label={tSectors('hero.label')} headline={sector.title} subheadline={sector.tagline}
          breadcrumbs={[{ label: tCommon('breadcrumb.home'), href: `/${locale}/` }, { label: tSectors('hero.label'), href: basePath }, { label: sector.title }]} />
        <SectorDetail sector={sector} relatedServices={relatedServices} servicesBasePath={servicesBasePath}
          contactHref={contactHref} locale={locale}
          labels={{ systems: isEs ? 'Sistemas que integramos' : 'Systems we integrate', services: isEs ? 'Servicios aplicados' : 'Applied services', cta: isEs ? 'Diagnóstico técnico' : 'Technical assessment', back: isEs ? 'Todos los sectores' : 'All sectors' }} />
        <CTASection
          headline={isEs ? `¿Tienes un proyecto de ${sector.title}?` : `Do you have a ${sector.title} project?`}
          body={isEs ? 'Agenda una sesión técnica y evaluamos juntos los retos de coordinación de tu proyecto.' : 'Schedule a technical session and together we evaluate your project coordination challenges.'}
          primaryLabel={isEs ? 'Agendar Sesión Técnica' : 'Schedule Technical Session'} primaryHref={contactHref}
          secondaryLabel={isEs ? 'Ver Todos los Sectores' : 'View All Sectors'} secondaryHref={basePath} variant="light"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ES_SLUGS.map((slug) => ({ locale, slug })))
}
