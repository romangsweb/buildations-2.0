import type { Metadata } from 'next'
import styles from './Playground.module.css'
import PlaygroundClient from './PlaygroundClient'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Playground — Engine Demos en Vivo',
  description: 'Herramientas interactivas de IA: scoring de deals, análisis de keywords y threat intelligence. Prueba los engines de Buildations con tus propios datos.',
  openGraph: {
    title: 'Playground — Buildations',
    description: 'Prueba los engines de Buildations con tus propios datos. Deal scoring, content analysis y threat intelligence en vivo.',
    type: 'website',
  },
}

export default function PlaygroundPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <span className={styles.glyphWrap} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                <path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
            <p className={styles.label}>Interactive Tools</p>
          </div>
          <h1 className={styles.title}>Playground</h1>
          <p className={styles.subtitle}>
            Prueba los engines con tus propios datos. Sin registro, sin límites.
            Scoring de deals, análisis de keywords y threat intelligence — en vivo.
          </p>
          <p className={styles.count}>3 herramientas disponibles</p>
        </div>
      </div>

      <PlaygroundClient />

      {/* CTA */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaText}>
            ¿Quieres estos engines<br />trabajando para ti?
          </p>
          <Link href="/contact" className={styles.ctaBtn}>
            Start a project →
          </Link>
        </div>
      </div>
    </div>
  )
}
