'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let curX   = 0, curY   = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top  = mouseY + 'px'
      }
    }

    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(2)'
        ringRef.current.style.borderColor = 'rgba(232,255,0,0.4)'
      }
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
        ringRef.current.style.borderColor = 'rgba(232,255,0,0.6)'
      }
      if (dotRef.current) dotRef.current.style.opacity = '1'
    }

    const loop = () => {
      curX += (mouseX - curX) * 0.11
      curY += (mouseY - curY) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = curX + 'px'
        ringRef.current.style.top  = curY + 'px'
      }
      raf = requestAnimationFrame(loop)
    }

    const addListeners = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    addListeners()
    raf = requestAnimationFrame(loop)

    // Re-attach on mutations (dynamic content)
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { subtree: true, childList: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  const shared: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 99999,
    transform: 'translate(-50%, -50%)',
  }

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          ...shared,
          width: 30,
          height: 30,
          border: '1px solid rgba(232,255,0,0.6)',
          borderRadius: '50%',
          transition: 'transform 0.35s cubic-bezier(0.19,1,0.22,1), border-color 0.3s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Instant dot */}
      <div
        ref={dotRef}
        style={{
          ...shared,
          width: 4,
          height: 4,
          background: 'var(--accent)',
          borderRadius: '50%',
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  )
}
