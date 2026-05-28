'use client'

// SEO Audit Component — Development only
// Add to any page temporarily to audit SEO implementation
// Usage: import SEOAudit from '@/components/shared/SEOAudit'
//        <SEOAudit /> (inside a page, dev only)

import { useEffect, useState } from 'react'

interface SEOCheck {
  name:   string
  status: 'pass' | 'fail' | 'warn'
  value:  string
}

export default function SEOAudit() {
  const [checks, setChecks] = useState<SEOCheck[]>([])
  const [open, setOpen]     = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const results: SEOCheck[] = []

    // Title
    const title = document.title
    results.push({
      name: 'Title',
      status: title && title.length >= 30 && title.length <= 70 ? 'pass' : title ? 'warn' : 'fail',
      value: title ? `"${title}" (${title.length} chars)` : 'MISSING',
    })

    // Meta description
    const desc = (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content
    results.push({
      name: 'Meta Description',
      status: desc && desc.length >= 100 && desc.length <= 160 ? 'pass' : desc ? 'warn' : 'fail',
      value: desc ? `${desc.length} chars` : 'MISSING',
    })

    // Canonical
    const canonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href
    results.push({
      name: 'Canonical',
      status: canonical ? 'pass' : 'fail',
      value: canonical || 'MISSING',
    })

    // hreflang
    const hreflang = document.querySelectorAll('link[hreflang]')
    results.push({
      name: 'hreflang',
      status: hreflang.length >= 2 ? 'pass' : 'warn',
      value: `${hreflang.length} tags found`,
    })

    // OG title
    const ogTitle = (document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.content
    results.push({ name: 'OG Title', status: ogTitle ? 'pass' : 'warn', value: ogTitle || 'MISSING' })

    // OG image
    const ogImage = (document.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content
    results.push({ name: 'OG Image', status: ogImage ? 'pass' : 'warn', value: ogImage || 'MISSING' })

    // H1
    const h1s = document.querySelectorAll('h1')
    results.push({
      name: 'H1',
      status: h1s.length === 1 ? 'pass' : h1s.length === 0 ? 'fail' : 'warn',
      value: `${h1s.length} H1 tag(s) — "${h1s[0]?.textContent?.slice(0, 40)}"`,
    })

    // JSON-LD
    const jsonLd = document.querySelectorAll('script[type="application/ld+json"]')
    results.push({ name: 'Schema.org', status: jsonLd.length > 0 ? 'pass' : 'warn', value: `${jsonLd.length} JSON-LD block(s)` })

    // Robots
    const robots = (document.querySelector('meta[name="robots"]') as HTMLMetaElement)?.content
    results.push({ name: 'Robots', status: robots && robots.includes('noindex') ? 'warn' : 'pass', value: robots || 'default (index, follow)' })

    // Images alt
    const imgs = document.querySelectorAll('img')
    const missingAlt = Array.from(imgs).filter((img) => !img.alt).length
    results.push({
      name: 'Images Alt',
      status: missingAlt === 0 ? 'pass' : 'warn',
      value: `${imgs.length} images, ${missingAlt} missing alt`,
    })

    setChecks(results)
  }, [])

  if (process.env.NODE_ENV !== 'development') return null
  if (checks.length === 0) return null

  const pass  = checks.filter((c) => c.status === 'pass').length
  const warns = checks.filter((c) => c.status === 'warn').length
  const fails = checks.filter((c) => c.status === 'fail').length

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: fails > 0 ? '#DC2626' : warns > 0 ? '#F59E0B' : '#18A058',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        SEO {pass}/{checks.length} {fails > 0 ? `❌${fails}` : ''}{warns > 0 ? `⚠️${warns}` : ''}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: 8,
            background: '#0F172A',
            border: '1px solid #334155',
            borderRadius: 8,
            padding: 12,
            width: 400,
            maxHeight: 400,
            overflowY: 'auto',
          }}
        >
          <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            SEO AUDIT — {window.location.pathname}
          </p>
          {checks.map((check) => (
            <div
              key={check.name}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '4px 0',
                borderBottom: '1px solid #1E293B',
              }}
            >
              <span style={{ color: check.status === 'pass' ? '#18A058' : check.status === 'warn' ? '#F59E0B' : '#DC2626', flexShrink: 0 }}>
                {check.status === 'pass' ? '✓' : check.status === 'warn' ? '⚠' : '✗'}
              </span>
              <div>
                <span style={{ color: '#CBD5E1', fontWeight: 700 }}>{check.name}: </span>
                <span style={{ color: '#64748B', fontSize: 11 }}>{check.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
