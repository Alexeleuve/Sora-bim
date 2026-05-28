'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { formatDateShort } from '@/lib/utils'
import Badge from '@/components/ui/Badge/Badge'
import type { BlogPost, Locale } from '@/types'

interface BlogCardProps {
  post: BlogPost
  categoryLabel: string
  readTimeLabel: string
  href: string
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export default function BlogCard({
  post,
  categoryLabel,
  readTimeLabel,
  href,
  variant = 'default',
  className,
}: BlogCardProps) {
  const locale = useLocale() as Locale

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className={cn(
          'group flex gap-4 items-start',
          'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm',
          className
        )}
      >
        {post.coverImage && (
          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={80}
              height={80}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase text-brand-500 mb-1">
            {categoryLabel}
          </p>
          <h3 className="font-display font-semibold text-sm text-neutral-900 line-clamp-2 group-hover:text-brand-500 transition-colors duration-200">
            {post.title}
          </h3>
          <p className="font-sans text-xs text-neutral-400 mt-1">
            {post.readingTime} {readTimeLabel}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'group block bg-white border border-neutral-200 rounded-xl overflow-hidden',
        'transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-[3px]',
        'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]',
        variant === 'featured' && 'md:grid md:grid-cols-2 md:rounded-xl',
        className
      )}
    >
      {/* Image */}
      <div className={cn(
        'overflow-hidden bg-neutral-100',
        variant === 'featured' ? 'aspect-card md:aspect-auto md:h-full' : 'aspect-video'
      )}>
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
            <span className="font-mono text-brand-300 text-lg tracking-[-0.01em]">
              SORA | BIM
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn(
        'p-6',
        variant === 'featured' && 'md:p-8 md:flex md:flex-col md:justify-center'
      )}>
        {post.featured && (
          <Badge variant="status-featured" className="mb-3">
            {locale === 'es' ? 'Destacado' : 'Featured'}
          </Badge>
        )}

        <p className="font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase text-brand-500 mb-2">
          {categoryLabel}
        </p>

        <h3 className={cn(
          'font-display font-semibold text-neutral-900 leading-snug line-clamp-2',
          'transition-colors duration-200 group-hover:text-brand-500',
          'mb-2',
          variant === 'featured' ? 'text-2xl' : 'text-lg'
        )}>
          {post.title}
        </h3>

        <p className="font-sans text-sm text-neutral-500 leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 font-sans text-xs text-neutral-400">
          <time dateTime={post.publishedAt}>
            {formatDateShort(post.publishedAt, locale)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} {readTimeLabel}</span>
        </div>
      </div>
    </Link>
  )
}
