import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SORA Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string; slug: string }> }

function formatSlug(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default async function BlogOGImage({ params }: Props) {
  const { locale, slug } = await params

  const title = formatSlug(slug) || 'Blog — SORA | Technical BIM Integration'
  const category = locale === 'es' ? 'Blog BIM' : 'BIM Blog'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'white', fontSize: 22, fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            SORA
          </span>
          <div
            style={{
              padding: '6px 14px',
              background: 'rgba(22,135,217,0.15)',
              border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: 4,
              color: '#38BDF8',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
          <div style={{ width: 48, height: 2, background: '#1687D9' }} />
          <div
            style={{
              color: 'white',
              fontSize: title.length > 60 ? 36 : 44,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
              Technical BIM Integration
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['ISO 19650', 'CDE', 'BIM'].map((t) => (
              <div key={t} style={{ padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'monospace' }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}