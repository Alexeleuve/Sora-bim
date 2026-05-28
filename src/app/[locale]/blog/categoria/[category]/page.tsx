import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getBreadcrumbSchema } from '@/lib/schema'
import { getAllBlogPosts, getBlogCategories } from '@/lib/content'
import type { Locale, BlogCategory } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import BlogHero from '@/components/sections/blog/BlogHero'
import BlogCategoryFilter from '@/components/sections/blog/BlogCategoryFilter'
import BlogGrid from '@/components/sections/blog/BlogGrid'
import NewsletterBanner from '@/components/sections/blog/NewsletterBanner'

const VALID_CATEGORIES: BlogCategory[] = [
  'bim','iso-19650','cde','sistemas-especiales',
  'data-centers','hospitales','industria',
  'coordinacion-bim','ia-aplicada-bim','transformacion-digital',
]

type Props = {
  params: Promise<{ locale: string; category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params
  const t = await getTranslations('blog')

  if (!VALID_CATEGORIES.includes(category as BlogCategory)) return {}

  const catLabel = t(`categories.${category}` as any)
  const isEs = locale === 'es'
  const catPath = isEs ? 'categoria' : 'category'

  return genMeta(
    {
      title: `${catLabel} — Blog`,
      description: `Artículos sobre ${catLabel} en integración BIM, ISO 19650 y transformación digital para construcción.`,
      canonical: `/${locale}/blog/${catPath}/${category}/`,
    },
    locale as Locale
  )
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, category } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()
  if (!VALID_CATEGORIES.includes(category as BlogCategory)) notFound()

  const t = await getTranslations('blog')
  const tCommon = await getTranslations('common')
  const isEs = locale === 'es'
  const catPath = isEs ? 'categoria' : 'category'
  const catLabel = t(`categories.${category}` as any)

  // Load posts filtered by category
  const allPosts = await getAllBlogPosts(locale as Locale)
  const posts = allPosts.filter((p) => p.category === category)

  const categoryStats = await getBlogCategories(locale as Locale)
  const categories = VALID_CATEGORIES
    .filter((key) => categoryStats.some((c) => c.category === key))
    .map((key) => ({
      value: key,
      label: t(`categories.${key}` as any),
      count: categoryStats.find((c) => c.category === key)?.count ?? 0,
    }))

  const breadcrumb = getBreadcrumbSchema([
    { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
    { name: t('hero.label'), url: `/${locale}/blog` },
    { name: catLabel, url: `/${locale}/blog/${catPath}/${category}` },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <BlogHero
          label={t('hero.label')}
          headline={catLabel}
          subheadline={t('hero.subheadline')}
        />

        <section className="bg-neutral-50 section-py">
          <div className="container-section">
            {/* Category filter */}
            <div className="mb-10">
              <BlogCategoryFilter
                categories={categories}
                activeCategory={category}
                allLabel={t('categories.all')}
              />
            </div>

            {/* Posts */}
            <BlogGrid
              posts={posts}
              readTimeLabel={t('readTime')}
              locale={locale}
              emptyMessage={t('noPostsFound')}
              featured={false}
            />
          </div>
        </section>

        <NewsletterBanner
          headline={t('newsletter.headline')}
          body={t('newsletter.body')}
          placeholder={t('newsletter.placeholder')}
          cta={t('newsletter.cta')}
          privacy={t('newsletter.privacy')}
        />
      </SiteLayout>
    </>
  )
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_CATEGORIES.map((category) => ({ locale, category }))
  )
}
