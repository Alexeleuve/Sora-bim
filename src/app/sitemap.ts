import type { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/lib/content'
import { getBaseUrl } from '@/lib/utils'
import type { Locale } from '@/types'

const BASE_URL = getBaseUrl()

// Blog categories — ES and EN paths per routing.ts pathnames
const BLOG_CATEGORIES = [
  'bim', 'iso-19650', 'cde', 'sistemas-especiales', 'data-centers',
  'hospitales', 'industria', 'coordinacion-bim', 'ia-aplicada-bim', 'transformacion-digital',
]

const CATEGORY_PRIORITIES: Record<string, number> = {
  'bim': 0.65, 'iso-19650': 0.65, 'cde': 0.65, 'sistemas-especiales': 0.65,
  'data-centers': 0.65, 'hospitales': 0.65, 'industria': 0.65, 'coordinacion-bim': 0.65,
  'ia-aplicada-bim': 0.60, 'transformacion-digital': 0.60,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const NOW = new Date().toISOString()
  const freq = (f: MetadataRoute.Sitemap[number]['changeFrequency']) => f

  const staticRoutes: MetadataRoute.Sitemap = [
    // ── Home ──────────────────────────────────────────────────────
    { url: `${BASE_URL}/es`,  lastModified: NOW, changeFrequency: freq('weekly'),  priority: 1.0 },
    { url: `${BASE_URL}/en`,  lastModified: NOW, changeFrequency: freq('weekly'),  priority: 1.0 },

    // ── Services ──────────────────────────────────────────────────
    { url: `${BASE_URL}/es/servicios`,                       lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.90 },
    { url: `${BASE_URL}/es/servicios/integracion-bim`,       lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/coordinacion-bim`,      lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/sistemas-especiales`,   lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/sistemas-electricos`,   lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/gestion-informacion`,   lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/bim-4d`,                lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/es/servicios/bim-5d`,                lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },

    { url: `${BASE_URL}/en/services`,                        lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.90 },
    { url: `${BASE_URL}/en/services/bim-integration`,        lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/en/services/bim-coordination`,       lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/en/services/special-systems`,        lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/en/services/electrical-systems`,     lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/en/services/information-management`, lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/en/services/bim-4d`,                 lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/en/services/bim-5d`,                 lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },

    // ── Sectors ───────────────────────────────────────────────────
    { url: `${BASE_URL}/es/sectores`,                        lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/es/sectores/industrial`,             lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/es/sectores/data-centers`,           lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/es/sectores/hospitales`,             lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/es/sectores/comercial`,              lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },
    { url: `${BASE_URL}/es/sectores/infraestructura`,        lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },

    { url: `${BASE_URL}/en/sectors`,                         lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/en/sectors/industrial`,              lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/en/sectors/data-centers`,            lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/en/sectors/hospitals`,               lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.80 },
    { url: `${BASE_URL}/en/sectors/commercial`,              lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },
    { url: `${BASE_URL}/en/sectors/infrastructure`,          lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },

    // ── SORA OS ───────────────────────────────────────────────────
    { url: `${BASE_URL}/es/sora-os`, lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.90 },
    { url: `${BASE_URL}/en/sora-os`, lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.90 },

    // ── Blog index ────────────────────────────────────────────────
    { url: `${BASE_URL}/es/blog`, lastModified: NOW, changeFrequency: freq('weekly'), priority: 0.80 },
    { url: `${BASE_URL}/en/blog`, lastModified: NOW, changeFrequency: freq('weekly'), priority: 0.80 },

    // ── Blog categories — ES ('/blog/categoria/') and EN ('/blog/category/')
    // Paths match routing.ts pathnames['/blog/categoria/[category]']
    ...BLOG_CATEGORIES.map((cat) => ({
      url:             `${BASE_URL}/es/blog/categoria/${cat}`,
      lastModified:    NOW,
      changeFrequency: freq('weekly'),
      priority:        CATEGORY_PRIORITIES[cat] ?? 0.60,
    })),
    ...BLOG_CATEGORIES.map((cat) => ({
      url:             `${BASE_URL}/en/blog/category/${cat}`,
      lastModified:    NOW,
      changeFrequency: freq('weekly'),
      priority:        CATEGORY_PRIORITIES[cat] ?? 0.60,
    })),

    // ── About / Nosotros ──────────────────────────────────────────
    { url: `${BASE_URL}/es/nosotros`,     lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },
    { url: `${BASE_URL}/en/about`,        lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },

    // ── Contact / Contacto ────────────────────────────────────────
    { url: `${BASE_URL}/es/contacto`,     lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },
    { url: `${BASE_URL}/en/contact`,      lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.85 },

    // ── Case Studies / Casos de éxito ─────────────────────────────
    { url: `${BASE_URL}/es/casos-de-exito`, lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },
    { url: `${BASE_URL}/en/case-studies`,   lastModified: NOW, changeFrequency: freq('monthly'), priority: 0.75 },
  ]

  // Dynamic blog posts — read from MDX content at build/request time
  const blogPages: MetadataRoute.Sitemap = []
  for (const locale of ['es', 'en'] as Locale[]) {
    try {
      const slugs = await getAllBlogSlugs(locale)
      slugs.forEach((slug) => {
        blogPages.push({
          url:             `${BASE_URL}/${locale}/blog/${slug}`,
          lastModified:    NOW,
          changeFrequency: freq('monthly'),
          priority:        0.70,
        })
      })
    } catch { /* no blog content yet */ }
  }

  return [...staticRoutes, ...blogPages]
}
