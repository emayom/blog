import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostMetaList } from '@/lib/mdx'
import { getArchiveCounts, getPostsByYear, getTopTagsByYear } from '@/lib/archive'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { buildBreadcrumbJsonLd } from '@/lib/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { PostCard } from '@/components/writing/post-card'
import { Tag } from '@/components/writing/tag'
import { Heading } from '@/components/ui/heading'

type Props = { params: Promise<{ year: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  const posts = getPostMetaList()
  return getArchiveCounts(posts).map(({ year }) => ({ year }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params
  return buildMetadata({
    title: year,
    description: `${year}년에 작성한 글 목록`,
    path: `/archive/${year}`,
  })
}

export default async function ArchiveYearPage({ params }: Props) {
  const { year } = await params
  const posts = getPostMetaList()
  const filtered = getPostsByYear(posts, year)
  if (filtered.length === 0) notFound()

  const topTags = getTopTagsByYear(posts, year)

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: '홈', url: absoluteUrl('/') },
          { name: '아카이브', url: absoluteUrl('/archive') },
          { name: `${year}`, url: absoluteUrl(`/archive/${year}`) },
        ])}
      />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <nav aria-label="breadcrumb" className="mb-4 text-xs tracking-[-0.12px] text-ink-muted-48">
          <Link href="/" className="text-primary dark:text-primary-on-dark">홈</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/archive" className="text-primary dark:text-primary-on-dark">아카이브</Link>
          <span aria-hidden="true"> / </span>
          <span>{year}</span>
        </nav>

        <Heading as="h1" size="md" className="mb-[22px]">
          {year}
          <span className="ml-2 text-xl font-normal text-ink-muted-48 dark:text-body-muted">
            (
            {filtered.length}
            )
          </span>
        </Heading>

        {topTags.length > 0 && (
          <section className="mb-[22px]">
            <ul className="flex flex-wrap gap-2">
              {topTags.map(({ tag }) => (
                <li key={tag}>
                  <Tag href={`/tag/${tag}`} label={tag} variant="outline" size="md" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <ul className="flex flex-col divide-y divide-hairline dark:divide-ink-muted-80">
          {filtered.map(post => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
