import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLexiconTerms } from '@/lib/payload'
import { lexiconTerms as MOCK_TERMS } from '@/lib/lexicon'
import styles from './Term.module.css'

const BASE_URL = 'https://buildations.com'

export async function generateStaticParams() {
  return MOCK_TERMS.map(term => ({ term: term.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ term: string }> }
): Promise<Metadata> {
  const { term: termId } = await params
  const cmsTerms = await getLexiconTerms(200)
  const allTerms = cmsTerms.length > 0 ? cmsTerms : MOCK_TERMS
  const term = allTerms.find((t: any) => t.id === termId || t.slug === termId)
  if (!term) return { title: 'Término no encontrado' }

  return {
    title: `${term.term} — Lexicon`,
    description: term.definition,
    alternates: { canonical: `${BASE_URL}/lexicon/${termId}` },
    openGraph: {
      type: 'article',
      url: `${BASE_URL}/lexicon/${termId}`,
      title: `${term.term} — Buildations Lexicon`,
      description: term.definition,
    },
    twitter: {
      card: 'summary',
      title: `${term.term} — Buildations Lexicon`,
      description: term.definition.substring(0, 200),
    },
  }
}

export default async function TermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term: termId } = await params

  const cmsTerms = await getLexiconTerms(200)
  const allTerms = cmsTerms.length > 0 ? cmsTerms : MOCK_TERMS

  const term = allTerms.find((t: any) => t.id === termId || t.slug === termId)
  if (!term) notFound()

  const termIdx = allTerms.indexOf(term)
  const prev = allTerms[termIdx - 1]
  const next = allTerms[termIdx + 1]

  // Related terms (same letter or same tags)
  const related = allTerms
    .filter((t: any) => t.id !== term.id && (t.letter === term.letter || t.tags?.some((tag: string) => term.tags?.includes(tag))))
    .slice(0, 3)

  // JSON-LD DefinedTerm schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.definition,
    url: `${BASE_URL}/lexicon/${term.id}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Buildations Lexicon',
      url: `${BASE_URL}/lexicon`,
    },
    ...(term.tags && { termCode: term.tags.join(', ') }),
  }

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/lexicon" className={styles.back}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M10 7H4M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Lexicon
            </Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbLetter}>{term.letter}</span>
          </div>

          {term.relatedEngine && (
            <span
              className={styles.engineBadge}
              style={{ borderColor: term.engineColor, color: term.engineColor }}
            >
              {term.relatedEngine}
            </span>
          )}

          <h1 className={styles.title}>{term.term}</h1>

          {term.tags && (
            <div className={styles.tags}>
              {term.tags.map((tag: string) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Definition */}
      <div className={styles.body}>
        <div className={styles.container}>
          <p className={styles.definition}>{term.definition}</p>
        </div>
      </div>

      {/* Related terms */}
      {related.length > 0 && (
        <div className={styles.related}>
          <div className={styles.container}>
            <p className={styles.relatedLabel}>Relacionados</p>
            <div className={styles.relatedList}>
              {related.map((r: any) => (
                <Link key={r.id} href={`/lexicon/${r.id}`} className={styles.relatedRow}>
                  <span className={styles.relatedLetter} aria-hidden="true">{r.letter}</span>
                  <span className={styles.relatedName}>{r.term}</span>
                  <span className={styles.relatedArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className={styles.pagination}>
        <div className={styles.container}>
          {prev ? (
            <Link href={`/lexicon/${prev.id}`} className={styles.paginationLink}>
              <span className={styles.paginationDir}>← Anterior</span>
              <span className={styles.paginationTitle}>{prev.term}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/lexicon/${next.id}`} className={`${styles.paginationLink} ${styles.paginationRight}`}>
              <span className={styles.paginationDir}>Siguiente →</span>
              <span className={styles.paginationTitle}>{next.term}</span>
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}
