'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions {
  threshold?: number | number[]
  rootMargin?: string
  once?: boolean
}

/**
 * useIntersection
 * Lightweight wrapper around IntersectionObserver.
 * Returns a ref to attach to the target element and a boolean indicating visibility.
 *
 * @param options.threshold  - 0–1, fraction of element visible before triggering (default 0.1)
 * @param options.rootMargin - CSS margin around root (default '0px')
 * @param options.once       - disconnect after first intersection (default true)
 */
export function useIntersection<T extends Element = HTMLDivElement>({
  threshold  = 0.1,
  rootMargin = '0px',
  once       = true,
}: UseIntersectionOptions = {}) {
  const ref            = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already visible and once mode, skip
    if (visible && once) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, visible])

  return { ref, visible }
}

/**
 * useImageLazyLoad
 * Returns ref + loaded state for manual lazy image loading.
 * Use when next/image isn't available (e.g. CSS backgrounds).
 */
export function useImageLazyLoad(src: string) {
  const { ref, visible } = useIntersection({ threshold: 0.01, rootMargin: '200px' })
  const [loaded, setLoaded]   = useState(false)
  const [imgSrc, setImgSrc]   = useState<string | null>(null)

  useEffect(() => {
    if (!visible || !src) return
    const img   = new Image()
    img.onload  = () => { setImgSrc(src); setLoaded(true) }
    img.onerror = () => setLoaded(true)
    img.src     = src
  }, [visible, src])

  return { ref, loaded, imgSrc }
}
