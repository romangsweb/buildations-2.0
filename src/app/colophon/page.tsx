import type { Metadata } from 'next'
import styles from './Colophon.module.css'

export const metadata: Metadata = {
  title: 'Colophon — Cómo fue construido',
  description: 'Nota editorial sobre las decisiones de diseño, tecnología y tipografía detrás de Buildations. Hecho con criterio. Sin plantillas.',
}

const typefaces = [
  {
    name: 'Poppins',
    foundry: 'Indian Type Foundry / Google Fonts',
    usage: 'Tipografía principal — títulos, cuerpo de texto, navegación',
    weights: ['300', '400', '600', '700', '900'],
    specimen: 'El diseño ya no trata de posicionar píxeles',
  },
]

const tech = [
  { name: 'Next.js 16', role: 'Framework / App Router', url: 'https://nextjs.org' },
  { name: 'Payload CMS', role: 'Sistema de gestión editorial', url: 'https://payloadcms.com' },
  { name: 'Vercel', role: 'Hosting & deployment', url: 'https://vercel.com' },
  { name: 'Qdrant', role: 'Búsqueda semántica', url: 'https://qdrant.tech' },
  { name: 'Ollama', role: 'Modelos de lenguaje locales', url: 'https://ollama.com' },
]

const decisions = [
  {
    title: 'Sistema de color en bloques',
    body: 'Cada sección del sitio usa un color sólido de fondo con su opuesto como texto. Negro, blanco, azul, verde, amarillo, rojo. Sin gradientes decorativos — el color es estructura.',
  },
  {
    title: 'Tipografía sin compromiso',
    body: 'Tamaños heroicos que exceden el viewport: hasta 200px en desktop. La tipografía como imagen. El texto como forma antes que como mensaje.',
  },
  {
    title: 'Sistema de rejilla de 12 columnas',
    body: 'Cada layout respeta una cuadrícula de 12 columnas con gaps consistentes. Sin diseño improvisado — todo tiene un lugar por razón, no por estética accidental.',
  },
  {
    title: 'Cursor personalizado',
    body: 'El cursor por defecto del sistema operativo desaparece. Un círculo propio responde al movimiento del usuario, cambia de escala en elementos interactivos y refleja la naturaleza de control del laboratorio.',
  },
  {
    title: 'Iconografía abstacta',
    body: 'Sin iconos de librería. Cada glifo fue diseñado para este sitio: arcos evocando espacios latentes, órbitas representando modelos, diagonales para flujo de datos. El vocabulario visual es del laboratorio.',
  },
  {
    title: 'Sin sombras ni gradientes decorativos',
    body: 'La estética es brutalista por convicción. Las jerarquías se establecen con tipo, color y espacio — no con efectos visuales que enmascaran la estructura.',
  },
]

export default function ColophonPage() {
  const year = new Date().getFullYear()

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.label}>Colophon</p>
          <h1 className={styles.title}>Cómo fue<br />construido.</h1>
          <p className={styles.sub}>
            El colofón es la nota al final de un libro: quién lo hizo, con qué herramientas, con qué intención.
            Esta es la nuestra.
          </p>
        </div>
      </div>

      {/* Typefaces */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Tipografía</div>
          <div className={styles.sectionBody}>
            {typefaces.map(tf => (
              <div key={tf.name} className={styles.typefaceBlock}>
                <div className={styles.typefaceSpecimen} aria-hidden="true">
                  {tf.specimen}
                </div>
                <div className={styles.typefaceMeta}>
                  <h2 className={styles.typefaceName}>{tf.name}</h2>
                  <p className={styles.typefaceFoundry}>{tf.foundry}</p>
                  <p className={styles.typefaceUsage}>{tf.usage}</p>
                  <div className={styles.weights}>
                    {tf.weights.map(w => (
                      <span key={w} className={styles.weight} style={{ fontWeight: w as any }}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Tecnología</div>
          <div className={styles.techList}>
            {tech.map((t, i) => (
              <div key={t.name} className={styles.techRow}>
                <span className={styles.techNum} aria-hidden="true">0{i + 1}</span>
                <div className={styles.techInfo}>
                  <span className={styles.techName}>{t.name}</span>
                  <span className={styles.techRole}>{t.role}</span>
                </div>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.techLink}
                  aria-label={`Ver ${t.name}`}
                >
                  ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design decisions */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Decisiones de diseño</div>
          <div className={styles.decisions}>
            {decisions.map((d, i) => (
              <div key={i} className={styles.decision}>
                <h3 className={styles.decisionTitle}>{d.title}</h3>
                <p className={styles.decisionBody}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <div className={styles.signoff}>
        <div className={styles.signoffInner}>
          <div className={styles.signoffGlyph} aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
          </div>
          <p className={styles.signoffText}>
            Hecho con criterio. Sin plantillas.
          </p>
          <p className={styles.signoffMeta}>Buildations · Ciudad de México · {year}</p>
        </div>
      </div>
    </div>
  )
}
