import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      // ─── COLOR SYSTEM ───────────────────────────────────────────
      colors: {
        brand: {
          900: '#01244A',
          800: '#033C77', // PRIMARY — Logo, CTAs, fondos estratégicos
          700: '#054D94',
          600: '#0A63B5',
          500: '#1687D9', // ACTION — Links, CTAs secundarios
          400: '#2EA5F0',
          300: '#38BDF8', // ACCENT — Highlights, decoraciones
          200: '#7DD3FC',
          100: '#BAE6FD',
          50:  '#EAF6FF', // SURFACE — Fondos de sección
        },
        neutral: {
          950: '#020617',
          900: '#0F172A', // DARK BG — Secciones tecnológicas
          800: '#1E293B',
          700: '#334155', // SECONDARY TEXT
          600: '#475569',
          500: '#64748B', // MUTED TEXT
          400: '#94A3B8',
          300: '#CBD5E1', // BORDERS
          200: '#E2E8F0',
          100: '#F1F5F9',
          50:  '#F8FAFC', // MAIN BG
        },
        success: {
          700: '#0D7A42',
          600: '#18A058', // SUCCESS MAIN
          100: '#D1FAE5',
          50:  '#ECFDF5',
        },
        error: {
          600: '#DC2626',
          50:  '#FEF2F2',
        },
        warning: {
          500: '#F59E0B',
          50:  '#FFFBEB',
        },
      },

      // ─── TYPOGRAPHY ─────────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-ibm-plex-mono)', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Caption
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        // Overline
        'overline': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
        // Label / Badge
        'label': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
        // Body Small
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
        // Body
        'base': ['1rem', { lineHeight: '1.625', letterSpacing: '0' }],
        // Body Large
        'lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],
        // H4
        'xl': ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        // H3
        '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        // H2 (fluid via CSS)
        '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        // H1 (fluid via CSS)
        '4xl': ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        // Display (fluid via CSS)
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '7xl': ['4rem', { lineHeight: '1.03', letterSpacing: '-0.03em' }],
      },
      fontWeight: {
        regular:    '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
        black:      '900',
      },

      // ─── SPACING ────────────────────────────────────────────────
      spacing: {
        '4.5':  '1.125rem',
        '5.5':  '1.375rem',
        '13':   '3.25rem',
        '15':   '3.75rem',
        '18':   '4.5rem',
        '22':   '5.5rem',
        '26':   '6.5rem',
        '30':   '7.5rem',
        '34':   '8.5rem',
        '36':   '9rem',
        '68':   '17rem',
        '72':   '18rem',
        '76':   '19rem',
        '84':   '21rem',
        '88':   '22rem',
        '92':   '23rem',
        '96':   '24rem',
        '100':  '25rem',
        '112':  '28rem',
        '128':  '32rem',
      },

      // ─── BORDER RADIUS ──────────────────────────────────────────
      borderRadius: {
        'none': '0',
        'sm':   '0.25rem',  // 4px — Botones, badges
        'DEFAULT': '0.375rem', // 6px — Inputs
        'md':   '0.5rem',   // 8px — Contenedores ícono
        'lg':   '0.75rem',  // 12px — Cards
        'xl':   '1rem',     // 16px — Cards grandes
        '2xl':  '1.25rem',  // 20px
        '3xl':  '1.5rem',   // 24px
        'full': '9999px',   // Pills
      },

      // ─── BOX SHADOWS ────────────────────────────────────────────
      boxShadow: {
        'xs':        '0 1px 2px rgba(15,23,42,0.05)',
        'sm':        '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        'DEFAULT':   '0 4px 6px rgba(15,23,42,0.07), 0 2px 4px rgba(15,23,42,0.05)',
        'md':        '0 4px 6px rgba(15,23,42,0.07), 0 2px 4px rgba(15,23,42,0.05)',
        'lg':        '0 10px 15px rgba(15,23,42,0.08), 0 4px 6px rgba(15,23,42,0.05)',
        'xl':        '0 20px 25px rgba(15,23,42,0.10), 0 8px 10px rgba(15,23,42,0.06)',
        '2xl':       '0 25px 50px rgba(15,23,42,0.12)',
        'brand':     '0 8px 24px rgba(3,60,119,0.14), 0 3px 8px rgba(3,60,119,0.08)',
        'brand-lg':  '0 16px 40px rgba(3,60,119,0.18), 0 6px 12px rgba(3,60,119,0.10)',
        'inset':     'inset 0 1px 2px rgba(15,23,42,0.08)',
        'none':      'none',
      },

      // ─── TRANSITIONS ────────────────────────────────────────────
      transitionDuration: {
        '100':  '100ms',
        '150':  '150ms',
        '200':  '200ms',
        '250':  '250ms',
        '300':  '300ms',
        '400':  '400ms',
        '500':  '500ms',
        '600':  '600ms',
      },
      transitionTimingFunction: {
        'default':  'cubic-bezier(0.4, 0, 0.2, 1)',
        'in':       'cubic-bezier(0.4, 0, 1, 1)',
        'out':      'cubic-bezier(0, 0, 0.2, 1)',
        'spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // ─── ANIMATION ──────────────────────────────────────────────
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
        'ken-burns': {
          '0%':   { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1.00)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        'line-expand': {
          '0%':   { width: '0' },
          '100%': { width: '100%' },
        },
        'counter': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up':    'fade-in-up 500ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'fade-in':       'fade-in 400ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'fade-in-down':  'fade-in-down 300ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'slide-in-right':'slide-in-right 400ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'scale-in':      'scale-in 300ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'bounce-y':      'bounce-y 1500ms ease-in-out infinite',
        'ken-burns':     'ken-burns 5000ms linear forwards',
        'pulse-soft':    'pulse-soft 2000ms ease-in-out infinite',
        'line-expand':   'line-expand 800ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'counter':       'counter 400ms cubic-bezier(0, 0, 0.2, 1) forwards',
      },

      // ─── SCREENS (Breakpoints) ───────────────────────────────────
      screens: {
        'xs':  '480px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1536px',
      },

      // ─── MAX WIDTH ───────────────────────────────────────────────
      maxWidth: {
        'screen-xs':  '480px',
        'screen-sm':  '640px',
        'screen-md':  '768px',
        'screen-lg':  '1024px',
        'screen-xl':  '1280px',
        'screen-2xl': '1536px',
        'content':    '860px',   // Editorial content width
        'section':    '1280px',  // Section max width
      },

      // ─── Z-INDEX ─────────────────────────────────────────────────
      zIndex: {
        '0':   '0',
        '10':  '10',
        '20':  '20',
        '30':  '30',
        '40':  '40',
        '50':  '50',
        '60':  '60',   // Dropdowns
        '70':  '70',   // Mobile nav
        '80':  '80',   // Modals
        '90':  '90',   // Notifications
        '100': '100',  // Header
        'auto': 'auto',
      },

      // ─── ASPECT RATIOS ───────────────────────────────────────────
      aspectRatio: {
        'auto':     'auto',
        'square':   '1 / 1',
        'video':    '16 / 9',
        'portrait': '4 / 5',
        'hero':     '21 / 9',
        'card':     '3 / 2',
      },

      // ─── GRID TEMPLATE COLUMNS ───────────────────────────────────
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        'sidebar': '1fr 320px',
        'sidebar-lg': '1fr 380px',
        'split-5-7': '5fr 7fr',
        'split-7-5': '7fr 5fr',
      },

      // ─── TYPOGRAPHY PLUGIN ───────────────────────────────────────
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body':        '#334155',
            '--tw-prose-headings':    '#0F172A',
            '--tw-prose-links':       '#1687D9',
            '--tw-prose-bold':        '#0F172A',
            '--tw-prose-code':        '#033C77',
            '--tw-prose-pre-bg':      '#0F172A',
            '--tw-prose-pre-code':    '#38BDF8',
            maxWidth: 'none',
            fontFamily: 'var(--font-inter)',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-montserrat)',
              fontWeight: '700',
            },
            code: {
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '0.875em',
              backgroundColor: '#EAF6FF',
              padding: '2px 6px',
              borderRadius: '4px',
              color: '#033C77',
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config
