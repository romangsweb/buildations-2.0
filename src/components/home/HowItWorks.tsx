import styles from '@/styles/HowItWorks.module.css'

const PRINCIPLES = [
  {
    num: '01',
    title: 'Each engine is independent',
    text: 'Revenue Intelligence does not know Search & Presence exists. Adaptive Security does not depend on the others running. Each engine solves one layer — and does it completely.',
  },
  {
    num: '02',
    title: 'They connect through clean interfaces',
    text: 'When you need them to talk, they do — through APIs, shared data pipelines, and event streams. The connection is intentional, not tangled. You add what you need, when you need it.',
  },
  {
    num: '03',
    title: 'The infrastructure is yours',
    text: 'Models run on your hardware. Data stays in your database. Nothing routes through a third-party API you do not control. This is not a SaaS subscription — it is infrastructure you own.',
  },
]

const LAYERS = [
  { color: '#FF2E2E', label: 'Adaptive Security', sub: 'Threat detection & response' },
  { color: '#1A3BFF', label: 'Search & Presence', sub: 'Visibility for humans and machines' },
  { color: '#F5E642', label: 'Revenue Intelligence', sub: 'Signal over noise in the pipeline' },
  { color: 'rgba(255,255,255,0.1)', label: 'Shared infrastructure', sub: 'PostgreSQL · Qdrant · Ollama · n8n', shared: true },
]

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>How it works</p>
          <h2 className={styles.title}>Modular by design</h2>
          <p className={styles.subtitle}>
            Three engines. One infrastructure. Each piece independent, composable, replaceable.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.diagram}>
            <div className={styles.stack}>
              {LAYERS.map((layer, i) => (
                <div
                  key={i}
                  className={`${styles.layer} ${layer.shared ? styles.layerShared : ''}`}
                  style={{ borderLeft: `4px solid ${layer.color}` }}
                >
                  <span className={styles.layerLabel}>{layer.label}</span>
                  <span className={styles.layerSub}>{layer.sub}</span>
                </div>
              ))}
            </div>
            <p className={styles.diagramNote}>
              Each engine operates independently. The shared layer provides memory, compute, and orchestration.
            </p>
          </div>

          <div className={styles.principles}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} className={styles.principle}>
                <span className={styles.principleNum}>{p.num}</span>
                <div className={styles.principleContent}>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleText}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
