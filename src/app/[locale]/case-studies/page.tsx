// EN /case-studies page - mirrors /casos-de-exito with EN locale
export { default, generateMetadata } from '../casos-de-exito/page'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}
