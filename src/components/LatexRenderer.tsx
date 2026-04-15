'use client'
import { useEffect, useRef } from 'react'
import styles from './LatexRenderer.module.css'

interface Props {
  content: string
}

export default function LatexRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !content) return

    const render = async () => {
      const katex = (await import('katex')).default
      if (!ref.current) return

      let html = ref.current.innerHTML

      // Block math $$...$$
      html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
        try {
          return `<div class="katex-block">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`
        } catch { return `<div class="katex-error">${math}</div>` }
      })

      // Inline math $...$
      html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false })
        } catch { return `<span class="katex-error">${math}</span>` }
      })

      // LaTeX \begin{equation}...\end{equation}
      html = html.replace(/\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g, (_, math) => {
        try {
          return `<div class="katex-block">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`
        } catch { return `<div class="katex-error">${math}</div>` }
      })

      ref.current.innerHTML = html
    }

    render()
  }, [content])

  const toHtml = (text: string) => {
    if (!text) return ''
    return text
      .split('\n\n')
      .map(para => {
        if (para.startsWith('## ')) return `<h2>${para.replace(/^## /, '')}</h2>`
        if (para.startsWith('# ')) return `<h1>${para.replace(/^# /, '')}</h1>`
        if (para.startsWith('- ') || para.startsWith('* ')) {
          const items = para.split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('')
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
