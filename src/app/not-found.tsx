import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: '404 — Página no encontrada · Buildations',
}

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Decorative large 404 */}
        <span className={styles.decNumber} aria-hidden="true">404</span>

        <div className={styles.content}>
          <p className={styles.label}>Error 404</p>
          <h1 className={styles.title}>
            Esta página<br />no existe.
          </h1>
          <p className={styles.text}>
            O la movimos, o la eliminamos, o nunca existió.<br />
            Cualquiera de las tres es posible.
          </p>

          <div className={styles.links}>
            <Link href="/" className={styles.primaryLink}>
              Volver al inicio →
            </Link>
            <Link href="/research" className={styles.secondaryLink}>
              Ver Research
            </Link>
            <Link href="/field-notes" className={styles.secondaryLink}>
              Field Notes
            </Link>
            <Link href="/engines" className={styles.secondaryLink}>
              Engines
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
