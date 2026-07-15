import type { Metadata } from 'next'
import { getPostMetaList } from '@/lib/mdx'
import { getArchiveCounts } from '@/lib/archive'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { buildBreadcrumbJsonLd } from '@/lib/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { FolderCard } from '@/components/archive/folder-card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
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
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb
          items={[
            { label: '홈', href: '/' },
            { label: '아카이브' },
          ]}
        />

        <Heading as="h1" size="md" className="mb-[22px]">아카이브</Heading>

        {years.length === 0
          ? (
              <p className="text-[14px] text-ink-muted-48 dark:text-body-muted">
                아직 작성한 글이 없습니다.
              </p>
            )
          : (
              <div className="grid grid-cols-4 gap-8 md:flex md:flex-wrap">
                {years.map(({ year, count }) => (
                  <FolderCard key={year} year={year} count={count} />
                ))}
              </div>
            )}
      </div>
    </>
  )
}
