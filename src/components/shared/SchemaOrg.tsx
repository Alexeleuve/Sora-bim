interface SchemaOrgProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export default function SchemaOrg({ schema }: SchemaOrgProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s, null, 0) }}
        />
      ))}
    </>
  )
}
