import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.wordmark}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.wordmarkGlyph}>
              <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
            Buildations
          </span>
          <p className={styles.tagline}>
            AI infrastructure built from the ground up.<br />
            Not rented. Not abstracted. Owned.
          </p>
          <a href="/contact" className={styles.cta}>Work with us →</a>
        </div>

        <div className={styles.nav}>
          <div className={styles.navCol}>
            <p className={styles.navLabel}>Engines</p>
            <Link href="/engines/adaptive-security">Adaptive Security</Link>
            <Link href="/engines/search-presence">Search & Presence</Link>
            <Link href="/engines/revenue-intelligence">Revenue Intelligence</Link>
            <Link href="/engines">All engines</Link>
          </div>
          <div className={styles.navCol}>
            <p className={styles.navLabel}>Site</p>
            <Link href="/research">Research</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.navCol}>
            <p className={styles.navLabel}>Lab</p>
            <Link href="/lexicon">Lexicon</Link>
            <Link href="/stack">Stack</Link>
            <Link href="/field-notes">Field Notes</Link>
            <Link href="/colophon">Colophon</Link>
          </div>
          <div className={styles.navCol}>
            <p className={styles.navLabel}>Stack</p>
            <Link href="/stack#ollama">Ollama · Local LLMs</Link>
            <Link href="/stack#qdrant">Qdrant · Vector store</Link>
            <Link href="/stack#postgresql">PostgreSQL · Data layer</Link>
            <Link href="/stack#n8n">n8n · Orchestration</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>© {year} Buildations</span>
        <span className={styles.location}>Ciudad de México</span>
        <span className={styles.status}>
          <span className={styles.statusDot} />
          All engines live
        </span>
      </div>
    </footer>
  )
}
