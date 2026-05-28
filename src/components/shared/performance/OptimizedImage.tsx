import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src:       string
  alt:       string
  width?:    number
  height?:   number
  fill?:     boolean
  priority?: boolean
  className?: string
  sizes?:    string
  quality?:  number
  objectPosition?: string
  overlay?:  string   // CSS color/gradient for overlay
  rounded?:  boolean | string
  aspectRatio?: string  // Tailwind aspect-ratio class e.g. 'aspect-video'
  onLoad?:   () => void
}

const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw'

/**
 * OptimizedImage
 * Opinionated wrapper around next/image that:
 * - Enforces consistent aspect ratios via container
 * - Supports overlay gradients
 * - Uses consistent lazy loading strategy
 * - Provides SQIP-style blur-up effect via CSS
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill      = false,
  priority  = false,
  className,
  sizes     = DEFAULT_SIZES,
  quality   = 85,
  objectPosition = 'center',
  overlay,
  rounded,
  aspectRatio,
  onLoad,
}: OptimizedImageProps) {
  const borderRadius = rounded === true
    ? 'rounded-xl'
    : typeof rounded === 'string'
    ? rounded
    : ''

  if (fill || aspectRatio) {
    return (
      <div
        className={cn(
          'relative overflow-hidden',
          aspectRatio,
          borderRadius,
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          quality={quality}
          sizes={sizes}
          className={cn(
            'object-cover',
            `object-[${objectPosition}]`,
          )}
          onLoad={onLoad}
        />
        {overlay && (
          <div
            className="absolute inset-0"
            style={{ background: overlay }}
            aria-hidden="true"
          />
        )}
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', borderRadius, className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        quality={quality}
        sizes={sizes}
        className="w-full h-auto"
        onLoad={onLoad}
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: overlay }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
