'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge/Badge'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import type { BlogPost, Locale } from '@/types'

interface BlogPostHeaderProps {
  post: BlogPost
  locale: Locale
  backLabel: string
  backHref: string
  categoryLabel: string
  publishedLabel: string
  readTimeLabel: string
}

export default function BlogPostHeader({
  post,
  locale,
  backLabel,
  backHref,
  categoryLabel,
  publishedLabel,
  readTimeLabel,
}: BlogPostHeaderProps) {
  return (
    <header>
      {/* Dark hero area */}
      <div className="bg-neutral-900 pt-28 pb-12">
        <div className="container-section">
          {/* Back link */}
          <Link
            href={backHref}
            className={cn(
              'group inline-flex items-center gap-2 mb-8',
              'font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase',
              'text-white/40 hover:text-white/80',
              'transition-colors duration-150',
              'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm'
            )}
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            {backLabel}
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="font-display font-semibold text-[0.6875rem] tracking-[0.1em] uppercase text-brand-300">
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-bold text-white leading-[1.1] tracking-[-0.025em] mb-5 max-w-3xl"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="font-sans text-lg text-white/60 leading-relaxed max-w-2xl mb-8">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/45">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <span className="font-display font-bold text-[0.5625rem] text-white uppercase">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <span className="font-sans text-sm text-white/60">
                {post.author.name}
              </span>
            </div>

            <span className="text-white/20" aria-hidden="true">·</span>

            <div className="flex items-center gap-1.5">
              <Calendar size={13} aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, locale)}
              </time>
            </div>

            <span className="text-white/20" aria-hidden="true">·</span>

            <div className="flex items-center gap-1.5">
              <Clock size={13} aria-hidden="true" />
              <span>{post.readingTime} {readTimeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="bg-neutral-900">
          <div className="container-section pb-0">
            <div className="relative overflow-hidden rounded-xl aspect-video max-h-[480px]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
