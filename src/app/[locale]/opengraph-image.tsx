import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/types'

export const runtime = 'edge'
export const alt     = 'SORA | Technical BIM Integration'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string }> }

export default async function OGImage({ params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) notFound()

  const isEs = locale === 'es'

  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'flex-end',
          padding:         '64px',
          background:      'linear-gradient(135deg, #033C77 0%, #0F172A 60%)',
          fontFamily:      'system-ui, sans-serif',
          position:        'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.12) 1px, transparent 1px)',
            backgroundSize:  '36px 36px',
          }}
        />

        {/* Top label */}
        <div
          style={{
            position:      'absolute',
            top:           64,
            left:          64,
            display:       'flex',
            alignItems:    'center',
            gap:           12,
          }}
        >
          <div style={{ width: 24, height: 2, background: '#38BDF8' }} />
          <span style={{ color: '#38BDF8', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Technical BIM Integration
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1 }}>
          {/* SORA logotype */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ color: 'white', fontSize: 96, fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1 }}>
              SORA
            </span>
            <span
              style={{
                fontSize:   32,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #38BDF8, #1687D9)',
                backgroundClip: 'text',
                color:      'transparent',
              }}
            >
              OS
            </span>
          </div>

          {/* Headline */}
          <div style={{ color: 'white', fontSize: 36, fontWeight: 700, lineHeight: 1.2, maxWidth: 700, letterSpacing: '-0.02em' }}>
            {isEs
              ? 'Integración BIM para Sistemas Especiales de Alta Complejidad'
              : 'BIM Integration for High-Complexity Special Systems'}
          </div>

          {/* Statement */}
          <div
            style={{
              display:     'flex',
              alignItems:  'center',
              gap:         12,
              marginTop:   8,
            }}
          >
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)' }} />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {isEs ? 'No modelamos. Integramos.' : "We don't model. We integrate."}
            </span>
          </div>
        </div>

        {/* Bottom badges */}
        <div
          style={{
            position:   'absolute',
            bottom:     64,
            right:      64,
            display:    'flex',
            gap:        8,
          }}
        >
          {['ISO 19650', 'CDE', 'BIM 4D', 'BIM 5D'].map((badge) => (
            <div
              key={badge}
              style={{
                padding:      '6px 12px',
                border:       '1px solid rgba(56,189,248,0.3)',
                borderRadius: 4,
                color:        '#38BDF8',
                fontSize:     12,
                fontFamily:   'monospace',
                letterSpacing: '-0.01em',
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
