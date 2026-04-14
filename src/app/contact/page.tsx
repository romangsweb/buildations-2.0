import styles from './Contact.module.css'
import type { Metadata } from 'next'

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
            <script src="https://js.hsforms.net/forms/embed/51346021.js" defer></script>
            <div
              className="hs-form-frame"
              data-region="na1"
              data-form-id="0e5436e6-719d-4936-a18f-12af2ce2ed50"
              data-portal-id="51346021"
            />
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
