'use client'
import { useEffect, useRef } from 'react'
import styles from './LatexRenderer.module.css'

interface Props {
  content: string
}

declare global {
  interface Window {
    katex: any
  }
}

export default function LatexRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !content) return

    const render = () => {
      if (!ref.current || !window.katex) return
      const katex = window.katex
      let html = ref.current.innerHTML

      html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
        try { return `<div class="katex-block">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>` }
        catch { return `<div class="katex-error">${math}</div>` }
      })

      html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
        try { return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false }) }
        catch { return `<span class="katex-error">${math}</span>` }
      })

      html = html.replace(/\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g, (_, math) => {
        try { return `<div class="katex-block">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>` }
        catch { return `<div class="katex-error">${math}</div>` }
      })

      ref.current.innerHTML = html
    }

    if (window.katex) {
      render()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
      script.onload = render
      document.head.appendChild(script)
    }
  }, [content])

  const toHtml = (text: string) => {
    if (!text) return ''
    return text.split('\n\n').map(para => {
      if (para.startsWith('## ')) return `<h2>${para.replace(/^## /, '')}</h2>`
      if (para.startsWith('# ')) return `<h1>${para.replace(/^# /, '')}</h1>`
      if (para.startsWith('- ') || para.startsWith('* ')) {
        const items = para.split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('')
        return `<ul>${items}</ul>`
      }
      return `<p>${para}</p>`
    }).join('')
  }

  return (
    <div ref={ref} className={styles.latex}
      dangerouslySetInnerHTML={{ __html: toHtml(content) }} />
  )
}
