import type { Metadata } from 'next'
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

// ─── Static JSON imports — eliminates getTranslations() / headers() ──
import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

type Messages = typeof esMessages

function getMessages(locale: string): Messages {
  return locale === 'en' ? (enMessages as unknown as Messages) : esMessages
}

// ─── Categories ───────────────────────────────────────────────────────
const VALID_CATEGORIES: BlogCategory[] = [
  'bim', 'iso-19650', 'cde', 'sistemas-especiales',
  'data-centers', 'hospitales', 'industria',
  'coordinacion-bim', 'ia-aplicada-bim', 'transformacion-digital',
]

type Props = {
  params: Promise<{ locale: string; category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params
  if (!VALID_CATEGORIES.includes(category as BlogCategory)) return {}

  const m       = getMessages(locale)
  const cats    = m.blog.categories as Record<string, string>
  const catLabel = cats[category] ?? category
  const isEs    = locale === 'es'
  const catPath = isEs ? 'categoria' : 'category'

  return genMeta(
    {
      title:       `${catLabel} — Blog`,
      description: isEs
        ? `Artículos sobre ${catLabel} en integración BIM, ISO 19650 y transformación digital para construcción.`
        : `Articles on ${catLabel} in BIM integration, ISO 19650 and digital transformation for construction.`,
      canonical: `/${locale}/blog/${catPath}/${category}/`,
    },
    locale as Locale
  )
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, category } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()
  if (!VALID_CATEGORIES.includes(category as BlogCategory)) notFound()

  const m       = getMessages(locale)
  const cats    = m.blog.categories as Record<string, string>
  const isEs    = locale === 'es'
  const catPath = isEs ? 'categoria' : 'category'
  const catLabel = cats[category] ?? category

  // fs-based content reads — safe at build time with generateStaticParams
  const allPosts      = await getAllBlogPosts(locale as Locale)
  const posts         = allPosts.filter((p) => p.category === category)
  const categoryStats = await getBlogCategories(locale as Locale)

  const categories = VALID_CATEGORIES
    .filter((key) => categoryStats.some((c) => c.category === key))
    .map((key) => ({
      value: key,
      label: (cats[key] ?? key) as string,
      count: categoryStats.find((c) => c.category === key)?.count ?? 0,
    }))

  const breadcrumb = getBreadcrumbSchema([
    { name: m.common.breadcrumb.home,  url: `/${locale}/` },
    { name: m.blog.hero.label,         url: `/${locale}/blog` },
    { name: catLabel,                  url: `/${locale}/blog/${catPath}/${category}` },
  ])

  const newsletter = m.blog.newsletter

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <BlogHero
          label={m.blog.hero.label}
          headline={catLabel}
          subheadline={m.blog.hero.subheadline}
        />

        <section className="bg-neutral-50 section-py">
          <div className="container-section">
            <div className="mb-10">
              <BlogCategoryFilter
                categories={categories}
                activeCategory={category}
                allLabel={cats['all'] ?? 'All'}
              />
            </div>
            <BlogGrid
              posts={posts}
              readTimeLabel={m.blog.readTime}
              locale={locale}
              emptyMessage={m.blog.noPostsFound}
              featured={false}
            />
          </div>
        </section>

        <NewsletterBanner
          headline={newsletter.headline}
          body={newsletter.body}
          placeholder={newsletter.placeholder}
          cta={newsletter.cta}
          privacy={newsletter.privacy}
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_CATEGORIES.map((category) => ({ locale, category }))
  )
}
