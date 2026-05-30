import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta, getAboutMetadata } from '@/lib/seo'
import { getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale } from '@/types'
import { getDynamicIcon } from '@/lib/icons'
import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import CTASection from '@/components/shared/CTASection'
import PageHero from '@/components/shared/PageHero'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getAboutMetadata(locale as Locale), locale as Locale)
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()
  const t       = await getTranslations('about')
  const tCommon = await getTranslations('common')
  const isEs    = locale === 'es'
  const contactHref  = isEs ? `/${locale}/contacto`  : `/${locale}/contact`
  const servicesHref = isEs ? `/${locale}/servicios` : `/${locale}/services`
  const basePath     = isEs ? `/${locale}/nosotros`  : `/${locale}/about`
  const valuesItems  = t.raw('values.items') as { icon: string; title: string; description: string }[]
  const certsItems   = t.raw('certifications.items') as string[]

  return (
    <>
      <SchemaOrg schema={[getOrganizationSchema(), getBreadcrumbSchema([{ name: tCommon('breadcrumb.home'), url: `/${locale}/` }, { name: t('hero.label'), url: basePath }])]} />
      <SiteLayout>
        <PageHero label={t('hero.label')} headline={t('hero.headline')} subheadline={t('hero.subheadline')} breadcrumbs={[{ label: tCommon('breadcrumb.home'), href: `/${locale}/` }, { label: t('hero.label') }]} />
        <section className="bg-neutral-50 section-py"><div className="container-section"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"><div><ScrollReveal><SectionLabel>{t('story.label')}</SectionLabel></ScrollReveal><ScrollReveal delay={80}><h2 className="font-display font-bold text-neutral-900 leading-[1.15] tracking-[-0.02em] mb-5" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}>{t('story.headline')}</h2></ScrollReveal><ScrollReveal delay={120}><div className="space-y-4">{t('story.body').split('\n\n').map((para, i) => <p key={i} className="font-sans text-base text-neutral-600 leading-[1.8]">{para}</p>)}</div></ScrollReveal></div><ScrollReveal delay={150}><div className="relative overflow-hidden rounded-xl aspect-[4/5] max-h-[520px]"><Image src="/images/about-structure.jpg" alt="Estructura técnica — identidad de SORA" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" /><div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(3,60,119,0.06)' }} aria-hidden="true" /></div></ScrollReveal></div></div></section>
        <section className="bg-white section-py"><div className="container-section"><div className="max-w-xl mb-12"><ScrollReveal><SectionLabel>{t('values.label')}</SectionLabel></ScrollReveal><ScrollReveal delay={80}><h2 className="font-display font-bold text-neutral-900 leading-[1.15] tracking-[-0.02em]" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}>{t('values.headline')}</h2></ScrollReveal></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{valuesItems.map((value, i) => { const Icon = getDynamicIcon(value.icon); return (<ScrollReveal key={value.title} delay={i * 80}><div className="bg-neutral-50 rounded-xl p-6 h-full border border-neutral-200 hover:border-brand-200 hover:-translate-y-1 hover:shadow-md transition-all duration-250">{Icon && <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4"><Icon size={20} strokeWidth={1.5} className="text-brand-800" /></div>}<h3 className="font-display font-semibold text-neutral-900 text-base mb-2">{value.title}</h3><p className="font-sans text-sm text-neutral-600 leading-relaxed">{value.description}</p></div></ScrollReveal>) })}</div></div></section>
        <section className="bg-neutral-50 section-py"><div className="container-section"><div className="text-center max-w-xl mx-auto mb-10"><ScrollReveal><SectionLabel className="justify-center">{t('certifications.label')}</SectionLabel></ScrollReveal><ScrollReveal delay={80}><h2 className="font-display font-bold text-neutral-900 tracking-[-0.02em]" style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)' }}>{t('certifications.headline')}</h2></ScrollReveal></div><ScrollReveal delay={140}><div className="flex flex-wrap justify-center gap-3">{certsItems.map((cert) => <span key={cert} className="font-mono text-sm px-4 py-2.5 rounded-sm border border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50 transition-colors duration-150">{cert}</span>)}</div></ScrollReveal></div></section>
        <section className="bg-brand-800 section-py"><div className="container-section"><div className="max-w-2xl mx-auto text-center"><ScrollReveal><SectionLabel dark className="justify-center">{t('alliance.label')}</SectionLabel></ScrollReveal><ScrollReveal delay={80}><h2 className="font-display font-bold text-white leading-[1.15] tracking-[-0.02em] mb-5" style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)' }}>{t('alliance.headline')}</h2></ScrollReveal><ScrollReveal delay={140}><div className="space-y-4">{t('alliance.body').split('\n\n').map((para, i) => <p key={i} className="font-sans text-sm text-white/65 leading-[1.8]">{para}</p>)}</div></ScrollReveal></div></div></section>
        <CTASection headline={t('cta.headline')} primaryLabel={t('cta.primary')} primaryHref={contactHref} secondaryLabel={t('cta.secondary')} secondaryHref={servicesHref} variant="light" />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })) }
