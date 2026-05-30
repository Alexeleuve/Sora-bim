import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale, ServiceItem } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import PageHero from '@/components/shared/PageHero'
import ServiceDetail from '@/components/sections/services/ServiceDetail'

const ES_SLUG_MAP: Record<string, number> = {
  'integracion-bim':    0, 'coordinacion-bim':   1, 'sistemas-especiales': 2,
  'sistemas-electricos':3, 'gestion-informacion': 4, 'bim-4d': 5, 'bim-5d': 6,
}
const EN_SLUG_MAP: Record<string, number> = {
  'bim-integration':0, 'bim-coordination':1, 'special-systems':2,
  'electrical-systems':3, 'information-management':4, 'bim-4d':5, 'bim-5d':6,
}
function getIndex(locale: string, slug: string) {
  return locale === 'en' ? EN_SLUG_MAP[slug] : ES_SLUG_MAP[slug]
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t     = await getTranslations('services')
  const index = getIndex(locale, slug)
  if (index === undefined) return {}
  const service = (t.raw('items') as ServiceItem[])[index]
  const esSlug  = Object.keys(ES_SLUG_MAP)[index]
  const enSlug  = Object.keys(EN_SLUG_MAP)[index]
  return genMeta({
    title: service.title, description: service.shortDescription,
    canonical: locale === 'es' ? `/es/servicios/${esSlug}/` : `/en/services/${enSlug}/`,
    alternates: { es: `/es/servicios/${esSlug}/`, en: `/en/services/${enSlug}/` },
  }, locale as Locale)
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const t       = await getTranslations('services')
  const tCommon = await getTranslations('common')
  const index   = getIndex(locale, slug)
  if (index === undefined) notFound()

  const isEs        = locale === 'es'
  const basePath    = isEs ? `/${locale}/servicios` : `/${locale}/services`
  const contactHref = isEs ? `/${locale}/contacto`  : `/${locale}/contact`

  const services        = t.raw('items') as ServiceItem[]
  const service         = services[index]
  const relatedServices = services.filter((_, i) => i !== index).slice(0, 3)
  const esSlug          = Object.keys(ES_SLUG_MAP)[index]

  const schemas = [
    getServiceSchema(service.title, service.description, 'BIM Integration Service'),
    getBreadcrumbSchema([
      { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
      { name: t('hero.label'),            url: basePath },
      { name: service.title,              url: `${basePath}/${slug}` },
    ]),
  ]
  const labels = {
    benefits: isEs ? 'Beneficios clave' : 'Key benefits',
    useCases: isEs ? 'Casos de uso' : 'Use cases',
    standards: isEs ? 'Estándares aplicados' : 'Applied standards',
    related: isEs ? 'Servicios relacionados' : 'Related services',
    ctaSidebar: isEs ? 'Solicita un diagnóstico' : 'Request an assessment',
    ctaSidebarBody: isEs ? 'Identificamos las necesidades de tu proyecto sin costo y sin compromiso.' : 'We identify your project needs at no cost and no commitment.',
    ctaSidebarBtn: isEs ? 'Agendar sesión técnica' : 'Schedule technical session',
    back: isEs ? 'Todos los servicios' : 'All services',
  }

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>
        <PageHero label={t('hero.label')} headline={service.title} subheadline={service.shortDescription}
          breadcrumbs={[{ label: tCommon('breadcrumb.home'), href: `/${locale}/` }, { label: t('hero.label'), href: basePath }, { label: service.title }]} />
        <ServiceDetail service={service} relatedServices={relatedServices} basePath={basePath} locale={locale} labels={labels} />
        <CTASection
          headline={isEs ? '¿Listo para integrar los sistemas de tu proyecto?' : 'Ready to integrate your project systems?'}
          body={isEs ? 'Agenda una sesión técnica gratuita y evaluamos juntos las necesidades de tu proyecto.' : 'Schedule a free technical session and together we evaluate your project needs.'}
          primaryLabel={isEs ? 'Agendar Sesión Técnica' : 'Schedule Technical Session'}
          primaryHref={contactHref}
          secondaryLabel={isEs ? 'Ver Todos los Servicios' : 'View All Services'}
          secondaryHref={basePath} variant="light"
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(locale === 'en' ? EN_SLUG_MAP : ES_SLUG_MAP).map((slug) => ({ locale, slug }))
  )
}
