import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostMetaList } from '@/lib/mdx'
import { getArchiveCounts } from '@/lib/archive'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { buildBreadcrumbJsonLd } from '@/lib/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { FolderCard } from '@/components/archive/folder-card'
import { Heading } from '@/components/ui/heading'

export const metadata: Metadata = buildMetadata({
  title: '아카이브',
  description: '연도별 글 아카이브',
  path: '/archive',
})

export default function ArchivePage() {
  const posts = getPostMetaList()
  const years = getArchiveCounts(posts)

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: '홈', url: absoluteUrl('/') },
          { name: '아카이브', url: absoluteUrl('/archive') },
        ])}
      />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <nav aria-label="breadcrumb" className="mb-4 text-xs tracking-[-0.12px] text-ink-muted-48">
          <Link href="/" className="text-primary dark:text-primary-on-dark">홈</Link>
          <span aria-hidden="true"> / </span>
          <span>아카이브</span>
        </nav>

        <Heading as="h1" size="lg" className="mb-[22px]">아카이브</Heading>

        {years.length === 0
          ? (
              <p className="text-[14px] text-ink-muted-48 dark:text-body-muted">
                아직 작성한 글이 없습니다.
              </p>
            )
          : (
              <div className="flex flex-wrap gap-2">
                {years.map(({ year, count }) => (
                  <FolderCard key={year} year={year} count={count} />
                ))}
              </div>
            )}
      </main>
    </>
  )
}
