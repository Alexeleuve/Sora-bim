'use client'

import { cn } from '@/lib/utils'
import BlogCard from '@/components/shared/BlogCard'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import type { BlogPost } from '@/types'

interface BlogGridProps {
  posts: BlogPost[]
  readTimeLabel: string
  locale: string
  emptyMessage: string
  featured?: boolean
}

export default function BlogGrid({
  posts,
  readTimeLabel,
  locale,
  emptyMessage,
  featured = false,
}: BlogGridProps) {
  const isEs = locale === 'es'
  const catPath = isEs ? 'categoria' : 'category'

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-sans text-base text-neutral-400">{emptyMessage}</p>
      </div>
    )
  }

  // If featured mode: first post as large featured card, rest as regular
  const featuredPost = featured && posts.length > 0 ? posts[0] : null
  const regularPosts = featured && posts.length > 0 ? posts.slice(1) : posts

  return (
    <div>
      {/* Featured post */}
      {featuredPost && (
        <ScrollReveal delay={0} className="mb-8">
          <BlogCard
            post={featuredPost}
            categoryLabel={featuredPost.category}
            readTimeLabel={readTimeLabel}
            href={`/${locale}/blog/${featuredPost.slug}`}
            variant="featured"
          />
        </ScrollReveal>
      )}

      {/* Regular grid */}
      {regularPosts.length > 0 && (
        <div className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
        )}>
          {regularPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.06} threshold={0.04}>
              <BlogCard
                post={post}
                categoryLabel={post.category}
                readTimeLabel={readTimeLabel}
                href={`/${locale}/blog/${post.slug}`}
                variant="default"
                className="h-full"
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
