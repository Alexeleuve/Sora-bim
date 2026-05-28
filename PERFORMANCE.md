# SORA | Performance Optimization
## Lighthouse Checklist & Core Web Vitals

---

## TARGET SCORES

| Metric | Target | Strategy |
|--------|--------|----------|
| Performance | > 90 | SSG + lazy loading + image optimization |
| Accessibility | > 95 | WCAG AA, ARIA, skip links, focus rings |
| Best Practices | > 95 | HTTPS, no mixed content, secure headers |
| SEO | > 95 | Meta, schema, sitemap, hreflang |

---

## CORE WEB VITALS

### LCP — Largest Contentful Paint (target: < 2.5s)

| Optimization | Status | File |
|---|---|---|
| Hero image: `priority={true}` | ✅ | `HeroSection.tsx` |
| Hero image: `loading="eager"` | ✅ | `HeroSection.tsx` |
| next/font with `display: swap` | ✅ | `layout.tsx` |
| Font preconnect headers | ✅ | `layout.tsx` |
| Static export (no SSR delay) | ✅ | `next.config.ts` |
| Image format: AVIF/WebP | ✅ | `next.config.ts` |
| `fetchpriority="high"` on hero | ✅ | `PreloadLinks.tsx` |

### CLS — Cumulative Layout Shift (target: < 0.1)

| Optimization | Status | File |
|---|---|---|
| All images have width + height | ✅ | All sections |
| `aspect-ratio` on image containers | ✅ | Design System |
| next/font eliminates font CLS | ✅ | `layout.tsx` |
| Animations use transform/opacity only | ✅ | Framer Motion |
| No inserted content above fold | ✅ | Layout |
| Skeleton placeholders for dynamic content | ✅ | `LazySection.tsx` |

### FID/INP — Interaction to Next Paint (target: < 200ms)

| Optimization | Status | File |
|---|---|---|
| Minimal `'use client'` components | ✅ | Architecture |
| LazyMotion for animation bundle splitting | ✅ | `ScrollReveal.tsx`, `Header.tsx` |
| RAF throttled scroll handlers | ✅ | `Header.tsx`, hooks |
| Passive event listeners | ✅ | All scroll handlers |
| `optimizePackageImports` for lucide + framer | ✅ | `next.config.ts` |
| Contact form: no heavy dependencies | ✅ | `ContactForm.tsx` |

---

## PERFORMANCE OPTIMIZATIONS

### JavaScript Bundle

```
✅ Static export → no server JS overhead
✅ Code splitting → automatic per-page
✅ LazyMotion domAnimation (~18KB saved vs full bundle)
✅ optimizePackageImports: lucide-react, framer-motion
✅ Tree shaking via usedExports: true
✅ removeConsole in production
✅ Dynamic imports for heavy blog MDX renderer
```

### Images

```
✅ next/image with unoptimized: true (static hosting)
✅ WebP/AVIF format preference declared
✅ Responsive sizes attribute on every image
✅ loading="lazy" on all below-fold images
✅ loading="eager" + priority on hero (LCP)
✅ object-fit: cover on all images
✅ aspect-ratio declared (prevents CLS)
✅ decoding="async" on lazy images
```

### Fonts

```
✅ next/font/google — zero FOUT, zero CLS
✅ font-display: swap
✅ Subset: latin only (reduces payload)
✅ Preconnect to fonts.googleapis.com + fonts.gstatic.com
✅ Variable fonts not used (consistent weights loaded)
✅ Only 3 fonts: Montserrat, Inter, IBM Plex Mono
```

### CSS

```
✅ Tailwind CSS — JIT, zero unused CSS in production
✅ No @import chains
✅ contain: paint on card components
✅ will-change: transform on animated header
✅ Hardware-accelerated animations (transform, opacity only)
✅ backdrop-filter with GPU layer (transform: translateZ(0))
```

### Caching Strategy

```
/images/*   → max-age=2592000 (30 days) + stale-while-revalidate
/fonts/*    → max-age=31536000 (1 year) + immutable
/icons/*    → max-age=31536000 (1 year) + immutable
/sitemap.xml → max-age=3600 (1 hour)
/robots.txt  → max-age=86400 (1 day)
HTML pages   → Cache-Control managed by CDN/Hostinger
```

---

## ACCESSIBILITY AUDIT

### WCAG AA Compliance

| Category | Implementation |
|---|---|
| Color contrast | All text ≥ 4.5:1 (verified in Design System) |
| Focus indicators | 3px `#38BDF8` outline on all interactive elements |
| Skip link | "Saltar al contenido principal" in layout |
| Alt text | All images have descriptive alt attributes |
| ARIA labels | Buttons, nav, form fields, landmarks |
| Keyboard navigation | Fully navigable without mouse |
| Heading hierarchy | H1→H2→H3 strictly on all pages |
| Form labels | Associated labels on all form inputs |
| Error messages | ARIA `role="alert"` on validation errors |
| Reduced motion | All animations respect `prefers-reduced-motion` |

### Screen Reader Support

```
✅ Semantic HTML (nav, main, section, article, aside, header, footer)
✅ aria-label on icon-only buttons
✅ aria-current="page" on active nav links
✅ aria-expanded on mobile menu button
✅ aria-hidden on decorative elements
✅ Role="list" on ul/ol where CSS list-style is removed
✅ lang attribute on html element
✅ tabIndex={-1} on main for skip link target
```

---

## HOSTINGER DEPLOYMENT CHECKLIST

### Before Building

```bash
# 1. Set production URL
echo "NEXT_PUBLIC_SITE_URL=https://sorafusion.com" > .env.local

# 2. Verify static export config
# next.config.ts: output: 'export', trailingSlash: true

# 3. Build
npm run build
# Output in /out/ directory
```

### After Building

```bash
# Verify /out/ contents:
ls out/
# Should contain: index.html, es/, en/, _next/, images/, etc.

# Check all routes are generated:
find out -name "index.html" | wc -l
# Should be ~30+ HTML files

# Verify no dynamic routes remain
# (All [slug] pages should be pre-rendered)
```

### Hostinger Upload

```
1. Login to Hostinger hPanel
2. File Manager → public_html/
3. Delete existing files (or use subdirectory for staging)
4. Upload contents of /out/ directory
5. Verify .htaccess for clean URLs (if needed)
6. Test all routes manually
```

### Apache .htaccess (if needed for Hostinger)

```apache
# /out/.htaccess or via Hostinger panel
Options -MultiViews
RewriteEngine On

# Handle trailing slash static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ $1/ [R=301,L]

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Cache control
<FilesMatch "\.(jpg|jpeg|png|webp|avif|svg|gif|ico|woff2)$">
  Header set Cache-Control "public, max-age=2592000"
</FilesMatch>

<FilesMatch "\.(css|js)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

---

## IMAGE OPTIMIZATION GUIDE

### Required Images (place in /public/images/)

```
hero-facade.jpg          → 1920×1080px minimum, quality 85+
about-structure.jpg      → 800×1000px (4:5 ratio)
methodology-team.jpg     → 800×1000px (4:5 ratio)
construction-workers.jpg → 1920×800px (wide)
bim-monitor.jpg          → 800×533px (3:2 ratio)
bim-team.jpg             → 800×533px (3:2 ratio)
sora-os-particles.jpg    → 1920×1080px
sora-os-nodes.jpg        → 1920×1080px
coverage-city.jpg        → 1920×1080px
og-default.jpg           → 1200×630px (Open Graph)
```

### Optimization Command (using sharp or squoosh)

```bash
# Using ImageMagick for batch optimization:
for f in public/images/*.jpg; do
  convert "$f" -quality 85 -strip "$f"
done

# Or use Squoosh CLI:
npx @squoosh/cli --webp '{"quality":85}' public/images/*.jpg
```

### Blog Post Images (place in /public/images/blog/)

```
[slug]-cover.jpg → 1200×630px, quality 85
Naming: matches coverImage in MDX frontmatter
```
