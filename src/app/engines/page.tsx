import Link from 'next/link'
import { getEngines } from '@/lib/payload'
import styles from './Engines.module.css'

const ENGINE_IMAGES: Record<string, string> = {
  'revenue-intelligence': 'https://cms.buildations.com/api/media/file/engine-1776179832.png',
  'search-presence':      'https://cms.buildations.com/api/media/file/engine-1776180600.png',
  'adaptive-security':    'https://cms.buildations.com/api/media/file/engine-1776180988.png',
}

const COLOR_MAP: Record<string, string> = {
  yellow: '#F5E642',
  blue:   '#1A3BFF',
  green:  '#2EFF6E',
  red:    '#FF2E2E',
  black:  '#0A0A0A',
}

const TEXT_COLOR: Record<string, string> = {
  yellow: '#0A0A0A',
  green:  '#0A0A0A',
  blue:   '#ffffff',
  red:    '#ffffff',
  black:  '#ffffff',
}

export default async function EnginesPage() {
  const engines = await getEngines()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Engines</h1>
          <p className={styles.subtitle}>
            Three engines. Each one built to solve a different layer.
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {engines.map((engine: any) => {
          const bg    = COLOR_MAP[engine.color] || '#0A0A0A'
          const color = TEXT_COLOR[engine.color] || '#ffffff'
          const order = String(engine.order || 1).padStart(2, '0')
          const imgUrl = ENGINE_IMAGES[engine.slug]
          const isLive = engine.status === 'live'

          return (
            <Link
              key={engine.slug}
              href={`/engines/${engine.slug}`}
              className={styles.card}
              style={{ backgroundColor: bg, color }}
              aria-label={`Ver engine: ${engine.name}`}
            >
              {/* Parallax background */}
              {imgUrl && (
                <div
                  className={styles.bgImage}
                  style={{
                    backgroundImage: `linear-gradient(${bg}dd, ${bg}dd), url(${imgUrl})`,
                  }}
                  aria-hidden="true"
                />
              )}

              <div className={styles.cardInner}>
                {/* Status badge */}
                <div className={styles.statusRow}>
                  {isLive ? (
                    <span className={styles.liveBadge}>
                      <span className={styles.liveDot} aria-hidden="true" />
                      Live
                    </span>
                  ) : (
                    <span className={styles.stableBadge}>
                      ◎ Stable
                    </span>
                  )}
                </div>

                <h2 className={styles.cardTitle}>{engine.name}</h2>
                <p className={styles.description}>{engine.tagline}</p>
                <span className={styles.exploreBtn}>
                  Explore Engine →
                </span>
              </div>

              <span className={styles.decNumber} aria-hidden="true">{order}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
