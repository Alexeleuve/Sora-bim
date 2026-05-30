import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta, getBlogMetadata } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import { getAllBlogPosts, getBlogCategories } from '@/lib/content'
import type { Locale, BlogCategory } from '@/types'
import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import BlogHero from '@/components/sections/blog/BlogHero'
import BlogCategoryFilter from '@/components/sections/blog/BlogCategoryFilter'
import BlogGrid from '@/components/sections/blog/BlogGrid'
import NewsletterBanner from '@/components/sections/blog/NewsletterBanner'

const ALL_CATEGORIES: BlogCategory[] = ['bim','iso-19650','cde','sistemas-especiales','data-centers','hospitales','industria','coordinacion-bim','ia-aplicada-bim','transformacion-digital']

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getBlogMetadata(locale as Locale), locale as Locale)
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()
  const t       = await getTranslations('blog')
  const tCommon = await getTranslations('common')
  const posts         = await getAllBlogPosts(locale as Locale)
  const categoryStats = await getBlogCategories(locale as Locale)
  const categories = ALL_CATEGORIES
    .filter((key) => categoryStats.some((c) => c.category === key))
    .map((key) => ({ value: key, label: t(`categories.${key}` as any), count: categoryStats.find((c) => c.category === key)?.count ?? 0 }))
  return (
    <>
      <SchemaOrg schema={getBreadcrumbSchema([{ name: tCommon('breadcrumb.home'), url: `/${locale}/` }, { name: t('hero.label'), url: `/${locale}/blog` }])} />
      <SiteLayout>
        <BlogHero label={t('hero.label')} headline={t('hero.headline')} subheadline={t('hero.subheadline')} />
        <section className="bg-neutral-50 section-py">
          <div className="container-section">
            {categories.length > 0 && <div className="mb-10"><BlogCategoryFilter categories={categories} activeCategory="all" allLabel={t('categories.all')} /></div>}
            <BlogGrid posts={posts} readTimeLabel={t('readTime')} locale={locale} emptyMessage={t('noPostsFound')} featured={posts.length > 1} />
          </div>
        </section>
        <NewsletterBanner headline={t('newsletter.headline')} body={t('newsletter.body')} placeholder={t('newsletter.placeholder')} cta={t('newsletter.cta')} privacy={t('newsletter.privacy')} />
      </SiteLayout>
    </>
  )
}
export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })) }
