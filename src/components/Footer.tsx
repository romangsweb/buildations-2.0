import Link from 'next/link'
import styles from '@/styles/Footer.module.css'
import { Logo } from '@/components/Logo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Newsletter strip */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterText}>
            <p className={styles.newsletterLabel}>Research Newsletter</p>
            <p className={styles.newsletterDesc}>
              Nuevos artículos, resultados de engines y decisiones de infraestructura — directamente en tu inbox.
            </p>
          </div>
          <form
            className={styles.newsletterForm}
            action="https://formspree.io/f/buildations"
            method="POST"
          >
            <input
              type="email"
              name="email"
              className={styles.newsletterInput}
              placeholder="Email address"
              required
            />
            <button type="submit" className={styles.newsletterBtn}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Enterprise Trust and Security Strip */}
      <div className={styles.trustBar}>
        <div className={styles.trustInner}>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>Zero Data Retention</span>
            <p className={styles.trustDesc}>
              No entrenamos modelos con tus datos. Inferencia 100% privada sin persistencia de logs.
            </p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>Private VPC Hosting</span>
            <p className={styles.trustDesc}>
              Despliegues aislados en nubes virtuales dedicadas (AWS, GCP, Azure) o bare-metal propio.
            </p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>Compliance Ready</span>
            <p className={styles.trustDesc}>
              Estructura técnica y blueprints de datos diseñados para auditorías SOC 2, HIPAA y GDPR.
            </p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>99.95% Infrastructure SLA</span>
            <p className={styles.trustDesc}>
              Acuerdos institucionales de nivel de servicio para pipelines críticos de producción.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.footerLogo}>
            <Logo isDarkTheme={true} className={styles.footerLogoIcon} />
            <span className={styles.wordmark}>Buildations</span>
          </div>
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
            <Link href="/playground">Playground</Link>
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
