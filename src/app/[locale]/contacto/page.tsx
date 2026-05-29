import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { routing } from '@/i18n/routing'
import { generateMetadata as genMeta, getContactMetadata } from '@/lib/seo'
import { getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema'
import type { Locale } from '@/types'
import { Mail, Linkedin, CheckCircle2, Instagram, Facebook, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

import SiteLayout from '@/components/layout/SiteLayout'
import SchemaOrg from '@/components/shared/SchemaOrg'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal'
import ContactForm from '@/components/shared/ContactForm'

import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

type Messages = typeof esMessages
function getMsg(locale: string): Messages {
  return locale === 'en' ? (enMessages as unknown as Messages) : esMessages
}

function WhatsAppIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return genMeta(getContactMetadata(locale as Locale), locale as Locale)
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const m        = getMsg(locale)
  const ct       = m.contact
  const isEs     = locale === 'es'
  const basePath = isEs ? `/${locale}/contacto` : `/${locale}/contact`

  const info      = ct.info
  const diagItems = ct.diagnosis.items as unknown as string[]

  const schemas = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: m.common.breadcrumb.home, url: `/${locale}/` },
      { name: ct.hero.label,            url: basePath },
    ]),
  ]

  const directLinks = [
    { href: `mailto:${info.email}`,  icon: <Mail size={16} strokeWidth={1.5} className="text-brand-800" />, label: isEs ? 'Correo' : 'Email', value: info.email, external: false },
    { href: info.whatsappUrl,        icon: <WhatsAppIcon size={16} className="text-brand-800" />,           label: 'WhatsApp', value: info.phone, external: true },
    { href: info.linkedinUrl,        icon: <Linkedin size={16} strokeWidth={1.5} className="text-brand-800" />, label: 'LinkedIn', value: info.linkedin, external: true },
    { href: info.instagramUrl,       icon: <Instagram size={16} strokeWidth={1.5} className="text-brand-800" />, label: 'Instagram', value: '@sora.techbim', external: true },
    { href: info.facebookUrl,        icon: <Facebook size={16} strokeWidth={1.5} className="text-brand-800" />,  label: 'Facebook', value: 'sora.techbim', external: true },
  ]

  return (
    <>
      <SchemaOrg schema={schemas} />
      <SiteLayout showFloatingCTA={false}>
        <section className="bg-brand-800 pt-32 pb-16">
          <div className="container-section">
            <SectionLabel dark>{ct.hero.label}</SectionLabel>
            <h1 className="font-display font-bold text-white leading-[1.1] tracking-[-0.025em] mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {ct.hero.headline}
            </h1>
            <p className="font-sans text-lg text-white/65 leading-relaxed">{ct.hero.subheadline}</p>
          </div>
        </section>

        <section className="bg-neutral-50 section-py">
          <div className="container-section">
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
              <div>
                <ScrollReveal delay={0}>
                  <div className="bg-white rounded-2xl p-8 border border-neutral-200 mb-6">
                    <h2 className="font-display font-bold text-neutral-900 text-xl mb-6">{ct.diagnosis.headline}</h2>
                    <ul className="space-y-4" role="list">
                      {diagItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={18} strokeWidth={1.5} className="text-success-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="font-sans text-sm text-neutral-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <div className="space-y-2.5">
                    {directLinks.map((link) => (
                      <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}
                        className={cn('group flex items-center gap-3.5 p-4 rounded-xl bg-white border border-neutral-200 hover:border-brand-300 hover:shadow-sm transition-all duration-200 focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]')}>
                        <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">{link.icon}</div>
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase text-neutral-400 mb-0.5">{link.label}</p>
                          <p className="font-sans text-sm text-neutral-800 group-hover:text-brand-500 transition-colors duration-150 truncate">{link.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={180}>
                  <div className="flex items-center gap-2.5 mt-4 px-1">
                    <MapPin size={14} className="text-neutral-400 flex-shrink-0" aria-hidden="true" />
                    <span className="font-sans text-sm text-neutral-500">{info.location}</span>
                  </div>
                </ScrollReveal>
              </div>
              <div>
                <ScrollReveal delay={80}>
                  <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
                    <ContactForm />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
