'use client'

import { useRef, MouseEvent } from 'react'
import Link from 'next/link'

interface Engine {
  num: string
  icon: string
  name: string
  tagline: string
  capabilities: string[]
  status: 'live' | 'research' | 'stable'
  href: string
}

const STATUS_MAP = {
  live:     { cls: 'badge-live',     label: 'LIVE' },
  research: { cls: 'badge-research', label: 'IN RESEARCH' },
  stable:   { cls: 'badge-stable',   label: 'STABLE' },
}

export default function EngineCard({ engine }: { engine: Engine }) {
  const cardRef   = useRef<HTMLDivElement>(null)
  const glowRef   = useRef<HTMLDivElement>(null)
  const status    = STATUS_MAP[engine.status]

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const cx   = rect.width / 2
    const cy   = rect.height / 2
    const rx   = ((y - cy) / cy) * 5
    const ry   = ((x - cx) / cx) * -5

    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
    glow.style.left = x + 'px'
    glow.style.top  = y + 'px'
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)'
    card.style.transition = 'transform 0.6s cubic-bezier(0.19,1,0.22,1)'
    setTimeout(() => { if (card) card.style.transition = '' }, 600)
  }

  return (
    <div
      ref={cardRef}
      className="engine-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Hover glow orb */}
      <div ref={glowRef} className="engine-card-glow" />

      {/* Number */}
      <p className="engine-card-number">{engine.num}</p>

      {/* Icon */}
      <div className="engine-card-icon" aria-hidden="true">
        {engine.icon}
      </div>

      {/* Name */}
      <h3 className="engine-card-name">{engine.name}</h3>

      {/* Tagline */}
      <p className="engine-card-tagline">{engine.tagline}</p>

      {/* Capabilities */}
      <ul className="engine-card-capabilities">
        {engine.capabilities.map(cap => (
          <li key={cap}>{cap}</li>
        ))}
      </ul>

      {/* Footer */}
      <div className="engine-card-footer">
        <span className={`badge ${status.cls}`}>
          <span className="badge-dot" />
          {status.label}
        </span>
        <Link href={engine.href} className="engine-card-more" id={`engine-more-${engine.num}`}>
          Explore <span>→</span>
        </Link>
      </div>
    </div>
  )
}
