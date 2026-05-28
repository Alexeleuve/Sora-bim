import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/schema'
import { getBlogPost, getRelatedPosts, getAllBlogSlugs } from '@/lib/content'
import { getBaseUrl } from '@/lib/utils'
import type { Locale } from '@/types'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import BlogPostHeader from '@/components/sections/blog/BlogPostHeader'
import BlogPostBody from '@/components/sections/blog/BlogPostBody'
import NewsletterBanner from '@/components/sections/blog/NewsletterBanner'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPost(slug, locale as Locale)
  if (!post) return {}

  const BASE_URL = getBaseUrl()
  const postUrl = `/${locale}/blog/${slug}/`

  return genMeta(
    {
      title: post.title,
      description: post.excerpt,
      canonical: postUrl,
      ogImage: post.coverImage ? `${BASE_URL}${post.coverImage}` : undefined,
      ogType: 'article',
    },
    locale as Locale
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const t = await getTranslations('blog')
  const tCommon = await getTranslations('common')
  const isEs = locale === 'es'

  // Load post
  const post = await getBlogPost(slug, locale as Locale)
  if (!post) notFound()

  // Load related posts
  const relatedPosts = await getRelatedPosts(slug, post.category, locale as Locale, 2)

  const postUrl = `/${locale}/blog/${slug}/`
  const contactHref = isEs ? `/${locale}/contacto` : `/${locale}/contact`

  // Category label
  const categoryLabel = t(`categories.${post.category}` as any)

  // Schemas
  const schemas = [
    getArticleSchema(post, locale, postUrl),
    getBreadcrumbSchema([
      { name: tCommon('breadcrumb.home'), url: `/${locale}/` },
      { name: t('hero.label'), url: `/${locale}/blog` },
      { name: post.title, url: postUrl },
    ]),
  ]

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>

        {/* Article header */}
        <BlogPostHeader
          post={post}
          locale={locale as Locale}
          backLabel={t('backToBlog')}
          backHref={`/${locale}/blog`}
          categoryLabel={categoryLabel}
          publishedLabel={t('publishedOn')}
          readTimeLabel={t('readTime')}
        />

        {/* Article body + sidebar */}
        <BlogPostBody
          post={post}
          relatedPosts={relatedPosts}
          locale={locale as Locale}
          labels={{
            tags: isEs ? 'Etiquetas' : 'Tags',
            relatedPosts: t('relatedPosts'),
            readMore: t('readMore'),
            readTime: t('readTime'),
            cta: isEs ? 'Solicitar Diagnóstico' : 'Request Assessment',
            ctaHref: contactHref,
          }}
        />

        {/* Newsletter */}
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
  const params: { locale: string; slug: string }[] = []

  for (const locale of routing.locales) {
    const slugs = await getAllBlogSlugs(locale as Locale)
    slugs.forEach((slug) => params.push({ locale, slug }))
  }

  return params
}
