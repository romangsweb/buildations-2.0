import Link from 'next/link'
import { getArticles, getCaseStudies } from '@/lib/payload'
import styles from './Research.module.css'
import { CategoryIcon } from '@/components/Icons'

const COLORS = ['#0A0A0A', '#1A3BFF', '#2EFF6E', '#F5E642', '#FF2E2E']

const ENGINE_COLOR: Record<string, string> = {
  'adaptive-security': '#FF2E2E',
  'revenue-intelligence': '#F5E642',
  'search-presence': '#1A3BFF',
}
const ENGINE_LABEL: Record<string, string> = {
  'adaptive-security': 'Adaptive Security',
  'revenue-intelligence': 'Revenue Intelligence',
  'search-presence': 'Search & Presence',
}

export default async function ResearchPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams
  const activeView = view === 'cases' ? 'cases' : 'articles'
  const articles = await getArticles(50)
  const cases = await getCaseStudies(20)
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Research</h1>
          <p className={styles.subtitle}>Field notes from the build.</p>
          <div className={styles.toggle}>
            <a href="/research" className={`${styles.toggleBtn} ${activeView === 'articles' ? styles.toggleActive : ''}`}>
              Articles {articles.length > 0 && <span className={styles.toggleCount}>{articles.length}</span>}
            </a>
            <a href="/research?view=cases" className={`${styles.toggleBtn} ${activeView === 'cases' ? styles.toggleActive : ''}`}>
              Case Studies {cases.length > 0 && <span className={styles.toggleCount}>{cases.length}</span>}
            </a>
          </div>
        </div>
      </div>
      {activeView === 'articles' && <div className={styles.list}>
        {articles.map((article: any, i: number) => (
          <Link
            key={article.slug}
            href={`/research/${article.slug}`}
            className={styles.card}
            style={{ background: COLORS[i % COLORS.length], color: COLORS[i % COLORS.length] === '#F5E642' || COLORS[i % COLORS.length] === '#2EFF6E' ? '#0A0A0A' : '#fff' }}
          >
            <div className={styles.cardInner}>
              <div className={styles.meta}>
                {article.category && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CategoryIcon category={article.category} size={13} color="currentColor" strokeWidth={1.2}/>
                    {article.category}
                  </span>
                )}
                <span>{article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : ''}</span>
                {article.readTime && <span>{article.readTime}</span>}
              </div>
              <h2 className={styles.cardTitle}>{article.title}</h2>
              {article.excerpt && (
                <p className={styles.excerpt}>{article.excerpt.substring(0, 120)}...</p>
              )}
              <div className={styles.footer}>
                <span>Read Article →</span>
              </div>
            </div>
            <span className={styles.decNumber} aria-hidden="true">0{i + 1}</span>
          </Link>
        ))}
      </div>}
      {activeView === 'cases' && cases.length > 0 && (
        <div className={styles.casesSection}>
          <div className={styles.casesHeader}>
            <div className={styles.container}>
              <p className={styles.casesLabel}>Case Studies</p>
              <h2 className={styles.casesTitle}>Engines in production</h2>
            </div>
          </div>
          <div className={styles.casesList}>
            {cases.map((cs: any) => {
              const color = ENGINE_COLOR[cs.engine] || '#0A0A0A'
              return (
                <Link
                  key={cs.slug}
                  href={`/research/cases/${cs.slug}`}
                  className={styles.caseCard}
                  style={{ borderLeft: `4px solid ${color}`, '--card-color': color } as React.CSSProperties}
                >
                  <div className={styles.caseEngine} style={{ color }}>
                    {ENGINE_LABEL[cs.engine]}
                  </div>
                  <h3 className={styles.caseTitle}>{cs.title}</h3>
                  <p className={styles.caseSummary}>{cs.summary?.substring(0, 100)}...</p>
                  {cs.outcomes && cs.outcomes.length > 0 && (
                    <div className={styles.caseOutcomes}>
                      {cs.outcomes.slice(0, 2).map((o: any, j: number) => (
                        <span key={j} className={styles.caseOutcome}>
                          <span style={{ color }}>{o.value}</span> {o.metric}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className={styles.caseRead}>Read case study →</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
