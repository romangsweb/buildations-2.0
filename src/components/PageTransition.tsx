'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * PageTransition — wraps children with a fade-in on route change
 * Uses View Transitions API when available, falls back to CSS animation
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.animate(
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 350, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' }
    )
  }, [pathname])

  return (
    <div ref={ref} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}
