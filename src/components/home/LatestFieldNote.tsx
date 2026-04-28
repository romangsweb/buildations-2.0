import Link from 'next/link'
import { getFieldNotes } from '@/lib/payload'
import styles from './LatestFieldNote.module.css'
import { IconSignal } from '@/components/Icons'

const FALLBACK = {
  slug: 'temperatura-cero',
  title: 'La temperatura 0 miente',
  excerpt: 'Un modelo en temperatura 0 es determinista pero no honesto. Repite con confianza lo que aprendió, sin señalar los límites de su conocimiento.',
  publishedAt: '2026-04-10T00:00:00Z',
  readTime: '1 min',
}

export default async function LatestFieldNote() {
  let note = FALLBACK
  try {
    const notes = await getFieldNotes(1)
    if (notes.length > 0) note = notes[0]
  } catch {}

  const dateStr = new Date(note.publishedAt).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Label row */}
        <div className={styles.labelRow}>
          <span className={styles.icon} aria-hidden="true">
            <IconSignal size={16} color="currentColor" strokeWidth={1.2} />
          </span>
          <span className={styles.label}>Última nota del laboratorio</span>
          <Link href="/field-notes" className={styles.viewAll}>
            Ver todas →
          </Link>
        </div>

        {/* Note card */}
        <Link href={`/field-notes/${note.slug}`} className={styles.card}>
          <div className={styles.cardMeta}>
            <span>{dateStr}</span>
            {note.readTime && <span>{note.readTime} read</span>}
          </div>
          <h2 className={styles.cardTitle}>{note.title}</h2>
          <p className={styles.cardExcerpt}>{note.excerpt?.substring(0, 160)}…</p>
          <span className={styles.cta}>
            Leer nota
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M4 7h6M8 4.5L10.5 7 8 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </Link>
      </div>
    </section>
  )
}
