'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './AnnouncementBar.module.css'

const STORAGE_KEY = 'buildations_bar_dismissed'

const FALLBACK = {
  text: 'Nuevo en Field Notes',
  title: 'La temperatura 0 miente',
  href: '/field-notes/temperatura-cero',
}

interface Props {
  text?: string
  title?: string
  href?: string
}

export default function AnnouncementBar({ text, title, href }: Props) {
  const [visible, setVisible] = useState(false) // start hidden to avoid flash

  useEffect(() => {
    // Only show if not previously dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  useEffect(() => {
    // Tell the rest of the UI whether the bar is showing
    document.documentElement.setAttribute('data-bar', visible ? 'visible' : 'hidden')
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  if (!visible) return null

  const displayText  = text  || FALLBACK.text
  const displayTitle = title || FALLBACK.title
  const displayHref  = href  || FALLBACK.href

  return (
    <div className={styles.bar} role="banner" aria-label="Anuncio reciente">
      <Link href={displayHref} className={styles.content}>
        <span className={styles.badge}>Nuevo</span>
        <span className={styles.sep} aria-hidden="true">—</span>
        <span className={styles.label}>{displayText}:</span>
        <span className={styles.title}>{displayTitle}</span>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </Link>
      <button
        className={styles.close}
        onClick={dismiss}
        aria-label="Cerrar anuncio"
      >
        ✕
      </button>
    </div>
  )
}
