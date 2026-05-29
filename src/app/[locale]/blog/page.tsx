import type { Metadata } from 'next'
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

import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

type Messages = typeof esMessages
function getMsg(locale: string): Messages {
  return locale === 'en' ? (enMessages as unknown as Messages) : esMessages
}

const ALL_CATEGORIES: BlogCategory[] = [
  'bim','iso-19650','cde','sistemas-especiales','data-centers','hospitales',
  'industria','coordinacion-bim','ia-aplicada-bim','transformacion-digital',
]

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getBlogMetadata(locale as Locale), locale as Locale)
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const m    = getMsg(locale)
  const blog = m.blog
  const cats = blog.categories as Record<string, string>

  const posts         = await getAllBlogPosts(locale as Locale)
  const categoryStats = await getBlogCategories(locale as Locale)

  const categories = ALL_CATEGORIES
    .filter((key) => categoryStats.some((c) => c.category === key))
    .map((key) => ({
      value: key,
      label: (cats[key] ?? key) as string,
      count: categoryStats.find((c) => c.category === key)?.count ?? 0,
    }))

  const breadcrumb = getBreadcrumbSchema([
    { name: m.common.breadcrumb.home, url: `/${locale}/` },
    { name: blog.hero.label,          url: `/${locale}/blog` },
  ])

  return (
    <>
      <SchemaOrg schema={breadcrumb} />
      <SiteLayout>
        <BlogHero
          label={blog.hero.label}
          headline={blog.hero.headline}
          subheadline={blog.hero.subheadline}
        />
        <section className="bg-neutral-50 section-py">
          <div className="container-section">
            {categories.length > 0 && (
              <div className="mb-10">
                <BlogCategoryFilter
                  categories={categories}
                  activeCategory="all"
                  allLabel={cats['all'] ?? 'All'}
                />
              </div>
            )}
            <BlogGrid
              posts={posts}
              readTimeLabel={blog.readTime}
              locale={locale}
              emptyMessage={blog.noPostsFound}
              featured={posts.length > 1}
            />
          </div>
        </section>
        <NewsletterBanner
          headline={blog.newsletter.headline}
          body={blog.newsletter.body}
          placeholder={blog.newsletter.placeholder}
          cta={blog.newsletter.cta}
          privacy={blog.newsletter.privacy}
        />
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
