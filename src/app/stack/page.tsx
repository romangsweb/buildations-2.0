import type { Metadata } from 'next'
import ArchitectureDiagram from '@/components/home/ArchitectureDiagram'
import styles from './Stack.module.css'

export const metadata: Metadata = {
  title: 'Stack — Infraestructura técnica',
  description: 'El stack completo de Buildations: Ollama, Qdrant, n8n, PostgreSQL, LangGraph. Infraestructura de IA propia, local y en producción.',
}

const tools = [
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'Inference',
    color: '#2EFF6E',
    description: 'Corre modelos de lenguaje directamente en hardware propio — sin llamadas a APIs externas, sin datos enviados a terceros. Qwen, Mistral, LLaMA 3 y Gemma operan en nuestros servidores.',
    role: 'Motor de razonamiento local para todos los pipelines de análisis y generación.',
    glyph: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 16 Q16 8 22 16 Q16 24 10 16Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'qdrant',
    name: 'Qdrant',
    category: 'Vector Store',
    color: '#1A3BFF',
    description: 'Base de datos vectorial de alta velocidad. Almacena embeddings y permite búsqueda semántica sobre millones de documentos en milisegundos. La memoria a largo plazo de los agentes.',
    role: 'Indexación de contenido, recuperación en pipelines RAG, análisis de similitud semántica.',
    glyph: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="10" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="18" y="4" width="10" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="4" y="18" width="10" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="23" cy="23" r="5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="14" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="9" y1="14" x2="9" y2="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'Orchestration',
    color: '#F5E642',
    description: 'Plataforma de automatización de workflows que conecta LLMs, bases de datos, APIs externas y servicios de notificación. La columna vertebral de la orquestación de agentes.',
    role: 'Pipelines de datos, scheduling, integración con HubSpot, Telegram y sistemas de monitoreo.',
    glyph: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="6" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="16" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="26" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="16" cy="26" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="9" y1="14" x2="13" y2="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="19" y1="8" x2="23" y2="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="23" y1="18" x2="19" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="13" y1="24" x2="9" y2="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Data Layer',
    color: '#FFFFFF',
    description: 'La capa de persistencia estructurada. Historial de deals, logs de agentes, métricas de rendimiento y metadata de contenido. Confiable, extensible, nuestro.',
    role: 'Fuente de verdad para datos estructurados. Alimenta los modelos de scoring y los sistemas de reporting.',
    glyph: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="8" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M6 8 L6 24" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M26 8 L26 24" stroke="currentColor" strokeWidth="1.2"/>
        <ellipse cx="16" cy="24" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <ellipse cx="16" cy="16" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    category: 'Agent Framework',
    color: '#FF2D2D',
    description: 'Framework para construir agentes como grafos de estado con memoria entre pasos, bifurcaciones condicionales y capacidad de retry. La diferencia entre un bot y un agente real.',
    role: 'Arquitectura del motor Adaptive Security. Evalúa amenazas, decide acciones, ejecuta y reporta.',
    glyph: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="24" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="16" cy="24" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M11 8 L21 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M10 10 L14 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M22 10 L18 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="1.5 1.5"/>
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js + Payload',
    category: 'Editorial Layer',
    color: '#FFFFFF',
    description: 'Frontend en Next.js 16 (App Router) con Payload CMS como capa editorial. El sitio que lees es la misma infraestructura que usamos para publicar investigación y documentar los motores.',
    role: 'Publicación editorial, API de contenido, server-side rendering y delivery de la experiencia.',
    glyph: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
        <path d="M10 20 L16 14 L22 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
]

const philosophy = [
  {
    num: '01',
    title: 'No rented.',
    body: 'Cada componente del stack corre en hardware propio o en infraestructura que controlamos completamente. Sin lock-in a APIs de terceros para funciones críticas.',
  },
  {
    num: '02',
    title: 'Not abstracted.',
    body: 'No usamos wrappers que ocultan lo que sucede debajo. Entendemos cada capa del stack — desde el modelo hasta el webhook de salida.',
  },
  {
    num: '03',
    title: 'Owned.',
    body: 'Los modelos, los datos, la lógica de negocio y las integraciones pertenecen al cliente. No a un proveedor de IA que puede cambiar precios o discontinuar servicios.',
  },
]

export default function StackPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.label}>Infrastructure</p>
          <h1 className={styles.title}>El stack<br />completo.</h1>
          <p className={styles.subtitle}>
            Infraestructura de IA construida desde la base.<br />
            Local. Controlada. En producción.
          </p>
        </div>
      </div>

      {/* Architecture diagram — reutilizado del home */}
      <div className={styles.diagramSection}>
        <ArchitectureDiagram />
      </div>

      {/* Philosophy */}
      <div className={styles.philosophy}>
        <div className={styles.philosophyInner}>
          {philosophy.map(p => (
            <div key={p.num} className={styles.philItem}>
              <span className={styles.philNum}>{p.num}</span>
              <h2 className={styles.philTitle}>{p.title}</h2>
              <p className={styles.philBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools grid */}
      <div className={styles.tools}>
        <div className={styles.toolsInner}>
          <div className={styles.toolsHeader}>
            <p className={styles.toolsLabel}>Herramientas</p>
            <h2 className={styles.toolsTitle}>Cada pieza tiene<br />un propósito.</h2>
          </div>

          <div className={styles.toolsGrid}>
            {tools.map((tool, i) => (
              <div
                key={tool.id}
                className={styles.toolCard}
                style={{ '--tool-color': tool.color } as React.CSSProperties}
              >
                <div className={styles.toolTop}>
                  <span className={styles.toolGlyph} style={{ color: tool.color }}>
                    {tool.glyph}
                  </span>
                  <span className={styles.toolNum} aria-hidden="true">0{i + 1}</span>
                </div>
                <div className={styles.toolCategory}>{tool.category}</div>
                <h3 className={styles.toolName}>{tool.name}</h3>
                <p className={styles.toolDesc}>{tool.description}</p>
                <div className={styles.toolRole}>
                  <span className={styles.toolRoleLabel}>Rol →</span>
                  <span>{tool.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>¿Quieres este stack<br />trabajando para ti?</h2>
          <a href="/contact" className={styles.ctaBtn}>Empezar un proyecto →</a>
        </div>
      </div>
    </div>
  )
}
