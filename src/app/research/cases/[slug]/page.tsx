import { notFound } from 'next/navigation'
import { getCaseStudyBySlug } from '@/lib/payload'
import styles from './CaseStudy.module.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import LatexRenderer from '@/components/LatexRenderer'

const CMS_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'
const BASE_URL_SITE = 'https://buildations.com'

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
  if (!cs) return { title: 'Case Study Not Found' }

  const coverUrl = cs.coverImage?.url
    ? `${CMS_URL}${cs.coverImage.url}`
    : null

  return {
    title: `${cs.title} | Case Study — Buildations`,
    description: cs.summary || '',
    alternates: { canonical: `${BASE_URL_SITE}/research/cases/${slug}` },
    openGraph: {
      type: 'article',
      url: `${BASE_URL_SITE}/research/cases/${slug}`,
      title: cs.title,
      description: cs.summary || '',
      ...(coverUrl && {
        images: [{ url: coverUrl, width: 1344, height: 768, alt: cs.coverImage?.alt || cs.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.title,
      description: cs.summary || '',
      ...(coverUrl && { images: [coverUrl] }),
    },
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

  const coverUrl = cs.coverImage?.url
    ? `${CMS_URL}${cs.coverImage.url}`
    : null


  const BASE_URL = 'https://buildations.com'
  const caseSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: cs.title,
    description: cs.summary || '',
    url: `${BASE_URL}/research/cases/${slug}`,
    datePublished: cs.publishedAt || cs.createdAt,
    dateModified: cs.updatedAt,
    author: { '@type': 'Organization', name: 'Buildations', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Buildations',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/research/cases/${slug}` },
    articleSection: cs.engine || '',
    about: { '@type': 'Thing', name: cs.industry || '' },
    proficiencyLevel: cs.difficulty || 'intermediate',
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }} />
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

      {/* Cover image hero */}
      {coverUrl && (
        <div className={styles.coverWrap}>
          <img
            src={coverUrl}
            alt={cs.coverImage?.alt || cs.title}
            className={styles.coverImage}
          />
          <div className={styles.coverOverlay} style={{ background: engineColor }} />
        </div>
      )}

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
