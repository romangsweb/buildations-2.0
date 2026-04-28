'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * PageTransition — wraps children with a visible fade+slide on route change
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Cancel any running animation first
    el.getAnimations().forEach(a => a.cancel())
    el.animate(
      [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 500,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'both',
      }
    )
  }, [pathname])

  return (
    <div ref={ref} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  )
}
