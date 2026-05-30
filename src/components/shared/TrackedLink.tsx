'use client'

import { trackWhatsAppClick, trackEmailClick } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface TrackedLinkProps {
  href:      string
  type:      'whatsapp' | 'email'
  location:  string
  children:  React.ReactNode
  className?: string
  external?: boolean
}

/**
 * Thin client wrapper for server-rendered pages that need to track
 * whatsapp_click or email_click events on specific links.
 * Used by the contact page (Server Component) to avoid making the whole page a client component.
 */
export default function TrackedLink({ href, type, location, children, className, external }: TrackedLinkProps) {
  const handleClick = () => {
    if (type === 'whatsapp') trackWhatsAppClick({ location, href })
    if (type === 'email')    trackEmailClick({ location, href })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </a>
  )
}
