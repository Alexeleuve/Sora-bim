import { getOrganizationSchema, getWebsiteSchema, getLocalBusinessSchema } from '@/lib/schema'

/**
 * GlobalSchemas — injects Organization, WebSite and LocalBusiness schema.org
 * on every page. Include in the root layout or SiteLayout.
 * These are the foundational schemas that Google uses for
 * Knowledge Panel and Sitelinks.
 */
export default function GlobalSchemas() {
  const schemas = [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getLocalBusinessSchema(),
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
