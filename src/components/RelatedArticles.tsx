import Link from 'next/link'
import { getArticles } from '@/lib/payload'
import styles from '@/styles/RelatedArticles.module.css'
import { CategoryIcon, IconArrow } from '@/components/Icons'

interface RelatedArticlesProps {
  currentSlug: string
  category?: string
  readTime?: string
}

const ACCENT_COLORS = ['#1A3BFF', '#2EFF6E', '#F5E642', '#FF2D2D']

export default async function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  // Fetch a pool of articles
  const all = await getArticles(20)
  if (!all || all.length === 0) return null

  // Filter out current article
  const others = all.filter((a: any) => a.slug !== currentSlug)
  if (others.length === 0) return null

  // Prefer same category, fallback to most recent
  const sameCategory = category
    ? others.filter((a: any) => a.category === category || a.tags?.includes(category))
    : []

  const picks: any[] = []
  for (const a of sameCategory) { if (picks.length < 3) picks.push(a) }
  for (const a of others) { if (picks.length < 3 && !picks.includes(a)) picks.push(a) }

  if (picks.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.label}>Continue reading</p>
      </div>

      <div className={styles.grid}>
        {picks.map((article: any, i: number) => {
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length]
          const isLight = accent === '#2EFF6E' || accent === '#F5E642'
          const dateStr = article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
            : ''

          return (
            <Link
              key={article.slug}
              href={`/research/${article.slug}`}
              className={styles.card}
              style={{
                '--accent': accent,
                '--card-color': isLight ? '#0A0A0A' : '#F5F5F0',
              } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  {article.category && (
                    <span className={styles.category}>
                      <CategoryIcon category={article.category} size={12} color="currentColor" strokeWidth={1.2}/>
                      {article.category}
                    </span>
                  )}
                  {dateStr && <span className={styles.date}>{dateStr}</span>}
                </div>
                <span className={styles.cardNum} aria-hidden="true">0{i + 1}</span>
              </div>

              <h3 className={styles.cardTitle}>{article.title}</h3>

              {article.excerpt && (
                <p className={styles.excerpt}>{article.excerpt.substring(0, 100)}…</p>
              )}

              <div className={styles.cardFooter}>
                <span className={styles.readLink}>
                  Read article
                  <IconArrow size={14} color="currentColor" strokeWidth={1.3}/>
                </span>
                {article.readTime && (
                  <span className={styles.readTime}>{article.readTime}</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
