import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // ── DEPLOYMENT ─────────────────────────────────────────────────
  // Static export for Hostinger shared hosting.
  // Change to 'standalone' for Node.js VPS/cloud deployment.
  output: 'export',
  trailingSlash: true,

  // ── PAGE EXTENSIONS ────────────────────────────────────────────
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // ── IMAGES ─────────────────────────────────────────────────────
  // unoptimized: true required for static export (no server-side optimization)
  // For Node.js deployment, set unoptimized: false and add domains
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── COMPILER ───────────────────────────────────────────────────
  compiler: {
    // Remove console.log in production (keep console.error/warn)
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // ── EXPERIMENTAL ───────────────────────────────────────────────
  experimental: {
    mdxRs: true,
    // Tree-shake large packages: only import what's used
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
    ],
  },

  // ── HEADERS ────────────────────────────────────────────────────
  // Security + caching headers
  // NOTE: headers() has no effect with output: 'export'
  // Configure these in your hosting panel (Hostinger / nginx / Apache)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
          { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Long-term caching for static assets
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/icons/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Sitemap + robots — short cache for freshness
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },

  // ── REDIRECTS ──────────────────────────────────────────────────
  // Redirect bare / to /es (handled by middleware, but useful as fallback)
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es',
        permanent: false,
      },
    ]
  },

  // ── WEBPACK OPTIMIZATIONS ──────────────────────────────────────
  webpack: (config, { isServer, dev }) => {
    // Optimize SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // In production client builds, enable aggressive tree shaking
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
      }
    }

    return config
  },
}

export default withNextIntl(
  withMDX(nextConfig)
)
