'use client'
import { useEffect, useRef } from 'react'
import styles from './LatexRenderer.module.css'

interface Props {
  content: string
}

export default function LatexRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const renderLatex = async () => {
      const katex = (await import('katex')).default

      if (!ref.current) return

      // Process block math first: $$...$$
      let html = ref.current.innerHTML
      const blockRegex = /\$\$([\s\S]+?)\$\$/g
      html = html.replace(blockRegex, (_, math) => {
        try {
          return `<div class="katex-block">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`
        } catch {
          return `<div class="katex-block katex-error">${math}</div>`
        }
      })

      // Process inline math: $...$
      const inlineRegex = /\$([^\$\n]+?)\$/g
      html = html.replace(inlineRegex, (_, math) => {
        try {
          return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false })
        } catch {
          return `<span class="katex-error">${math}</span>`
        }
      })

      ref.current.innerHTML = html
    }

    renderLatex()
  }, [content])

  // Pre-process plain text to HTML
  const toHtml = (text: string) => {
    return text
      .split('\n\n')
      .map(para => {
        if (para.startsWith('##')) return `<h2>${para.replace(/^##\s*/, '')}</h2>`
        if (para.startsWith('#')) return `<h1>${para.replace(/^#\s*/, '')}</h1>`
        if (para.startsWith('- ') || para.startsWith('* ')) {
          const items = para.split('\n').map(l => `<li>${l.replace(/^[-*]\s*/, '')}</li>`).join('')
          return `<ul>${items}</ul>`
        }
        return `<p>${para}</p>`
      })
      .join('')
  }

  return (
    <div
      ref={ref}
      className={styles.latex}
      dangerouslySetInnerHTML={{ __html: toHtml(content) }}
    />
  )
}
