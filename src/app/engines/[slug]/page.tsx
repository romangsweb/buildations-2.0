import { notFound } from 'next/navigation'
import { getEngines, getEngineBySlug } from '@/lib/payload'
import styles from './EnginePage.module.css'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const engine = await getEngineBySlug(slug)
  return {
    title: engine ? `${engine.name} | Engine` : 'Engine Not Found',
  }
}

export default async function EnginePage({ params }: Props) {
  const { slug } = await params
  const engine = await getEngineBySlug(slug)
  if (!engine) notFound()

  const colorMap: Record<string, string> = {
    yellow: '#F5E642', blue: '#1A3BFF', green: '#2EFF6E', red: '#FF2E2E'
  }
  const bgColor = colorMap[engine.color] || '#0A0A0A'
  const isDark = bgColor === '#0A0A0A' || bgColor === '#1A3BFF'
  const textColor = isDark ? 'var(--white)' : 'var(--black)'
  const order = String(engine.order || 1).padStart(2, '0')

  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundColor: bgColor, color: textColor }}>
        <div className={styles.container}>
          <p className={styles.label}>Core Engine // {order}</p>
          <h1 className={styles.title}>{engine.name}</h1>
          <p className={styles.abstract}>{engine.tagline}</p>
          {engine.description && (
            <p className={styles.text} style={{ marginTop: '2rem', maxWidth: '640px' }}>
              {engine.description}
            </p>
          )}
        </div>
        <span className={styles.decNumber}>{order}</span>
      </section>
      <section className={styles.capabilities}>
        <div className={styles.containerCenter}>
          <h2 className={styles.subhead}>
            {engine.status === 'live' ? '● Live' : engine.status === 'stable' ? '◎ Stable' : '○ Development'}
          </h2>
          {engine.longDescription && (
            <p className={styles.textCenter}>{engine.longDescription}</p>
          )}
        </div>
      </section>
    </div>
  )
}
