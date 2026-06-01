type EventParams = Record<
  string,
  string | number | boolean | null | undefined
>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(
  eventName: string,
  params: EventParams = {}
) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', eventName, {
    ...params,
    page_path: window.location.pathname,
  })
}

export function trackDiagnosticClick({
  cta_label,
  cta_location,
  href,
}: {
  cta_label: string
  cta_location: string
  href: string
}) {
  trackEvent('diagnostic_request_click', {
    cta_label,
    cta_location,
    href,
  })
}

export function trackWhatsAppClick({
  location,
  href,
}: {
  location: string
  href: string
}) {
  trackEvent('whatsapp_click', {
    location,
    href,
  })
}

export function trackEmailClick({
  location,
  href,
}: {
  location: string
  href: string
}) {
  trackEvent('email_click', {
    location,
    href,
  })
}

export function trackGenerateLead({
  project_type,
  locale,
}: {
  project_type: string
  locale: string
}) {
  trackEvent('generate_lead', {
    form_name: 'contact_form',
    project_type,
    locale,
  })
}