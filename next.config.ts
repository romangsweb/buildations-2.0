import type { NextConfig } from "next";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

async function getRedirects() {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/redirects?limit=200`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.docs || []).map((r: any) => ({
      source: r.from,
      destination: r.to,
      permanent: r.permanent ?? true,
    }))
  } catch {
    return []
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.buildations.com',
        pathname: '/api/media/file/**',
      },
    ],
  },
  async redirects() {
    return await getRedirects()
  },
}

export default nextConfig
