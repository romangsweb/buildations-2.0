'use client'
import { useEffect } from 'react'

export default function HubSpotForm() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/51346021.js'
    script.defer = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="hs-form-frame"
      data-region="na1"
      data-form-id="0e5436e6-719d-4936-a18f-12af2ce2ed50"
      data-portal-id="51346021"
    />
  )
}
