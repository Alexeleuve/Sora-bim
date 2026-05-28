# SORA | Technical BIM Integration
## SEO Implementation — Verificación Completa

---

## 1. METADATA API (Next.js 15)

### Implementación por página

| Página | Title | Description | OG Image | hreflang | Canonical |
|--------|-------|-------------|----------|----------|-----------|
| Home ES | ✅ Keyword-rich | ✅ 155 chars | ✅ Dynamic | ✅ es/en/x-default | ✅ |
| Home EN | ✅ Keyword-rich | ✅ 155 chars | ✅ Dynamic | ✅ | ✅ |
| Servicios | ✅ | ✅ | ✅ | ✅ | ✅ |
| Servicio detalle (×6) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sectores | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sector detalle (×5) | ✅ | ✅ | ✅ | ✅ | ✅ |
| SORA OS | ✅ | ✅ | ✅ | ✅ | ✅ |
| Blog index | ✅ | ✅ | ✅ | ✅ | ✅ |
| Blog artículo | ✅ Post title | ✅ Excerpt | ✅ Cover image | — | ✅ |
| Blog categoría (×10) | ✅ | ✅ | ✅ | — | ✅ |
| Nosotros | ✅ | ✅ | ✅ | ✅ | ✅ |
| Contacto | ✅ | ✅ | ✅ | ✅ | ✅ |
| Casos de Éxito | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 2. OPEN GRAPH

### Configuración global
```
og:type         → website (páginas) / article (blog posts)
og:site_name    → SORA | Technical BIM Integration
og:locale       → es_MX (ES) / en_US (EN)
og:image        → 1200×630, /images/og-default.jpg (fallback)
og:image:type   → image/jpeg
```

### Open Graph Images dinámicas
- `/[locale]/opengraph-image.tsx` → OG personalizada para Home
- `/[locale]/blog/[slug]/opengraph-image.tsx` → OG dinámica por artículo
- Ambas generadas con `ImageResponse` (Next.js Edge Runtime)
- Sin dependencias externas de imagen

---

## 3. TWITTER CARDS

```
twitter:card         → summary_large_image
twitter:site         → @sorabim
twitter:creator      → @sorabim
twitter:image        → Misma imagen que OG
```

---

## 4. HREFLANG

Implementado en todas las páginas con rutas alternativas ES/EN:

```html
<link rel="alternate" hreflang="es" href="https://sorafusion.com/es/..." />
<link rel="alternate" hreflang="en" href="https://sosorafusion.com/en/..." />
<link rel="alternate" hreflang="x-default" href="https://sorafusion.com/es/..." />
```

### Mapeo de slugs ES ↔ EN
```
/es/servicios/          ↔  /en/services/
/es/servicios/integracion-bim/  ↔  /en/services/bim-integration/
/es/sectores/           ↔  /en/sectors/
/es/nosotros/           ↔  /en/about/
/es/contacto/           ↔  /en/contact/
/es/casos-de-exito/     ↔  /en/case-studies/
```

---

## 5. SCHEMA.ORG (JSON-LD)

### Schemas implementados

| Schema | Páginas | Propiedades clave |
|--------|---------|-------------------|
| `Organization` | Todas (global) | name, url, logo, address, contactPoint, sameAs, knowsAbout, areaServed |
| `WebSite` | Todas (global) | url, name, SearchAction, inLanguage |
| `ProfessionalService` | Home | address, geo, openingHours, hasOfferCatalog |
| `Service` | Servicios (×6) | name, description, provider, serviceType, areaServed |
| `Article` | Blog posts | headline, datePublished, author, publisher, image |
| `BreadcrumbList` | Páginas internas | position, name, item |
| `FAQPage` | Disponible (getFAQSchema) | question, acceptedAnswer |
| `SoftwareApplication` | SORA OS | name, featureList, author |

---

## 6. CANONICALS

Regla: `https://sorafusion.com/[locale]/[path]/` (con trailing slash)

Implementado en `alternates.canonical` de cada `generateMetadata()`.

---

## 7. SITEMAP.XML

**Ruta:** `https://sorafusion.com/sitemap.xml`
**Generado:** Dinámicamente por `src/app/sitemap.ts`

Total de URLs indexadas: **~70 URLs estáticas + blog posts dinámicos**

Prioridades:
```
1.0  → Home (ES + EN)
0.9  → Services index, SORA OS
0.85 → Service detail pages, Sectors index, Contact
0.80 → Sector detail, Blog index
0.75 → About, Case Studies
0.70 → Blog posts
0.65 → Blog categories
0.60 → Blog categories (menor volumen)
```

---

## 8. ROBOTS.TXT

**Ruta:** `https://sorafusion.com/robots.txt`
**Generado:** `src/app/robots.ts`

```
User-agent: *        → Allow /, Disallow /api/ /_next/ /static/
User-agent: GPTBot   → Disallow / (bloquea scraping de OpenAI)
User-agent: CCBot    → Disallow / (bloquea Common Crawl/Anthropic training)
Sitemap: https://sorafusion.com/sitemap.xml
```

---

## 9. CORE WEB VITALS — Optimizaciones implementadas

### LCP (Largest Contentful Paint)
- Hero image: `loading="eager"` + `priority={true}` en Next/Image
- Fuentes: `next/font` con `display: swap` → sin FOUT
- OG images: Edge Runtime para generación rápida

### CLS (Cumulative Layout Shift)
- Todas las imágenes tienen `width` y `height` definidos
- `aspect-ratio` declarado en contenedores de imagen
- Fuentes cargadas con `next/font` → sin layout shift tipográfico
- Animaciones con `transform` y `opacity` (no layout-affecting)

### FID / INP (Interaction to Next Paint)
- Componentes client-side mínimos (`'use client'` solo donde necesario)
- Framer Motion con `LazyMotion` recomendado para producción
- Heavy components (ContactForm, BlogCategoryFilter) solo en client

---

## 10. KEYWORDS OBJETIVO

### Clúster Principal — Integración BIM
```
integración BIM                  → Home, Servicios
integración BIM México           → Home
BIM Manager México               → Home, Nosotros
coordinación BIM                 → Servicios/coordinacion-bim
empresa integración BIM          → Home, Nosotros
```

### Clúster — ISO 19650
```
ISO 19650 México                 → Servicios/gestion-informacion, Blog
implementación ISO 19650         → Blog/iso-19650
CDE construcción México          → Servicios/gestion-informacion, Blog
gestión información BIM          → Servicios/gestion-informacion
```

### Clúster — Sectores
```
BIM industrial México            → Sectores/industrial
BIM data centers México          → Sectores/data-centers
BIM hospitales México            → Sectores/hospitales
sistemas especiales BIM          → Servicios/sistemas-especiales
BIM MEP México                   → Servicios/coordinacion-bim
BIM BMS                          → Servicios/sistemas-especiales
```

### Clúster — Blog (Long-tail)
```
qué es la integración BIM        → Blog pillar post
ISO 19650 guía práctica México   → Blog pillar post
BIM data centers coordinación    → Blog pillar post
CDE entorno común datos          → Blog pillar post
BIM hospitales sistemas médicos  → Blog pillar post
```
