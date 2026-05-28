// EN /contact page - mirrors /contacto with EN locale
export { default, generateMetadata } from '../contacto/page'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}
