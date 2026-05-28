import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SORA | Technical BIM Integration',
  description: 'Integración BIM de Sistemas Especiales para proyectos de alta complejidad.',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children
}
