import { ImageResponse } from 'next/og'
import { loadOgFonts, renderOgCard } from '@/lib/og'
import { siteConfig } from '@/config/site'

export const alt = `${siteConfig.name} — ${siteConfig.description}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fonts = await loadOgFonts()

  return new ImageResponse(
    renderOgCard({ subtitle: siteConfig.description }),
    { ...size, fonts },
  )
}
