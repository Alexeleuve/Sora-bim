import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <p className="text-label text-brand-500 mb-4 tracking-widest uppercase">
          404
        </p>
        <h1 className="font-display font-bold text-4xl text-neutral-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-neutral-600 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/es"
          className="btn btn-primary"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
