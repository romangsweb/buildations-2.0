import styles from './Contact.module.css'
import type { Metadata } from 'next'
import HubSpotForm from '@/components/HubSpotForm'

export const metadata: Metadata = {
  title: 'Contact | Buildations',
  description: 'Work with the engines. Get in touch.',
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.label}>Contact</p>
          <h1 className={styles.title}>Work with the engines</h1>
          <p className={styles.sub}>
            Tell us what you are building. We will tell you if we can help.
          </p>
        </div>
      </section>
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formWrap}>
            <HubSpotForm />
          </div>
          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Response time</p>
              <p className={styles.infoValue}>Within 24 hours</p>
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Based in</p>
              <p className={styles.infoValue}>Ciudad de México</p>
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Engines available</p>
              <p className={styles.infoValue}>Revenue Intelligence — Search & Presence — Adaptive Security</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
