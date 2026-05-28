'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Mail, Linkedin, MapPin, Instagram, Facebook } from 'lucide-react'
import { cn } from '@/lib/utils'

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

export default function Footer() {
  const t        = useTranslations('footer')
  const tContact = useTranslations('contact.info')
  const locale   = useLocale()
  const isEs     = locale === 'es'

  const serviceLinks = [
    { label: t('links.bimIntegration'),    href: isEs ? `/${locale}/servicios/integracion-bim`     : `/${locale}/services/bim-integration` },
    { label: t('links.bimCoordination'),   href: isEs ? `/${locale}/servicios/coordinacion-bim`    : `/${locale}/services/bim-coordination` },
    { label: t('links.specialSystems'),    href: isEs ? `/${locale}/servicios/sistemas-especiales` : `/${locale}/services/special-systems` },
    { label: t('links.electricalSystems'), href: isEs ? `/${locale}/servicios/sistemas-electricos` : `/${locale}/services/electrical-systems` },
    { label: t('links.infoManagement'),    href: isEs ? `/${locale}/servicios/gestion-informacion` : `/${locale}/services/information-management` },
    { label: t('links.bim4d'),             href: isEs ? `/${locale}/servicios/bim-4d`              : `/${locale}/services/bim-4d` },
    { label: t('links.bim5d'),             href: isEs ? `/${locale}/servicios/bim-5d`              : `/${locale}/services/bim-5d` },
  ]

  const companyLinks = [
    { label: t('links.about'),       href: isEs ? `/${locale}/nosotros`       : `/${locale}/about` },
    { label: t('links.caseStudies'), href: isEs ? `/${locale}/casos-de-exito` : `/${locale}/case-studies` },
    { label: t('links.blog'),        href: `/${locale}/blog` },
    { label: 'SORA OS',              href: `/${locale}/sora-os` },
    { label: t('links.contact'),     href: isEs ? `/${locale}/contacto`       : `/${locale}/contact` },
  ]

  const linkCls = 'font-sans text-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm'

  // Social icons — left column only
  const socialLinks = [
    { href: t('social.linkedin'),  label: 'LinkedIn',                     icon: <Linkedin size={15} /> },
    { href: t('social.instagram'), label: 'Instagram',                    icon: <Instagram size={15} /> },
    { href: t('social.facebook'),  label: 'Facebook',                     icon: <Facebook size={15} /> },
    { href: t('social.whatsapp'),  label: t('social.whatsappLabel'),      icon: <WhatsAppIcon size={15} /> },
  ]

  return (
    <footer className="bg-neutral-900" role="contentinfo">
      <div className="container-section">

        {/* ─── TOP GRID ───────────────────────────────────── */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-16 border-b border-white/[0.08]">

          {/* Col 1 — Brand + social icons */}
          <div className="xl:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-flex mb-3 group hover:opacity-80 transition-opacity duration-200 focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px] rounded-sm"
              aria-label="SORA | Technical BIM Integration — ir al inicio"
            >
              <img
                src="/images/sora-logo-white.png"
                alt="SORA | Technical BIM Integration"
                className="h-14 w-auto"
                width={280}
                height={56}
              />
            </Link>
            <p className="font-sans font-medium text-[0.625rem] tracking-[0.18em] uppercase text-white/90 mb-6">
              Technical BIM Integration
            </p>
            <p className="font-sans text-sm text-white/55 leading-relaxed mb-3 max-w-[220px]">{t('description')}</p>
            <p className="flex items-center gap-2 font-sans text-xs text-white/35 mb-5">
              <MapPin size={12} aria-hidden="true" />
              {t('location')}
            </p>
            {/* Social icons grouped here */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={cn(
                    'flex items-center justify-center w-9 h-9 rounded-sm',
                    'bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-white/25',
                    'text-white/55 hover:text-white',
                    'transition-all duration-200',
                    'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]'
                  )}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="font-display font-semibold text-[0.6875rem] tracking-[0.08em] uppercase text-white/30 mb-5">{t('services')}</h3>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="font-display font-semibold text-[0.6875rem] tracking-[0.08em] uppercase text-white/30 mb-5">{t('company')}</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact: email · WhatsApp (número) · LinkedIn */}
          <div>
            <h3 className="font-display font-semibold text-[0.6875rem] tracking-[0.08em] uppercase text-white/30 mb-5">{t('contact')}</h3>
            <ul className="space-y-3">
              {/* Email */}
              <li>
                <a
                  href={`mailto:${tContact('email')}`}
                  className={cn(linkCls, 'flex items-center gap-2.5')}
                >
                  <Mail size={13} className="text-white/30 flex-shrink-0" />
                  {tContact('email')}
                </a>
              </li>
              {/* WhatsApp — shows the phone number as label, links to wa.me */}
              <li>
                <a
                  href={tContact('whatsappUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(linkCls, 'flex items-center gap-2.5')}
                >
                  <span className="text-white/30 flex-shrink-0"><WhatsAppIcon size={13} /></span>
                  {tContact('phone')}
                </a>
              </li>
              {/* LinkedIn */}
              <li>
                <a
                  href={tContact('linkedinUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(linkCls, 'flex items-center gap-2.5')}
                >
                  <Linkedin size={13} className="text-white/30 flex-shrink-0" />
                  {tContact('linkedin')}
                </a>
              </li>
            </ul>

            {/* Standards badge */}
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-sm px-3 py-2">
                <span className="font-mono text-[0.6875rem] text-brand-300 tracking-[-0.01em]">ISO 19650</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="font-mono text-[0.6875rem] text-white/40 tracking-[-0.01em]">CDE</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="font-mono text-[0.6875rem] text-white/40 tracking-[-0.01em]">BIM</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM BAR ─────────────────────────────────── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30 text-center sm:text-left">{t('copyright')}</p>
          <div className="flex items-center gap-4">
            <Link
              href={isEs ? `/${locale}/privacidad` : `/${locale}/privacy`}
              className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm"
            >
              {t('privacy')}
            </Link>
            <span className="text-white/20 text-xs">·</span>
            <Link
              href={isEs ? `/${locale}/terminos` : `/${locale}/terms`}
              className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px] rounded-sm"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
