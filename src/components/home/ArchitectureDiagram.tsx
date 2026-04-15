'use client'
import { useState } from 'react'
import styles from '@/styles/ArchitectureDiagram.module.css'

const ENGINES = [
  {
    id: 'adaptive-security',
    label: 'Adaptive Security',
    num: '01',
    color: '#FF2E2E',
    description: 'Monitors 9 threat sources. Reasons via LangGraph. Acts autonomously.',
    connections: ['shared-infra', 'qdrant', 'postgres'],
    inputs: ['Cowrie', 'Suricata', 'Tetragon', 'Beelzebub'],
    outputs: ['UFW bans', 'Forensic reports', 'Telegram alerts'],
  },
  {
    id: 'revenue-intelligence',
    label: 'Revenue Intelligence',
    num: '02',
    color: '#F5E642',
    description: 'Scores deals across 12 signals. Trained on closed-won history. Pushes to HubSpot daily.',
    connections: ['shared-infra', 'postgres', 'ollama'],
    inputs: ['HubSpot CRM', 'Deal history', 'ICP data'],
    outputs: ['Lead scores', 'Pipeline diagnosis', 'HOT deal alerts'],
  },
  {
    id: 'search-presence',
    label: 'Search & Presence',
    num: '03',
    color: '#1A3BFF',
    description: 'Reads 367K GSC rows daily. Writes via dual-LLM loop. Monitors AI citations.',
    connections: ['shared-infra', 'qdrant', 'ollama'],
    inputs: ['Google Search Console', 'SearXNG', 'AEO monitor'],
    outputs: ['Content drafts', 'AI citation scores', 'Opportunity alerts'],
  },
]

const INFRA = [
  { id: 'postgres', label: 'PostgreSQL', sub: 'Data layer' },
  { id: 'qdrant', label: 'Qdrant', sub: 'Vector memory' },
  { id: 'ollama', label: 'Ollama', sub: 'Local LLMs' },
  { id: 'shared-infra', label: 'n8n', sub: 'Orchestration' },
]

export default function ArchitectureDiagram() {
  const [active, setActive] = useState<string | null>(null)

  const activeEngine = ENGINES.find(e => e.id === active)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Architecture</p>
          <h2 className={styles.title}>Three engines.<br />One infrastructure.</h2>
          <p className={styles.sub}>Click any engine to see how it connects.</p>
        </div>

        <div className={styles.diagram}>
          {/* Engines column */}
          <div className={styles.enginesCol}>
            <p className={styles.colLabel}>Engines</p>
            {ENGINES.map(engine => (
              <button
                key={engine.id}
                className={`${styles.engineBlock} ${active === engine.id ? styles.engineActive : ''} ${active && active !== engine.id ? styles.engineDim : ''}`}
                style={{ '--engine-color': engine.color } as React.CSSProperties}
                onClick={() => setActive(active === engine.id ? null : engine.id)}
              >
                <span className={styles.engineNum}>{engine.num}</span>
                <span className={styles.engineLabel}>{engine.label}</span>
                <span className={styles.engineArrow}>→</span>
              </button>
            ))}
          </div>

          {/* Center — connection detail */}
          <div className={styles.centerCol}>
            {activeEngine ? (
              <div className={styles.detail}>
                <div className={styles.detailHeader} style={{ borderColor: activeEngine.color }}>
                  <p className={styles.detailNum}>{activeEngine.num}</p>
                  <h3 className={styles.detailTitle}>{activeEngine.label}</h3>
                  <p className={styles.detailDesc}>{activeEngine.description}</p>
                </div>
                <div className={styles.detailFlow}>
                  <div className={styles.flowCol}>
                    <p className={styles.flowColLabel}>Inputs</p>
                    {activeEngine.inputs.map(i => (
                      <span key={i} className={styles.flowTag}>{i}</span>
                    ))}
                  </div>
                  <span className={styles.flowArrow} style={{ color: activeEngine.color }}>→</span>
                  <div className={styles.flowCol}>
                    <p className={styles.flowColLabel}>Outputs</p>
                    {activeEngine.outputs.map(o => (
                      <span key={o} className={styles.flowTag} style={{ borderColor: activeEngine.color }}>{o}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.placeholder}>
                <div className={styles.placeholderGrid}>
                  {[0,1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className={styles.placeholderDot} style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className={styles.placeholderText}>Select an engine</p>
              </div>
            )}
          </div>

          {/* Infrastructure column */}
          <div className={styles.infraCol}>
            <p className={styles.colLabel}>Shared infrastructure</p>
            {INFRA.map(item => (
              <div
                key={item.id}
                className={`${styles.infraBlock} ${activeEngine?.connections.includes(item.id) ? styles.infraActive : ''}`}
                style={{ '--engine-color': activeEngine?.color || '#ffffff' } as React.CSSProperties}
              >
                <span className={styles.infraLabel}>{item.label}</span>
                <span className={styles.infraSub}>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
