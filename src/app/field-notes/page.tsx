import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/payload'
import styles from './FieldNotes.module.css'
import { IconSignal } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Field Notes — Notas del laboratorio',
  description: 'Observaciones breves, experimentos y reflexiones cortas del laboratorio Buildations. Sin edición extensa — solo criterio en tiempo real.',
}

// Static fallback notes for when CMS has no field-notes content
const MOCK_NOTES = [
  {
    slug: 'temperatura-cero',
    title: 'La temperatura 0 miente',
    excerpt: 'Un modelo en temperatura 0 es determinista pero no honesto. Repite con confianza lo que aprendió, sin señalar los límites de su conocimiento. A veces necesitas algo de entropía para llegar a la verdad.',
    publishedAt: '2026-04-10T00:00:00Z',
    category: 'field-note',
    readTime: '1 min',
  },
  {
    slug: 'rag-no-es-magia',
    title: 'RAG no es magia',
    excerpt: 'RAG resuelve el problema de la memoria, no el del razonamiento. Si tu retrieval trae contexto irrelevante, el modelo genera bien sobre información incorrecta. La calidad del índice vectorial importa más que el modelo.',
    publishedAt: '2026-04-07T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
  {
    slug: 'n8n-como-lenguaje',
    title: 'n8n como lenguaje visual',
    excerpt: 'Describir un agente en n8n es como escribir pseudocódigo en voz alta. Los nodos son verbos, las conexiones son la lógica. Más revelador que útil para algunos flujos — y exactamente lo necesario para otros.',
    publishedAt: '2026-04-03T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
  {
    slug: 'embeddings-son-opinion',
    title: 'Los embeddings son una opinión',
    excerpt: 'Una misma frase tiene embeddings distintos según el modelo que los genera. No son representaciones objetivas del significado — son la interpretación estadística de un corpus específico. Tu vector store opina.',
    publishedAt: '2026-03-28T00:00:00Z',
    category: 'field-note',
    readTime: '1 min',
  },
  {
    slug: 'hallucination-como-feature',
    title: 'La alucinación como característica',
    excerpt: 'En tareas creativas, la alucinación es generatividad. El modelo "inventa" porque generaliza más allá de los datos — exactamente lo que queremos para síntesis de ideas. El problema es cuando lo hace donde no debe.',
    publishedAt: '2026-03-21T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
  {
    slug: 'agente-vs-pipeline',
    title: 'Agente vs. Pipeline',
    excerpt: 'Un pipeline ejecuta pasos fijos en orden. Un agente decide qué paso sigue según el contexto. La distinción importa cuando el problema no siempre tiene la misma forma. La mayoría de los "agentes" que veo son pipelines con branding.',
    publishedAt: '2026-03-14T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
]

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function FieldNotesPage() {
  // Try to get field-notes from CMS, fallback to mock
  let notes: any[] = []
  try {
    const all = await getArticles(50)
    const cms = all.filter((a: any) =>
      a.category === 'field-note' || a.type === 'field-note' || a.tags?.includes('field-note')
    )
    notes = cms.length > 0 ? cms : MOCK_NOTES
  } catch {
    notes = MOCK_NOTES
  }

  // Group by month
  const grouped = notes.reduce<Record<string, typeof notes>>((acc, note) => {
    const month = new Date(note.publishedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long' })
    if (!acc[month]) acc[month] = []
    acc[month].push(note)
    return acc
  }, {})

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <span className={styles.glyphWrap} aria-hidden="true">
              <IconSignal size={28} color="currentColor" strokeWidth={1}/>
            </span>
            <p className={styles.label}>Field Notes</p>
          </div>
          <h1 className={styles.title}>Observaciones<br />del laboratorio.</h1>
          <p className={styles.subtitle}>
            Notas breves. Sin edición extensa.<br />
            Criterio en tiempo real.
          </p>
          <p className={styles.count}>{notes.length} entradas</p>
        </div>
      </div>

      {/* Notes feed */}
      <div className={styles.feed}>
        <div className={styles.feedInner}>
          {Object.entries(grouped).map(([month, monthNotes]) => (
            <div key={month} className={styles.monthGroup}>
              <div className={styles.monthLabel}>{month}</div>
              <div className={styles.notesList}>
                {monthNotes.map((note: any, i: number) => (
                  <Link
                    key={note.slug}
                    href={`/field-notes/${note.slug}`}
                    className={styles.noteRow}
                    data-reveal
                  >
                    <div className={styles.noteDate}>
                      {note.publishedAt
                        ? new Date(note.publishedAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
                        : ''}
                    </div>
                    <div className={styles.noteBody}>
                      <h2 className={styles.noteTitle}>{note.title}</h2>
                      <p className={styles.noteExcerpt}>{note.excerpt?.substring(0, 140)}…</p>
                    </div>
                    <div className={styles.noteMeta}>
                      {note.readTime && <span className={styles.readTime}>{note.readTime}</span>}
                      <span className={styles.arrow} aria-hidden="true">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
