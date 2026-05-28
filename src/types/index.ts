// ─── LOCALE ─────────────────────────────────────────────────────────
export type Locale = 'es' | 'en'

// ─── SEO TYPES ──────────────────────────────────────────────────────
export interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  alternates?: {
    es: string
    en: string
  }
}

// ─── CONTENT TYPES ──────────────────────────────────────────────────

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface ServiceItem {
  slug: string
  icon: string
  title: string
  shortDescription: string
  description: string
  benefits: string[]
  useCases: {
    sector: string
    description: string
  }[]
  standards: string[]
  cta: string
}

export interface SectorItem {
  slug: string
  icon: string
  title: string
  tagline: string
  description: string
  systems: string[]
  services: string[]
}

export interface SoraOSPillar {
  icon: string
  title: string
  description: string
}

export interface ValueItem {
  icon: string
  title: string
  description: string
}

export interface CoverageLocation {
  city: string
  role: string
  description: string
}

export interface MethodologyStep {
  number: string
  title: string
  description: string
}

// ─── BLOG TYPES ─────────────────────────────────────────────────────
export type BlogCategory =
  | 'bim'
  | 'iso-19650'
  | 'cde'
  | 'sistemas-especiales'
  | 'data-centers'
  | 'hospitales'
  | 'industria'
  | 'coordinacion-bim'
  | 'ia-aplicada-bim'
  | 'transformacion-digital'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  publishedAt: string
  updatedAt?: string
  readingTime: number
  author: {
    name: string
    role: string
  }
  coverImage?: string
  tags: string[]
  featured?: boolean
}

export interface BlogPostFrontmatter {
  title: string
  excerpt: string
  category: BlogCategory
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    role: string
  }
  coverImage?: string
  tags: string[]
  featured?: boolean
}

// ─── NAVIGATION TYPES ───────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

// ─── COMPONENT PROPS TYPES ──────────────────────────────────────────
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline-light' | 'accent' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

export interface CardProps {
  variant?: 'default' | 'dark' | 'blog'
  hover?: boolean
  className?: string
  children: React.ReactNode
}

export interface BadgeProps {
  variant?: 'service' | 'technical' | 'technical-dark' | 'sector' | 'status'
  className?: string
  children: React.ReactNode
}

export interface SectionLabelProps {
  children: React.ReactNode
  dark?: boolean
  className?: string
}

export interface SectionWrapperProps {
  id?: string
  className?: string
  background?: 'light' | 'dark' | 'white' | 'brand' | 'accent' | 'transparent'
  children: React.ReactNode
  fullWidth?: boolean
  noPadding?: boolean
}

// ─── FORM TYPES ──────────────────────────────────────────────────────
export interface ContactFormData {
  name: string
  company: string
  email: string
  projectType: string
  message: string
}

export interface ContactFormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

// ─── SCHEMA.ORG TYPES ────────────────────────────────────────────────
export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo: string
  description: string
  address: {
    '@type': string
    addressCountry: string
    addressRegion: string
    addressLocality: string
  }
  contactPoint: {
    '@type': string
    contactType: string
    email: string
  }
  sameAs: string[]
}

export interface ServiceSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  provider: {
    '@type': string
    name: string
    url: string
  }
  serviceType: string
  areaServed: string
}

export interface ArticleSchema {
  '@context': string
  '@type': string
  headline: string
  description: string
  datePublished: string
  dateModified: string
  author: {
    '@type': string
    name: string
  }
  publisher: {
    '@type': string
    name: string
    logo: {
      '@type': string
      url: string
    }
  }
  image?: string
  url: string
}
