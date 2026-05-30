/**
 * analytics.ts — GA4 event tracking utility
 *
 * Safe to call in any context:
 * - SSR: window doesn't exist → no-op
 * - Client before GA4 loads: window.gtag doesn't exist → no-op
 * - Client after GA4 loads: fires the event normally
 */

// Declare gtag on window so TypeScript doesn't complain
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      eventNameOrDate: string | Date,
      params?: Record<string, string | number | boolean | null | undefined>
    ) => void
    dataLayer?: unknown[]
  }
}

type EventParams = Record<string, string | number | boolean | null | undefined>

/**
 * Track a GA4 custom event.
 * Safe to call on server (no-op) and before GA4 loads (no-op).
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', eventName, {
    page_path: window.location.pathname,
    ...params,
  })
}

// ── Typed event helpers ──────────────────────────────────────────────────────

export function trackDiagnosticClick(params: {
  cta_label:    string
  cta_location: string
  href:         string
}) {
  trackEvent('diagnostic_request_click', {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  })
}

export function trackWhatsAppClick(params: {
  location: string
  href:     string
}) {
  trackEvent('whatsapp_click', {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  })
}

export function trackEmailClick(params: {
  location: string
  href:     string
}) {
  trackEvent('email_click', {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  })
}

export function trackGenerateLead(params: {
  project_type: string
  locale:       string
}) {
  trackEvent('generate_lead', {
    form_name: 'contact_form',
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  })
}
