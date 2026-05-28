/**
 * PreloadLinks
 * Injects <link rel="preload"> tags for critical above-fold assets.
 * Place in the layout or page component to preload LCP images.
 *
 * Critical images to preload:
 * - Hero background (hero-facade.jpg) → LCP element
 * - Logo SVG (if any)
 *
 * NOTE: Only preload the FIRST visible image. Preloading too many
 * assets defeats the purpose and can delay the LCP image.
 */
interface PreloadLinksProps {
  /**
   * Absolute path to the hero/LCP image (e.g. '/images/hero-facade.jpg')
   */
  heroImage?: string
}

export default function PreloadLinks({ heroImage }: PreloadLinksProps) {
  if (!heroImage) return null

  return (
    <>
      {/* Preload LCP hero image — prevents render-blocking */}
      <link
        rel="preload"
        as="image"
        href={heroImage}
        // imagesizes and imagesrcset for responsive preload
        // (matches the sizes attribute used in OptimizedImage / next/image)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — fetchpriority is not in React types yet
        fetchpriority="high"
      />
    </>
  )
}
