import { getActiveImages } from '@/lib/payload'
import HeroClient from './HeroClient'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1800&q=90',
  'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=1800&q=90',
  'https://images.unsplash.com/photo-1482189349482-56c6e7e295eb?w=1800&q=90',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1800&q=90',
]

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.buildations.com'

export default async function Hero() {
  let images = FALLBACK_IMAGES
  try {
    const activeImages = await getActiveImages()
    if (activeImages && activeImages.length > 0) {
      images = activeImages.map((img: any) => {
        const url = img.image?.url || ''
        return url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
      })
    }
  } catch {
    // usa fallback
  }
  return <HeroClient images={images} />
}
