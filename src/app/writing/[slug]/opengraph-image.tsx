import { ImageResponse } from 'next/og'
import { getPostBySlug, getPostMetaList } from '@/lib/mdx'
import { formatDate } from '@/lib/format-date'
import { loadOgFonts, renderOgCard } from '@/lib/og'
import { siteConfig } from '@/config/site'

export const alt = `${siteConfig.name} 글`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// prod draft 제외와 일관되게 발행 글 슬러그만 정적 생성한다.
export function generateStaticParams() {
  return getPostMetaList().map(post => ({ slug: post.slug }))
}

type Props = { params: Promise<{ slug: string }> }

function buildMeta(date: string, tags: string[]): string {
  const parts = [formatDate(date)]
  if (tags[0]) parts.push(`#${tags[0]}`)
  return parts.join('  ·  ')
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const fonts = await loadOgFonts()

  const title = post?.title ?? siteConfig.name
  const meta = post ? buildMeta(post.date, post.tags) : undefined

  return new ImageResponse(
    renderOgCard({ title, meta }),
    { ...size, fonts },
  )
}
