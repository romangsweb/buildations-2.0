'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Wraps children with a staggered card-reveal scroll animation.
 * Odd cards rotate left, even cards rotate right.
 */
export default function CardReveal({
  children,
  index = 0,
}: {
  children: ReactNode
  index?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Add base class for initial hidden state
    el.classList.add('card-reveal')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${(index % 2) * 0.08}s` }}
    >
      {children}
    </div>
  )
}
