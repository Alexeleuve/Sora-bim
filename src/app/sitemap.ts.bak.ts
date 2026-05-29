import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

const BASE_URL = getBaseUrl()
const NOW = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Home ──────────────────────────────────────────────────────
    { url: `${BASE_URL}/es/`,  lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/en/`,  lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },

    // ── Services ES ───────────────────────────────────────────────
    { url: `${BASE_URL}/es/servicios/`,                       lastModified: NOW, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE_URL}/es/servicios/integracion-bim/`,       lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/coordinacion-bim/`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/sistemas-especiales/`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/sistemas-electricos/`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/gestion-informacion/`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/es/servicios/bim-4d/`,                lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/es/servicios/bim-5d/`,                lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },

    // ── Services EN ───────────────────────────────────────────────
    { url: `${BASE_URL}/en/services/`,                        lastModified: NOW, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE_URL}/en/services/bim-integration/`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/services/bim-coordination/`,       lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/services/special-systems/`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/services/electrical-systems/`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/services/information-management/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/services/bim-4d/`,                 lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/en/services/bim-5d/`,                 lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },

    // ── Sectors ES ────────────────────────────────────────────────
    { url: `${BASE_URL}/es/sectores/`,                        lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/es/sectores/industrial/`,             lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/es/sectores/data-centers/`,           lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/es/sectores/hospitales/`,             lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/es/sectores/comercial/`,              lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/es/sectores/infraestructura/`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },

    // ── Sectors EN ────────────────────────────────────────────────
    { url: `${BASE_URL}/en/sectors/`,                         lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/sectors/industrial/`,              lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/en/sectors/data-centers/`,            lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/en/sectors/hospitals/`,               lastModified: NOW, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/en/sectors/commercial/`,              lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/en/sectors/infrastructure/`,          lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },

    // ── SORA OS ───────────────────────────────────────────────────
    { url: `${BASE_URL}/es/sora-os/`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE_URL}/en/sora-os/`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.90 },

    // ── Blog index ────────────────────────────────────────────────
    { url: `${BASE_URL}/es/blog/`,     lastModified: NOW, changeFrequency: 'weekly',  priority: 0.80 },
    { url: `${BASE_URL}/en/blog/`,     lastModified: NOW, changeFrequency: 'weekly',  priority: 0.80 },

    // ── Blog categories ES ────────────────────────────────────────
    { url: `${BASE_URL}/es/blog/categoria/bim/`,                    lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/iso-19650/`,              lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/cde/`,                    lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/sistemas-especiales/`,    lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/data-centers/`,           lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/hospitales/`,             lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/industria/`,              lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/coordinacion-bim/`,       lastModified: NOW, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${BASE_URL}/es/blog/categoria/ia-aplicada-bim/`,        lastModified: NOW, changeFrequency: 'weekly', priority: 0.60 },
    { url: `${BASE_URL}/es/blog/categoria/transformacion-digital/`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.60 },

    // ── Blog posts ES ─────────────────────────────────────────────
    { url: `${BASE_URL}/es/blog/que-es-integracion-bim/`,           lastModified: NOW, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${BASE_URL}/es/blog/iso-19650-mexico-guia-practica/`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${BASE_URL}/es/blog/cde-entorno-comun-datos/`,          lastModified: NOW, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${BASE_URL}/es/blog/bim-data-centers-coordinacion/`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${BASE_URL}/es/blog/bim-hospitales-coordinacion-mep/`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.70 },

    // ── About ─────────────────────────────────────────────────────
    { url: `${BASE_URL}/es/nosotros/`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/en/about/`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },

    // ── Contact ───────────────────────────────────────────────────
    { url: `${BASE_URL}/es/contacto/`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/contact/`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },

    // ── Case Studies ──────────────────────────────────────────────
    { url: `${BASE_URL}/es/casos-de-exito/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/en/case-studies/`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
  ]
}
