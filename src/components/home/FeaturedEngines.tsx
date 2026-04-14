import Link from 'next/link'
import { getEngines } from '@/lib/payload'
import styles from '@/styles/FeaturedEngines.module.css'

const COLOR_MAP: Record<string, string> = {
  yellow: '#F5E642', blue: '#1A3BFF', green: '#2EFF6E',
  red: '#FF2E2E', black: '#0A0A0A',
}
const TEXT_MAP: Record<string, string> = {
  yellow: '#0A0A0A', green: '#0A0A0A', blue: '#fff', red: '#fff', black: '#fff',
}

export default async function FeaturedEngines() {
  const engines = await getEngines()
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.number}>03</span>
        <span className={styles.label}>Engines</span>
        <Link href="/engines" className={styles.viewAll}>View All →</Link>
      </div>
      <div className={styles.grid}>
        {engines.slice(0, 3).map((engine: any) => {
          const bg = COLOR_MAP[engine.color] || '#0A0A0A'
          const color = TEXT_MAP[engine.color] || '#fff'
          const order = String(engine.order || 1).padStart(2, '0')
          return (
            <Link
              key={engine.id}
              href={`/engines/${engine.slug}`}
              className={styles.card}
              style={{ backgroundColor: bg, color }}
            >
              <span className={styles.cardNumber}>{order}</span>
              <h3 className={styles.cardTitle}>{engine.name}</h3>
              <p className={styles.cardTagline}>{engine.tagline}</p>
              <span className={styles.cardCta}>Explore →</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
