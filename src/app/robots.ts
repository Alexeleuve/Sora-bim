import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = getBaseUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/_next/', '/static/'],
      },
      {
        userAgent: 'GPTBot',
        disallow:  ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow:  ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host:    BASE_URL,
  }
}
