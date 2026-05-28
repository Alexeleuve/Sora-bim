import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import type { Locale } from '@/types'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import PageHero from '@/components/shared/PageHero'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('caseStudies')
  return genMeta({
    title: t('hero.label'),
    description: t('hero.subheadline'),
    canonical: locale === 'es' ? `/es/casos-de-exito/` : `/en/case-studies/`,
    alternates: { es: '/es/casos-de-exito/', en: '/en/case-studies/' },
  }, locale as Locale)
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const t = await getTranslations('caseStudies')
  const tCommon = await getTranslations('common')
  const isEs = locale === 'es'
  const basePath = isEs ? `/${locale}/casos-de-exito` : `/${locale}/case-studies`
  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`

  const breadcrumb = getBreadcrumbSchema([
    { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
    { name: t('hero.label'), url: basePath },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <PageHero
          label={t('hero.label')}
          headline={t('hero.headline')}
          subheadline={t('hero.subheadline')}
          breadcrumbs={[
            { label: tCommon('breadcrumb.home'), href: `/${locale}/` },
            { label: t('hero.label') },
          ]}
        />

        {/* Coming soon state */}
        <section className="bg-neutral-50 section-py">
          <div className="container-section">
            <div className="max-w-content mx-auto text-center">
              <ScrollReveal>
                {/* Decorative element */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 mb-8">
                  <span className="font-mono text-xs text-brand-400 tracking-[-0.01em]">v1.1</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <h2
                  className="font-display font-bold text-neutral-900 tracking-[-0.02em] mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
                >
                  {t('comingSoon.headline')}
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.14}>
                <p className="font-sans text-base text-neutral-600 leading-relaxed mb-10 max-w-lg mx-auto">
                  {t('comingSoon.body')}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Link
                  href={contactHref}
                  className={cn(
                    'group inline-flex items-center gap-2',
                    'bg-brand-500 text-white rounded-sm',
                    'font-display font-semibold text-[0.8125rem] tracking-[0.04em] uppercase',
                    'px-8 py-4',
                    'transition-all duration-200 hover:bg-brand-600',
                    'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]'
                  )}
                >
                  {t('comingSoon.cta')}
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </ScrollReveal>

              {/* ISO badge row */}
              <ScrollReveal delay={0.26}>
                <div className="flex flex-wrap justify-center gap-2 mt-16 pt-10 border-t border-neutral-200">
                  {['ISO 19650', 'CDE', 'BIM 4D', 'BIM 5D', 'Sistemas Especiales'].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-1.5 rounded-sm border border-neutral-200 bg-white text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
