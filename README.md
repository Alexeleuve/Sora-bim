# SORA | Technical BIM Integration — Sitio Web Corporativo

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · next-intl · MDX

---

## Instalación Rápida

```bash
# 1. Descomprimir el proyecto
unzip sora-proyecto-FINAL.zip
cd sora-bim

# 2. Instalar dependencias
npm install

# 3. Variables de entorno
cp .env.example .env.local
# Editar .env.local con NEXT_PUBLIC_SITE_URL=https://sorafusion.com

# 4. Servidor de desarrollo
npm run dev
# → http://localhost:3000
```

---

## Agregar Imágenes

Colocar en `/public/images/` con estos nombres exactos:

| Archivo | Sección | Dimensiones mínimas |
|---|---|---|
| `hero-facade.jpg` | Hero principal | 1920×1080px |
| `about-structure.jpg` | Quiénes Somos | 800×1000px |
| `methodology-team.jpg` | Metodología | 800×1000px |
| `construction-workers.jpg` | Construcción | 1920×800px |
| `bim-monitor.jpg` | Tecnología BIM | 800×533px |
| `bim-team.jpg` | Tecnología BIM | 800×533px |
| `sora-os-particles.jpg` | SORA OS Hero | 1920×1080px |
| `sora-os-nodes.jpg` | Innovación / SORA OS Flow | 1920×1080px |
| `coverage-city.jpg` | Cobertura | 1920×1080px |
| `og-default.jpg` | Open Graph (redes sociales) | 1200×630px |

---

## Build para Producción (Hostinger)

```bash
# Build estático
npm run build
# Genera /out/ con todos los archivos HTML/CSS/JS estáticos

# Verificar build
ls out/
# Debe contener: es/, en/, _next/, images/, etc.
```

### Subir a Hostinger

1. Acceder a **hPanel → File Manager → public_html/**
2. Subir el contenido de `/out/` (no la carpeta, su contenido)
3. Verificar que `es/index.html` y `en/index.html` existen
4. Probar todas las rutas principales en el navegador

---

## Publicar Artículos en el Blog

Crear un archivo `.mdx` en `content/es/blog/`:

```mdx
---
title: "Título del artículo"
excerpt: "Resumen de 1-2 oraciones que aparece en listados."
category: "bim"
publishedAt: "2025-03-01"
author:
  name: "Equipo SORA"
  role: "Technical BIM Integration"
coverImage: "/images/blog/nombre-imagen.jpg"
tags: ["BIM", "ISO 19650"]
featured: false
---

# Contenido en Markdown

Párrafo de contenido...
```

**Categorías disponibles:** `bim` · `iso-19650` · `cde` · `sistemas-especiales` · `data-centers` · `hospitales` · `industria` · `coordinacion-bim` · `ia-aplicada-bim` · `transformacion-digital`

---

## Modificar Textos

Todos los textos están en:
- `messages/es.json` — Español
- `messages/en.json` — Inglés

**No modificar textos directamente en los componentes.**

---

## Configurar Formulario de Contacto

### Opción A: EmailJS (recomendado para Hostinger compartido)

```bash
npm install @emailjs/browser
```

En `src/components/shared/ContactForm.tsx`, reemplazar el `fetch('/api/contact')` con:

```typescript
import emailjs from '@emailjs/browser'

await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  { name, company, email, projectType, message },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
)
```

### Opción B: API Route (solo para Node.js hosting)

Cambiar `output: 'export'` a `output: 'standalone'` en `next.config.ts` y configurar `RESEND_API_KEY` en `.env.local`.

---

## Estructura del Proyecto

```
sora-bim/
├── content/          ← Artículos MDX del blog
│   ├── es/blog/      ← Español
│   └── en/blog/      ← Inglés
├── messages/         ← Textos de la UI
│   ├── es.json
│   └── en.json
├── public/
│   ├── images/       ← Imágenes del sitio (agregar aquí)
│   └── icons/        ← Favicons
└── src/
    ├── app/          ← Páginas Next.js (App Router)
    ├── components/   ← Componentes React
    ├── hooks/        ← Custom hooks
    ├── lib/          ← Utilidades
    └── styles/       ← CSS global
```

---

## Deploy en Node.js (VPS / Cloud)

```bash
# En next.config.ts cambiar:
output: 'standalone'  # en lugar de 'export'

# Build
npm run build

# Start
npm run start
# → Escucha en puerto 3000

# Con PM2
pm2 start npm --name "sora-bim" -- start
pm2 save
```

---

## Variables de Entorno Requeridas

```env
NEXT_PUBLIC_SITE_URL=https://sorafusion.com
```

Opcionales:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

*SORA | Technical BIM Integration — sorafusion.com*
