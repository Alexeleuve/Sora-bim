'use client'

import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge/Badge'
import BlogCard from '@/components/shared/BlogCard'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import type { BlogPost, Locale } from '@/types'

// MDX component overrides — styled for SORA brand
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="font-display font-bold text-neutral-900 leading-[1.1] tracking-[-0.025em] mt-12 mb-5 first:mt-0"
      style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)' }}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="font-display font-bold text-neutral-900 leading-[1.15] tracking-[-0.02em] mt-10 mb-4"
      style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="font-display font-semibold text-neutral-900 leading-snug tracking-[-0.015em] mt-8 mb-3 text-xl"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="font-sans text-base text-neutral-700 leading-[1.85] mb-5"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="space-y-2.5 mb-6 ml-0 list-none" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="space-y-2.5 mb-6 ml-0 list-decimal list-inside" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className="font-sans text-base text-neutral-700 leading-relaxed flex items-start gap-3 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-400 before:flex-shrink-0 before:mt-2.5"
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-neutral-900" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-neutral-600" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-[3px] border-brand-400 pl-5 my-8 italic text-neutral-600 leading-relaxed"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="font-mono text-[0.875em] bg-brand-50 text-brand-800 px-1.5 py-0.5 rounded-sm border border-brand-100"
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="bg-neutral-900 rounded-xl p-6 overflow-x-auto mb-6 text-sm font-mono text-brand-300 leading-relaxed"
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-brand-500 underline underline-offset-2 decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors duration-150"
    />
  ),
  hr: () => (
    <hr className="border-0 border-t border-neutral-200 my-10" />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table
        {...props}
        className="w-full border-collapse text-sm font-sans"
      />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase text-neutral-500 bg-neutral-50 px-4 py-3 text-left border-b border-neutral-200"
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="font-sans text-sm text-neutral-700 px-4 py-3 border-b border-neutral-100"
    />
  ),
}

interface BlogPostBodyProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  locale: Locale
  labels: {
    tags: string
    relatedPosts: string
    readMore: string
    readTime: string
    cta: string
    ctaHref: string
  }
}

export default function BlogPostBody({
  post,
  relatedPosts,
  locale,
  labels,
}: BlogPostBodyProps) {
  return (
    <div className="bg-white section-py">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">

          {/* ── Main article content ── */}
          <article
            className="min-w-0"
            aria-label={post.title}
          >
            {/* MDX content */}
            <div className="prose-custom max-w-none">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-100">
                <p className="font-display font-semibold text-[0.6875rem] tracking-[0.08em] uppercase text-neutral-400 mb-3">
                  {labels.tags}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="sector">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display font-bold text-neutral-900 text-xl mb-8 tracking-[-0.02em]">
                  {labels.relatedPosts}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((related, i) => (
                    <ScrollReveal key={related.slug} delay={i * 0.08}>
                      <BlogCard
                        post={related}
                        categoryLabel={related.category}
                        readTimeLabel={labels.readTime}
                        href={`/${locale}/blog/${related.slug}`}
                        variant="default"
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-28 space-y-6" aria-label="Barra lateral del artículo">

            {/* CTA Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-brand-800 rounded-xl p-6 text-white">
                <p
                  className="font-display font-semibold text-[0.6875rem] tracking-[0.1em] uppercase text-brand-300 mb-2"
                >
                  SORA | BIM
                </p>
                <h3 className="font-display font-bold text-base leading-snug mb-3">
                  {locale === 'es'
                    ? '¿Tu proyecto necesita integración BIM?'
                    : 'Does your project need BIM integration?'}
                </h3>
                <p className="font-sans text-xs text-white/55 leading-relaxed mb-5">
                  {locale === 'es'
                    ? 'Diagnóstico técnico gratuito. Sin compromiso.'
                    : 'Free technical assessment. No commitment.'}
                </p>
                <Link
                  href={labels.ctaHref}
                  className={cn(
                    'group flex items-center justify-center gap-2 w-full',
                    'bg-brand-500 text-white rounded-sm',
                    'font-display font-semibold text-[0.6875rem] tracking-[0.04em] uppercase',
                    'py-3 px-4',
                    'hover:bg-brand-400 transition-colors duration-200',
                    'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]'
                  )}
                >
                  {labels.cta}
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Standards badge */}
            <ScrollReveal delay={0.15}>
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'linear-gradient(135deg, #EAF6FF 0%, #F8FAFC 100%)',
                  border: '1px solid #BAE6FD',
                }}
              >
                <p className="font-display font-semibold text-[0.5625rem] tracking-[0.12em] uppercase text-brand-400 mb-3">
                  {locale === 'es' ? 'Estándares SORA' : 'SORA Standards'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['ISO 19650', 'CDE', 'IFC', 'BCF', 'COBie'].map((std) => (
                    <span
                      key={std}
                      className="font-mono text-[0.625rem] px-2 py-1 rounded-sm border border-brand-200 bg-white text-brand-600"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Back to blog */}
            <ScrollReveal delay={0.2}>
              <Link
                href={`/${locale}/blog`}
                className={cn(
                  'group inline-flex items-center gap-2',
                  'font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase',
                  'text-neutral-400 hover:text-brand-500',
                  'transition-colors duration-150',
                  'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm'
                )}
              >
                ← {locale === 'es' ? 'Volver al Blog' : 'Back to Blog'}
              </Link>
            </ScrollReveal>

          </aside>
        </div>
      </div>
    </div>
  )
}
