import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './FieldNote.module.css'
import { getFieldNoteBySlug, getFieldNotes } from '@/lib/payload'
import ScrollProgress from '@/components/ScrollProgress'
import ShareButton from '@/components/ShareButton'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

const BASE_URL = 'https://buildations.com'

// All mock notes (same as in list page — in prod this comes from CMS)
const MOCK_NOTES = [
  {
    slug: 'temperatura-cero',
    title: 'La temperatura 0 miente',
    excerpt: 'Un modelo en temperatura 0 es determinista pero no honesto.',
    content: `Un modelo en temperatura 0 es determinista pero no honesto. Repite con confianza lo que aprendió, sin señalar los límites de su conocimiento.

La temperatura controla la aleatoriedad del muestreo de tokens. A temperatura 0, el modelo siempre elige el token más probable — reproducible, predecible, auditeable.

El problema es que "más probable" no significa "correcto". El modelo no tiene un mecanismo interno para decir "no sé". Genera el token más probable en ese contexto, incluso si ese contexto está fuera de su distribución de entrenamiento.

A veces necesitas algo de entropía para llegar a la verdad. No porque el ruido ayude — sino porque fuerza al modelo a explorar el espacio de posibilidades en lugar de colapsar siempre en la misma respuesta.

Para sistemas de razonamiento críticos: usa temperatura baja con chain-of-thought explícito y validación externa, no temperatura 0 con confianza ciega.`,
    publishedAt: '2026-04-10T00:00:00Z',
    category: 'field-note',
    readTime: '1 min',
  },
  {
    slug: 'rag-no-es-magia',
    title: 'RAG no es magia',
    excerpt: 'RAG resuelve el problema de la memoria, no el del razonamiento.',
    content: `RAG resuelve el problema de la memoria, no el del razonamiento.

Retrieval-Augmented Generation significa que antes de generar, el sistema busca contexto relevante en una base de conocimiento y lo inyecta en el prompt. El modelo entonces genera sobre esa información, no desde su memoria paramétrica.

El error más común: asumir que con RAG el modelo "ya sabe" el dominio. No es así. Si el retrieval recupera los documentos equivocados, el modelo genera perfectamente sobre información incorrecta. El output parece bueno, pero los hechos son falsos.

La calidad del índice vectorial importa más que la elección del modelo. Un modelo mediocre con buen retrieval supera consistentemente a un modelo potente con retrieval malo.

Las variables críticas: calidad de los embeddings, estrategia de chunking, función de similitud, threshold de relevancia, y el reranking. RAG no es un botón — es una arquitectura que necesita ajuste continuo.`,
    publishedAt: '2026-04-07T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
  {
    slug: 'n8n-como-lenguaje',
    title: 'n8n como lenguaje visual',
    excerpt: 'Describir un agente en n8n es como escribir pseudocódigo en voz alta.',
    content: `Describir un agente en n8n es como escribir pseudocódigo en voz alta. Los nodos son verbos, las conexiones son la lógica condicional, y el canvas es el diagrama de flujo que normalmente vive en tu cabeza.

Hay algo revelador en eso. Cuando tienes que arrastrar un nodo "HTTP Request" y conectarlo a un "Set Variable" y de ahí a un "LLM Chain", el proceso te fuerza a pensar paso a paso. No puedes saltar a la conclusión — tienes que definir cada transformación intermedia.

Para flujos complejos esto se vuelve denso rápido. El canvas de n8n no escala igual que el código — 50 nodos son difíciles de auditar, mientras que 500 líneas de Python son navegables con un buscador.

Pero para prototipar, para demostrar a un cliente cómo funciona un pipeline de IA, para conectar servicios sin ingeniería de backend: es exactamente lo que necesitas. El visual no es decorativo — es la documentación.`,
    publishedAt: '2026-04-03T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
  {
    slug: 'embeddings-son-opinion',
    title: 'Los embeddings son una opinión',
    excerpt: 'Una misma frase tiene embeddings distintos según el modelo que los genera.',
    content: `Una misma frase tiene embeddings distintos según el modelo que los genera. No son representaciones objetivas del significado — son la interpretación estadística de un corpus específico.

Dos modelos de embedding pueden posicionar "el banco del río" y "el banco del dinero" de formas completamente distintas en el espacio vectorial. Uno puede haberlos aprendido principalmente en contextos financieros; el otro, en literatura.

Esto tiene consecuencias directas en retrieval. Tu vector store no almacena "el significado" de tus documentos — almacena la opinión de un modelo sobre cómo representarlos. Cambiar el modelo de embedding invalida todos los vectores existentes.

Implicación práctica: elige el modelo de embedding antes de construir el índice, documenta la decisión, y trata el modelo de embedding como una dependencia crítica del sistema — no como un detalle de implementación.`,
    publishedAt: '2026-03-28T00:00:00Z',
    category: 'field-note',
    readTime: '1 min',
  },
  {
    slug: 'hallucination-como-feature',
    title: 'La alucinación como característica',
    excerpt: 'En tareas creativas, la alucinación es generatividad.',
    content: `En tareas creativas, la alucinación es generatividad. El modelo "inventa" porque generaliza más allá de los datos — exactamente lo que queremos para síntesis de ideas.

La alucinación no es un defecto que los labs están a punto de eliminar. Es una consecuencia del proceso de generación: el modelo predice tokens probables, no hechos verificados. Esa misma capacidad de extrapolar el patrón general más allá de los ejemplos específicos es lo que hace útiles a estos modelos para tareas creativas.

El problema es contextual. En un sistema legal, financiero o médico, la alucinación es inaceptable. En brainstorming, síntesis de ideas, o exploración de ángulos de un tema, puede ser valiosa.

La distinción que importa no es "¿alucinó el modelo?" sino "¿en este contexto importa que alucinó?". Diseña los sistemas de validación según la respuesta.`,
    publishedAt: '2026-03-21T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
  {
    slug: 'agente-vs-pipeline',
    title: 'Agente vs. Pipeline',
    excerpt: 'La mayoría de los "agentes" que veo son pipelines con branding.',
    content: `Un pipeline ejecuta pasos fijos en orden. Un agente decide qué paso sigue según el contexto.

La distinción importa cuando el problema no siempre tiene la misma forma. Si el input A siempre produce el flujo X, eso es un pipeline — no importa cuántos modelos de lenguaje tenga dentro.

Un agente real tiene un loop de razonamiento: observa el estado, decide una acción, la ejecuta, observa el resultado, decide el siguiente paso. Puede retroceder, pedir más información, cambiar de estrategia, o declarar que no puede resolver el problema.

La mayoría de los "agentes" que veo son pipelines con branding. No hay nada malo en eso — los pipelines son predecibles, eficientes y fáciles de auditar. Pero venderlos como agentes crea expectativas que no van a cumplir.

Usa agentes cuando el espacio de soluciones es genuinamente abierto. Usa pipelines cuando ya sabes qué pasos necesitas — solo que has olvidado que ya lo sabías.`,
    publishedAt: '2026-03-14T00:00:00Z',
    category: 'field-note',
    readTime: '2 min',
  },
]

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params

  let note: any = null
  try {
    note = await getFieldNoteBySlug(slug)
  } catch {}
  if (!note) note = MOCK_NOTES.find(n => n.slug === slug)
  if (!note) return { title: 'Nota no encontrada' }

  return {
    title: `${note.title} — Field Notes · Buildations`,
    description: note.excerpt || '',
    alternates: { canonical: `${BASE_URL}/field-notes/${slug}` },
    openGraph: {
      type: 'article',
      url: `${BASE_URL}/field-notes/${slug}`,
      title: note.title,
      description: note.excerpt || '',
      publishedTime: note.publishedAt,
      authors: ['Buildations'],
      images: [
        {
          url: `/field-notes/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.excerpt || '',
      images: [`/field-notes/${slug}/opengraph-image`],
    },
  }
}

export default async function FieldNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let note: any = await getFieldNoteBySlug(slug)
  if (!note) {
    note = MOCK_NOTES.find((n: any) => n.slug === slug)
  }
  if (!note) notFound()

  const dateStr = new Date(note.publishedAt).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const paragraphs = note.content.split('\n\n').filter(Boolean)

  // Pull quote: use the excerpt as the pull quote
  const pullQuote = note.excerpt

  // Load all notes for prev/next/related — prefer CMS, fallback to MOCK
  let allNotes: any[] = []
  try {
    const cms = await getFieldNotes(100)
    allNotes = cms.length > 0 ? cms : MOCK_NOTES
  } catch {
    allNotes = MOCK_NOTES
  }

  const currentIdx = allNotes.findIndex((n: any) => n.slug === slug)
  const prevNote = currentIdx > 0 ? allNotes[currentIdx - 1] : null
  const nextNote = currentIdx < allNotes.length - 1 ? allNotes[currentIdx + 1] : null

  // Related: other notes excluding current and prev/next
  const related = allNotes
    .filter((n: any) => n.slug !== slug && n.slug !== prevNote?.slug && n.slug !== nextNote?.slug)
    .slice(0, 2)

  // JSON-LD schema
  const noteSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.excerpt || '',
    url: `${BASE_URL}/field-notes/${slug}`,
    datePublished: note.publishedAt || '',
    dateModified: note.publishedAt || '',
    author: { '@type': 'Organization', name: 'Buildations', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Buildations',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/field-notes/${slug}` },
    articleSection: 'Field Notes',
  }

  return (
    <article className={styles.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(noteSchema) }}
      />

      {/* Reading progress bar */}
      <ScrollProgress />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.meta}>
            <Link href="/field-notes" className={styles.back}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M10 7H4M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Field Notes
            </Link>
            <span className={styles.metaDate}>{dateStr}</span>
            {note.readTime && <span className={styles.metaRead}>{note.readTime} read</span>}
          </div>
          <h1 className={styles.title}>{note.title}</h1>
          <p className={styles.excerpt}>{note.excerpt}</p>

          {/* Actions row */}
          <div className={styles.actions}>
            <ShareButton title={note.title} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {/* Pull quote — first paragraph becomes a styled blockquote */}
          {paragraphs.length > 0 && (
            <blockquote className={styles.pullQuote}>
              {pullQuote}
            </blockquote>
          )}

          {/* Body paragraphs */}
          {paragraphs.map((p: string, i: number) => (
            <p key={i} className={styles.paragraph}>{p}</p>
          ))}
        </div>
      </div>

      {/* Prev / Next navigation */}
      {(prevNote || nextNote) && (
        <nav className={styles.prevNext} aria-label="Navegación entre notas">
          <div className={styles.prevNextInner}>
            <div className={styles.prevNextSide}>
              {prevNote && (
                <Link href={`/field-notes/${prevNote.slug}`} className={styles.prevNextLink} aria-label={`Nota anterior: ${prevNote.title}`}>
                  <span className={styles.prevNextLabel}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M8 6H4M5.5 3.5L3 6l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Anterior
                  </span>
                  <span className={styles.prevNextTitle}>{prevNote.title}</span>
                </Link>
              )}
            </div>
            <div className={styles.prevNextDivider} aria-hidden="true" />
            <div className={`${styles.prevNextSide} ${styles.prevNextRight}`}>
              {nextNote && (
                <Link href={`/field-notes/${nextNote.slug}`} className={`${styles.prevNextLink} ${styles.prevNextLinkRight}`} aria-label={`Siguiente nota: ${nextNote.title}`}>
                  <span className={styles.prevNextLabel}>
                    Siguiente
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M4 6h4M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className={styles.prevNextTitle}>{nextNote.title}</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* More notes */}
      {related.length > 0 && (
        <div className={styles.more}>
          <div className={styles.moreInner}>
            <div className={styles.moreHeader}>
              <span className={styles.moreLine} aria-hidden="true"/>
              <span className={styles.moreLabel}>Más notas</span>
            </div>
            <div className={styles.moreList}>
              {related.map(r => (
                <Link key={r.slug} href={`/field-notes/${r.slug}`} className={styles.moreRow}>
                  <span className={styles.moreTitle}>{r.title}</span>
                  <span className={styles.moreArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
