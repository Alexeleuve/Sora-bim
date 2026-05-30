import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'SORA | Technical BIM Integration',
  description: 'Integración BIM de Sistemas Especiales para proyectos de alta complejidad.',
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {GA_ID && (
        <>
          {/* Google Analytics 4 — loads after the page is interactive */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      {children}
    </>
  )
}
