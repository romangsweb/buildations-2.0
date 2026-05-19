'use client'

import { useState } from 'react'
import styles from './Playground.module.css'
import RevenuePlayground from '@/components/RevenuePlayground'
import SearchPlayground from '@/components/SearchPlayground'
import SecurityPlayground from '@/components/SecurityPlayground'

const ENGINES = [
  {
    id: 'revenue',
    label: 'Revenue Intelligence',
    color: '#F5E642',
    badge: 'Deal Scorer',
    description: 'Enter real deal data — industry, size, buyer role, source — and the engine scores it with full factor attribution. Useful for qualifying leads before investing resources.',
  },
  {
    id: 'search',
    label: 'Search & Presence',
    color: '#1A3BFF',
    badge: 'Content Analyzer',
    description: 'Enter any keyword and the engine analyzes search metrics, competitive gaps, and generates a full content blueprint with AI answer engine optimization.',
  },
  {
    id: 'security',
    label: 'Adaptive Security',
    color: '#FF2E2E',
    badge: 'IP Analyzer',
    description: 'Enter any IP address and the engine runs a full threat intelligence assessment — geolocation, abuse scoring, MITRE ATT&CK mapping, and autonomous response simulation.',
  },
]

export default function PlaygroundClient() {
  const [active, setActive] = useState(0)
  const engine = ENGINES[active]

  return (
    <>
      {/* Engine nav */}
      <div className={styles.engineNav}>
        <div className={styles.engineNavInner}>
          {ENGINES.map((e, i) => (
            <button
              key={e.id}
              className={`${styles.engineTab} ${active === i ? styles.engineTabActive : ''}`}
              onClick={() => setActive(i)}
              style={active === i ? { borderBottomColor: e.color } : undefined}
            >
              <span className={styles.engineTabDot} style={{ background: e.color }} />
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {/* Info strip */}
          <div className={styles.infoStrip}>
            <span
              className={styles.infoBadge}
              style={{ color: engine.color, borderColor: engine.color }}
            >
              {engine.badge}
            </span>
            <span className={styles.infoText}>{engine.description}</span>
          </div>

          {/* Playground */}
          {active === 0 && <RevenuePlayground />}
          {active === 1 && <SearchPlayground />}
          {active === 2 && <SecurityPlayground />}
        </div>
      </div>
    </>
  )
}
