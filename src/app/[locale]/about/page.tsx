// EN /about page - mirrors /nosotros with EN locale
// next-intl automatically loads en.json messages
export { default, generateMetadata } from '../nosotros/page'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}
