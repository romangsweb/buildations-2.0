'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    let raf: number
    let clicking = false

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top = mouseY + 'px'
      }
    }

    const onEnterInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '64px'
        ringRef.current.style.height = '64px'
        ringRef.current.style.opacity = '0.9'
      }
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const onLeaveInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '24px'
        ringRef.current.style.height = '24px'
        ringRef.current.style.opacity = '1'
      }
      if (dotRef.current) dotRef.current.style.opacity = '1'
    }

    const onEnterText = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '80px'
        ringRef.current.style.height = '80px'
        ringRef.current.style.opacity = '0.6'
      }
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const onMouseDown = () => {
      clicking = true
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(0.75)'
      }
    }

    const onMouseUp = () => {
      clicking = false
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      }
    }

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
      document.querySelectorAll('p, h1, h2, h3, h4, span').forEach(el => {
        el.addEventListener('mouseenter', onEnterText)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }

    const loop = () => {
      curX += (mouseX - curX) * 0.12
      curY += (mouseY - curY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = curX + 'px'
        ringRef.current.style.top = curY + 'px'
      }
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    attachListeners()
    raf = requestAnimationFrame(loop)

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { subtree: true, childList: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  const shared: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 99999,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
  }

  return (
    <>
      <div
        ref={ringRef}
        style={{
          ...shared,
          width: 24,
          height: 24,
          background: '#ffffff',
          mixBlendMode: 'difference',
          transition: 'width 0.3s cubic-bezier(0.19,1,0.22,1), height 0.3s cubic-bezier(0.19,1,0.22,1), transform 0.15s ease, opacity 0.3s ease',
        }}
      />
      <div
        ref={dotRef}
        style={{
          ...shared,
          width: 4,
          height: 4,
          background: '#ffffff',
          mixBlendMode: 'difference',
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  )
}
