import { ImageResponse } from 'next/og'
import { getFieldNoteBySlug } from '@/lib/payload'

export const runtime = 'edge'
export const alt = 'Buildations Field Notes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Mock notes for OG fallback
const MOCK_NOTES: Record<string, { title: string; excerpt: string }> = {
  'temperatura-cero': {
    title: 'La temperatura 0 miente',
    excerpt: 'Un modelo en temperatura 0 es determinista pero no honesto.',
  },
  'rag-no-es-magia': {
    title: 'RAG no es magia',
    excerpt: 'RAG resuelve el problema de la memoria, no el del razonamiento.',
  },
  'n8n-como-lenguaje': {
    title: 'n8n como lenguaje visual',
    excerpt: 'Describir un agente en n8n es como escribir pseudocódigo en voz alta.',
  },
  'embeddings-son-opinion': {
    title: 'Los embeddings son una opinión',
    excerpt: 'Una misma frase tiene embeddings distintos según el modelo que los genera.',
  },
  'hallucination-como-feature': {
    title: 'La alucinación como característica',
    excerpt: 'En tareas creativas, la alucinación es generatividad.',
  },
  'agente-vs-pipeline': {
    title: 'Agente vs. Pipeline',
    excerpt: 'La mayoría de los "agentes" que veo son pipelines con branding.',
  },
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let title = 'Field Note'
  let excerpt = 'Notas del laboratorio Buildations'

  try {
    const note = await getFieldNoteBySlug(slug)
    if (note) {
      title = note.title || title
      excerpt = note.excerpt?.substring(0, 120) || excerpt
    } else if (MOCK_NOTES[slug]) {
      title = MOCK_NOTES[slug].title
      excerpt = MOCK_NOTES[slug].excerpt
    }
  } catch {
    if (MOCK_NOTES[slug]) {
      title = MOCK_NOTES[slug].title
      excerpt = MOCK_NOTES[slug].excerpt
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: Logo + Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Signal icon */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="2" fill="white"/>
              <path d="M11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
              <path d="M11 2C16.5228 2 21 6.47715 21 12C21 17.5228 16.5228 22 11 22" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.25"/>
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Buildations
            </span>
          </div>
          <span
            style={{
              color: '#0A0A0A',
              backgroundColor: '#F5F5F0',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '6px 14px',
            }}
          >
            Field Note
          </span>
        </div>

        {/* Title + excerpt */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: 'white',
              fontSize: title.length > 50 ? '48px' : '64px',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px', lineHeight: '1.5', maxWidth: '780px' }}>
            {excerpt}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', letterSpacing: '0.1em' }}>
            buildations.com/field-notes
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', letterSpacing: '0.1em' }}>
            AI Laboratory — CDMX
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
