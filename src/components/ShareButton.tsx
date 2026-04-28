'use client'

import { useState } from 'react'
import styles from './ShareButton.module.css'

interface Props {
  title: string
  url?: string
}

export default function ShareButton({ title, url }: Props) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl })
      } catch {
        // user cancelled, do nothing
      }
      return
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <button
      className={styles.btn}
      onClick={handleShare}
      aria-label="Compartir esta nota"
      title="Compartir"
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="11" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="11" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M9.5 3.75L4.5 6.25M9.5 10.25L4.5 7.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Compartir
        </>
      )}
    </button>
  )
}
