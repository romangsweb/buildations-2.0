import type { Metadata } from 'next'
import { getLexiconTerms } from '@/lib/payload'
import { lexiconTerms as MOCK_TERMS, letters as MOCK_LETTERS } from '@/lib/lexicon'
import styles from './Lexicon.module.css'

export const metadata: Metadata = {
  title: 'Lexicon — Glosario de IA',
  description: 'Términos de inteligencia artificial definidos con criterio editorial. No Wikipedia — el vocabulario de Buildations para describir cómo funciona la IA en producción.',
}

export default async function LexiconPage() {
  const cmsTerms = await getLexiconTerms(200)
  const terms = cmsTerms.length > 0 ? cmsTerms : MOCK_TERMS
  const letters = [...new Set(terms.map((t: any) => t.letter))].sort() as string[]
  const grouped = letters.reduce<Record<string, any[]>>((acc, letter) => {
    acc[letter] = terms.filter((t: any) => t.letter === letter)
    return acc
  }, {})

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.label}>Lexicon</p>
          <h1 className={styles.title}>El vocabulario<br />del laboratorio</h1>
          <p className={styles.subtitle}>
            Términos de IA definidos en voz propia.<br />
            No Wikipedia. Criterio editorial y contexto de producción.
          </p>
          <p className={styles.count}>{terms.length} términos</p>
        </div>

        {/* Letter nav */}
        <nav className={styles.letterNav} aria-label="Navegar por letra">
          {letters.map(letter => (
            <a key={letter} href={`#${letter}`} className={styles.letterLink}>
              {letter}
            </a>
          ))}
        </nav>
      </div>

      {/* Terms */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {letters.map(letter => (
            <section key={letter} id={letter} className={styles.group}>
              <div className={styles.groupLetter} aria-hidden="true">{letter}</div>
              <div className={styles.termsList}>
                {grouped[letter].map((term, i) => (
                  <article key={term.id} className={styles.term}>
                    <div className={styles.termHeader}>
                      <h2 className={styles.termName}>{term.term}</h2>
                      <div className={styles.termMeta}>
                        {term.relatedEngine && (
                          <span
                            className={styles.engineTag}
                            style={{ borderColor: term.engineColor, color: term.engineColor }}
                          >
                            {term.relatedEngine}
                          </span>
                        )}
                        {term.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <p className={styles.definition}>{term.definition}</p>

                    {/* Decorative index */}
                    <span className={styles.termIdx} aria-hidden="true">
                      {String(lexiconTerms.indexOf(term) + 1).padStart(2, '0')}
                    </span>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaLabel}>¿Falta un término?</p>
          <a href="/contact" className={styles.ctaLink}>Proponer →</a>
        </div>
      </div>
    </div>
  )
}
