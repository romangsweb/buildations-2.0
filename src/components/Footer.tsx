import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.wordmark}>Buildations</span>
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
            <p className={styles.navLabel}>Stack</p>
            <span className={styles.stackItem}>Ollama · Local LLMs</span>
            <span className={styles.stackItem}>Qdrant · Vector store</span>
            <span className={styles.stackItem}>PostgreSQL · Data layer</span>
            <span className={styles.stackItem}>n8n · Orchestration</span>
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
