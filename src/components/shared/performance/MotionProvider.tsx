/**
 * MotionProvider
 *
 * Previously wrapped the app with Framer Motion's LazyMotion + domAnimation.
 * Replaced with a simple passthrough — animations are now handled via CSS
 * (animate-fade-in-up, animate-fade-in, etc.) and IntersectionObserver.
 *
 * Kept as a no-op stub so existing imports don't break.
 */

interface MotionProviderProps {
  children: React.ReactNode
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return <>{children}</>
}
