import Link from 'next/link'
import { getEngines } from '@/lib/payload'
import styles from './Engines.module.css'

export default async function EnginesPage() {
  const engines = await getEngines()

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Engines</h1>
      </div>
      <div className={styles.list}>
        {engines.map((engine: any) => (
          <Link key={engine.slug} href={`/engines/${engine.slug}`} className={styles.item} style={{ backgroundColor: engine.color === 'yellow' ? '#F5E642' : engine.color === 'blue' ? '#1A3BFF' : engine.color === 'green' ? '#2EFF6E' : engine.color === 'red' ? '#FF2E2E' : '#0A0A0A' }}>
            <span className={styles.number}>{String(engine.order || 1).padStart(2, '0')}</span>
            <div className={styles.info}>
              <h2 className={styles.name}>{engine.name}</h2>
              <p className={styles.tagline}>{engine.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
