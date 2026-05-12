import styles from './Contact.module.css'
import type { Metadata } from 'next'
import HubSpotForm from '@/components/HubSpotForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | Buildations',
  description: 'Work with the engines. Tell us what you are building.',
  openGraph: {
    title: 'Contact Buildations',
    description: 'Tell us what you are building. We will tell you if we can help.',
    type: 'website',
  },
}

const ENGINES = [
  {
    slug: 'revenue-intelligence',
    color: '#F5E642',
    label: 'Revenue Intelligence',
    description: 'Pricing signals, demand forecasting, and competitive positioning at scale.',
  },
  {
    slug: 'search-presence',
    color: '#1A3BFF',
    label: 'Search & Presence',
    description: 'AI-native SEO architecture. Built to appear in answer engines, not just search results.',
  },
  {
    slug: 'adaptive-security',
    color: '#FF2E2E',
    label: 'Adaptive Security',
    description: 'Threat monitoring, attack surface analysis, and autonomous response without a SOC.',
  },
]

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.label}>Contact</p>
          <h1 className={styles.title}>Work with<br />the engines</h1>
          <p className={styles.sub}>
            Tell us what you are building.<br />
            We will tell you if we can help.
          </p>
        </div>
      </section>

      {/* Engines quick-select */}
      <section className={styles.enginesBar}>
        <div className={styles.enginesContainer}>
          <p className={styles.enginesLabel}>Available engines</p>
          <div className={styles.enginesRow}>
            {ENGINES.map((e) => (
              <Link
                key={e.slug}
                href={`/engines/${e.slug}`}
                className={styles.engineChip}
                style={{ '--chip-color': e.color } as React.CSSProperties}
              >
                <span className={styles.engineChipDot} style={{ background: e.color }} />
                {e.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          {/* Left: Form */}
          <div className={styles.formWrap}>
            <HubSpotForm />
          </div>

          {/* Right: Info sidebar */}
          <aside className={styles.info}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Response time</p>
              <p className={styles.infoValue}>Within 24 hours</p>
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Based in</p>
              <p className={styles.infoValue}>Ciudad de México, México</p>
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Typical engagement</p>
              <p className={styles.infoValue}>Diagnosis → Pilot → Production</p>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>What we need from you</p>
              <ul className={styles.infoList}>
                <li>The problem you are trying to solve</li>
                <li>Your current stack or constraints</li>
                <li>Timeline expectations</li>
              </ul>
            </div>
            <div className={styles.infoDivider} />
            {/* Engine mini-cards */}
            <div className={styles.engineCards}>
              {ENGINES.map((e) => (
                <div key={e.slug} className={styles.engineCard} style={{ '--chip-color': e.color } as React.CSSProperties}>
                  <p className={styles.engineCardLabel} style={{ color: e.color }}>{e.label}</p>
                  <p className={styles.engineCardDesc}>{e.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
