import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Página no encontrada',
  description: 'Esta página no existe en la infraestructura de Buildations.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative 404 number */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(24px, 5vw, 80px)',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(180px, 28vw, 400px)',
          fontWeight: 700,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: 'var(--white)',
          opacity: 0.03,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        404
      </span>

      {/* Content */}
      <div style={{ maxWidth: 700, position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: 32,
          }}
        >
          Error · 404
        </p>

        <h1
          style={{
            fontSize: 'clamp(56px, 9vw, 140px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          Page<br />not found
        </h1>

        <p
          style={{
            fontSize: 'clamp(18px, 2vw, 22px)',
            fontWeight: 300,
            opacity: 0.6,
            lineHeight: 1.6,
            maxWidth: '50ch',
            marginBottom: 48,
          }}
        >
          Esta URL no existe en nuestra infraestructura. Puede que fue movida, eliminada, o nunca existió.
        </p>

        {/* Engine color bars */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 48,
          }}
        >
          <span style={{ display: 'block', width: 60, height: 3, background: 'var(--red)' }} />
          <span style={{ display: 'block', width: 60, height: 3, background: 'var(--blue)' }} />
          <span style={{ display: 'block', width: 60, height: 3, background: 'var(--yellow)' }} />
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: 'var(--white)',
              color: 'var(--black)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            ← Back to Home
          </Link>
          <Link
            href="/research"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: 'transparent',
              color: 'var(--white)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'border-color 0.2s',
            }}
          >
            Read Research
          </Link>
        </div>
      </div>
    </section>
  )
}
