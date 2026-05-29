/**
 * Blog post Open Graph image
 *
 * Runtime: Node (default) — required because getBlogPost uses fs/path.
 * Edge runtime is intentionally NOT used here; it is also incompatible
 * with `output: 'export'` in next.config.ts.
 *
 * At build time Next.js calls generateStaticParams and pre-renders one
 * 1200×630 PNG per blog post, placing it alongside the HTML in /out/.
 */
import { ImageResponse } from 'next/og'
import { getBlogPost, getAllBlogSlugs } from '@/lib/content'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/types'

// ── No `runtime` export → defaults to Node ────────────────────────────
export const alt         = 'SORA | Technical BIM Integration — Blog'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string; slug: string }> }

// ── Pre-render one image per post per locale ───────────────────────────
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of routing.locales) {
    const slugs = await getAllBlogSlugs(locale as Locale)
    slugs.forEach((slug) => params.push({ locale, slug }))
  }
  return params
}

// ── Image generator ────────────────────────────────────────────────────
export default async function BlogOGImage({ params }: Props) {
  const { locale, slug } = await params

  // getBlogPost uses fs/path — safe here because runtime is Node
  const post = await getBlogPost(slug, locale as Locale)

  const title    = post?.title    ?? 'Blog — SORA | Technical BIM Integration'
  const category = post?.category ?? 'BIM'

  // Truncate long titles to avoid overflow
  const displayTitle = title.length > 80
    ? title.slice(0, 77).trimEnd() + '...'
    : title

  const fontSize = displayTitle.length > 60 ? 36 : 44

  return new ImageResponse(
    (
      <div
        style={{
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
          padding:        '56px 64px',
          background:     'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          fontFamily:     'system-ui, sans-serif',
        }}
      >
        {/* ── Top bar: brand + category ─────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              color:         'white',
              fontSize:      22,
              fontWeight:    900,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            SORA
          </span>
          <div
            style={{
              padding:       '6px 14px',
              background:    'rgba(22,135,217,0.15)',
              border:        '1px solid rgba(56,189,248,0.3)',
              borderRadius:  4,
              color:         '#38BDF8',
              fontSize:      11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight:    600,
            }}
          >
            {category}
          </div>
        </div>

        {/* ── Title block ───────────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            gap:            20,
            flex:           1,
            justifyContent: 'center',
          }}
        >
          {/* Accent rule */}
          <div style={{ width: 48, height: 2, background: '#1687D9' }} />
          <div
            style={{
              color:         'white',
              fontSize:      fontSize,
              fontWeight:    700,
              lineHeight:    1.15,
              letterSpacing: '-0.02em',
              maxWidth:      900,
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* ── Bottom bar: tagline + standard tags ───────────── */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width:      32,
                height:     1,
                background: 'rgba(255,255,255,0.2)',
              }}
            />
            <span
              style={{
                color:         'rgba(255,255,255,0.4)',
                fontSize:      13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight:    500,
              }}
            >
              Technical BIM Integration
            </span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['ISO 19650', 'CDE', 'BIM'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding:      '4px 10px',
                  border:       '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  color:        'rgba(255,255,255,0.3)',
                  fontSize:     11,
                  fontFamily:   'monospace',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
