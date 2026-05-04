import { notFound } from 'next/navigation'
import { getCaseStudyBySlug } from '@/lib/payload'
import styles from './CaseStudy.module.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import LatexRenderer from '@/components/LatexRenderer'

export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

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

const DIFFICULTY_LABEL: Record<string, string> = {
  basic: 'Basic implementation',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  return {
    title: cs ? cs.title + ' | Case Study' : 'Case Study Not Found',
    description: cs?.summary || '',
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const engineColor = ENGINE_COLOR[cs.engine] || '#0A0A0A'
  const engineLabel = ENGINE_LABEL[cs.engine] || cs.engine
  const isDark = cs.engine === 'adaptive-security' || cs.engine === 'search-presence'
  const textColor = isDark ? '#ffffff' : '#0A0A0A'

  return (
    <div className={styles.page}>
      <section className={styles.header} style={{ backgroundColor: engineColor, color: textColor }}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/research" style={{ color: textColor, opacity: 0.6 }}>Research</Link>
            <span style={{ opacity: 0.4 }}> / </span>
            <span style={{ opacity: 0.6 }}>Case Study</span>
          </div>
          <div className={styles.meta}>
            <span className={styles.engineTag}>{engineLabel}</span>
            <span className={styles.industryTag}>{cs.industry}</span>
            {cs.difficulty && <span className={styles.difficultyTag}>{DIFFICULTY_LABEL[cs.difficulty]}</span>}
          </div>
          <h1 className={styles.title}>{cs.title}</h1>
          <p className={styles.summary}>{cs.summary}</p>
        </div>
      </section>

      {cs.outcomes && cs.outcomes.length > 0 && (
        <section className={styles.outcomes}>
          <div className={styles.outcomesGrid}>
            {cs.outcomes.map((o: any, i: number) => (
              <div key={i} className={styles.outcome}>
                <span className={styles.outcomeValue} style={{ color: engineColor }}>{o.value}</span>
                <span className={styles.outcomeMetric}>{o.metric}</span>
                {o.description && <span className={styles.outcomeDesc}>{o.description}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {cs.coverImage && (
        <section className={styles.coverImageSection}>
          <div className={styles.coverImageContainer}>
            <img
              src={`${process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.buildations.com'}${cs.coverImage.url}`}
              alt={cs.coverImage.alt || cs.title}
              className={styles.coverImage}
            />
          </div>
        </section>
      )}

      <section className={styles.content}>
        <div className={styles.contentContainer}>
          {cs.comparisonTable && cs.comparisonTable.length > 0 && (
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>Before and After</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Before</th>
                    <th>After</th>
                  </tr>
                </thead>
                <tbody>
                  {cs.comparisonTable.map((row: any, i: number) => (
                    <tr key={i}>
                      <td>{row.metric}</td>
                      <td className={styles.tdBefore}>{row.before}</td>
                      <td className={styles.tdAfter} style={{ color: engineColor }}>{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {cs.problem && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>The Problem</h2>
              <LatexRenderer content={cs.problem} />
            </div>
          )}

          {cs.implementation && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Implementation</h2>
              <LatexRenderer content={cs.implementation} />
            </div>
          )}

          {cs.results && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Results</h2>
              <LatexRenderer content={cs.results} />
            </div>
          )}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Implement this for your business</p>
          <Link href="/contact" className={styles.ctaBtn} style={{ background: engineColor, color: textColor }}>
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
