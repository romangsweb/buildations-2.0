import { ImageResponse } from 'next/og'
import { getArticleBySlug } from '@/lib/payload'

export const runtime = 'edge'
export const alt = 'Buildations Research'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let title = 'Buildations Research'
  let category = 'Research'
  let excerpt = 'AI Research & Intelligence Laboratory — CDMX'

  try {
    const article = await getArticleBySlug(slug)
    if (article) {
      title = article.title || title
      category = article.category || category
      excerpt = article.excerpt?.substring(0, 100) || excerpt
    }
  } catch { /* use defaults */ }

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
        {/* Top: Logo + Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Glyph */}
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" stroke="white" strokeWidth="1.2" fill="none"/>
              <rect x="9" y="1" width="6" height="6" stroke="white" strokeWidth="1.2" fill="none"/>
              <rect x="1" y="9" width="6" height="6" stroke="white" strokeWidth="1.2" fill="none"/>
              <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.2" fill="none"/>
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Buildations
            </span>
          </div>
          <span style={{
            color: '#0A0A0A',
            backgroundColor: '#F5E642',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '6px 14px',
          }}>
            {category}
          </span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            color: 'white',
            fontSize: title.length > 50 ? '52px' : '68px',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            maxWidth: '900px',
          }}>
            {title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px', lineHeight: '1.5', maxWidth: '800px' }}>
            {excerpt}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', letterSpacing: '0.1em' }}>
            buildations.com
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', letterSpacing: '0.1em' }}>
            AI Research Laboratory — CDMX
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
