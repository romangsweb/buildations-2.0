'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      const pct  = max > 0 ? scrolled / max : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{
        position: 'fixed',
        left: 0,
        width: '100%',
        height: '3px',
        background: '#F5E642',
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        zIndex: 9999,
        transition: 'transform 0.1s linear',
        /* top is controlled via global CSS */
      }}
    />
  )
}
