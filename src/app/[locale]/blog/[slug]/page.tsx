import type { Metadata } from 'next'
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

import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

type Messages = typeof esMessages
function getMsg(locale: string): Messages {
  return locale === 'en' ? (enMessages as unknown as Messages) : esMessages
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPost(slug, locale as Locale)
  if (!post) return {}
  return genMeta({
    title:       post.title,
    description: post.excerpt,
    canonical:   `/${locale}/blog/${slug}/`,
    ogImage:     post.coverImage ? `${getBaseUrl()}${post.coverImage}` : undefined,
    ogType:      'article',
  }, locale as Locale)
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const m    = getMsg(locale)
  const blog = m.blog
  const cats = blog.categories as Record<string, string>
  const isEs = locale === 'es'

  const post = await getBlogPost(slug, locale as Locale)
  if (!post) notFound()

  const relatedPosts   = await getRelatedPosts(slug, post.category, locale as Locale, 2)
  const postUrl        = `/${locale}/blog/${slug}/`
  const contactHref    = isEs ? `/${locale}/contacto` : `/${locale}/contact`
  const categoryLabel  = (cats[post.category] ?? post.category) as string

  const schemas = [
    getArticleSchema(post, locale, postUrl),
    getBreadcrumbSchema([
      { name: m.common.breadcrumb.home, url: `/${locale}/` },
      { name: blog.hero.label,          url: `/${locale}/blog` },
      { name: post.title,               url: postUrl },
    ]),
  ]

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout>
        <BlogPostHeader
          post={post}
          locale={locale as Locale}
          backLabel={blog.backToBlog}
          backHref={`/${locale}/blog`}
          categoryLabel={categoryLabel}
          publishedLabel={blog.publishedOn}
          readTimeLabel={blog.readTime}
        />
        <BlogPostBody
          post={post}
          relatedPosts={relatedPosts}
          locale={locale as Locale}
          labels={{
            tags:         isEs ? 'Etiquetas' : 'Tags',
            relatedPosts: blog.relatedPosts,
            readMore:     blog.readMore,
            readTime:     blog.readTime,
            cta:          isEs ? 'Solicitar Diagnóstico' : 'Request Assessment',
            ctaHref:      contactHref,
          }}
        />
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

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of routing.locales) {
    const slugs = await getAllBlogSlugs(locale as Locale)
    slugs.forEach((slug) => params.push({ locale, slug }))
  }
  return params
}
