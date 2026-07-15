import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllLibraryItems, getLibraryBody, getLibraryItem } from '@/lib/library'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { buildBreadcrumbJsonLd } from '@/lib/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { LibraryDetail } from '@/components/library/library-detail'

// Next.js 16: params는 Promise — await 필수
type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllLibraryItems().map(item => ({ slug: item.slug }))
}

// generateStaticParams에 없는 경로(prod의 draft 포함)는 404
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = await getLibraryItem(slug)
  if (!item) return {}

  return buildMetadata({
    title: item.title,
    description: item.author ? `${item.title} — ${item.author}` : item.title,
    path: `/library/${slug}`,
  })
}

export default async function LibraryItemPage({ params }: Props) {
  const { slug } = await params
  const item = await getLibraryItem(slug)
  if (!item) notFound()

  const hasBody = getLibraryBody(slug).length > 0
  const backHref = item.type === 'book' ? '/library?type=book' : '/library'

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: '홈', url: absoluteUrl('/') },
          { name: '책장', url: absoluteUrl(backHref) },
          { name: item.title, url: absoluteUrl(`/library/${slug}`) },
        ])}
      />
      <LibraryDetail item={item} hasBody={hasBody} />
    </>
  )
}
