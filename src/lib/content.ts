import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost, BlogPostFrontmatter, BlogCategory, Locale } from '@/types'
import { calculateReadingTime } from '@/lib/utils'

const BLOG_DIR = path.join(process.cwd(), 'content')

// ─── GET ALL BLOG POSTS ───────────────────────────────────────────────
export async function getAllBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const blogDir = path.join(BLOG_DIR, locale, 'blog')

  if (!fs.existsSync(blogDir)) {
    return []
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(blogDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const frontmatter = data as BlogPostFrontmatter

    return {
      slug,
      ...frontmatter,
      content,
      readingTime: calculateReadingTime(content),
    } as BlogPost
  })

  return posts
    .filter((post) => post.title && post.publishedAt)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// ─── GET SINGLE BLOG POST ─────────────────────────────────────────────
export async function getBlogPost(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, locale, 'blog', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const frontmatter = data as BlogPostFrontmatter

  return {
    slug,
    ...frontmatter,
    content,
    readingTime: calculateReadingTime(content),
  } as BlogPost
}

// ─── GET POSTS BY CATEGORY ────────────────────────────────────────────
export async function getBlogPostsByCategory(
  category: BlogCategory,
  locale: Locale
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(locale)
  return posts.filter((post) => post.category === category)
}

// ─── GET FEATURED POSTS ───────────────────────────────────────────────
export async function getFeaturedPosts(
  locale: Locale,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(locale)
  const featured = posts.filter((post) => post.featured)
  if (featured.length >= limit) return featured.slice(0, limit)
  // Pad with recent posts if not enough featured
  const recent = posts.filter((post) => !post.featured)
  return [...featured, ...recent].slice(0, limit)
}

// ─── GET RELATED POSTS ────────────────────────────────────────────────
export async function getRelatedPosts(
  currentSlug: string,
  category: BlogCategory,
  locale: Locale,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(locale)
  return posts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit)
}

// ─── GET ALL SLUGS ────────────────────────────────────────────────────
export async function getAllBlogSlugs(locale: Locale): Promise<string[]> {
  const posts = await getAllBlogPosts(locale)
  return posts.map((post) => post.slug)
}

// ─── GET ALL CATEGORIES ───────────────────────────────────────────────
export async function getBlogCategories(locale: Locale): Promise<{
  category: BlogCategory
  count: number
}[]> {
  const posts = await getAllBlogPosts(locale)
  const categoryCounts = posts.reduce(
    (acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return Object.entries(categoryCounts).map(([category, count]) => ({
    category: category as BlogCategory,
    count,
  }))
}
