import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getPostMetaList } from '@/lib/mdx'
import { getSeriesSummaries, sortSeriesPosts } from '@/lib/series'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/format-date'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { Heading } from '@/components/ui/heading'
import type { PostMeta } from '@/types/post'

type Props = { params: Promise<{ name: string }> }

const SERIES_DIR = path.join(process.cwd(), 'src/content/series')

export function generateStaticParams() {
  return getSeriesSummaries(getPostMetaList()).map(s => ({ name: s.slug }))
}

export const dynamicParams = false

// slug로 시리즈명을 역조회. 2편 이상인 시리즈만 대상.
function findSeriesName(slug: string): string | null {
  const summary = getSeriesSummaries(getPostMetaList()).find(s => s.slug === slug)
  return summary?.name ?? null
}

async function renderSeriesIntro(slug: string) {
  const filePath = path.join(SERIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf-8')
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  })
  return content
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name: slug } = await params
  const name = findSeriesName(slug)
  if (!name) return {}

  return buildMetadata({
    title: `${name} 시리즈`,
    description: `${name} 시리즈에 속한 글 목록`,
    path: `/series/${slug}`,
  })
}

export default async function SeriesDetailPage({ params }: Props) {
  const { name: slug } = await params
  const name = findSeriesName(slug)
  if (!name) notFound()

  const posts = getPostMetaList()
  const seriesPosts: PostMeta[] = sortSeriesPosts(posts.filter(p => p.series === name))
  const intro = await renderSeriesIntro(slug)

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav aria-label="breadcrumb" className="mb-6 text-xs tracking-[-0.12px] text-ink-muted-48">
        <Link href="/" className="text-primary hover:underline dark:text-primary-on-dark">홈</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/writing" className="text-primary hover:underline dark:text-primary-on-dark">글</Link>
        <span aria-hidden="true"> / </span>
        <span>{name}</span>
      </nav>

      <Heading as="h1" size="xl" className="mb-2">{name}</Heading>
      <p className="mb-7 text-sm tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted">
        {`${seriesPosts.length}편`}
      </p>

      {intro && (
        <div className="mb-9 rounded-lg bg-canvas-parchment p-6 dark:bg-surface-tile-2">
          <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.4px] text-ink-muted-48 dark:text-body-muted">
            시리즈 소개
          </p>
          <div className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:text-body-muted">
            {intro}
          </div>
        </div>
      )}

      <Heading size="sm" className="mb-[18px]">글 목록</Heading>
      <ol className="list-none space-y-5">
        {seriesPosts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex items-baseline gap-3.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
            >
              <span className="w-5 flex-none text-sm text-ink-muted-48 dark:text-body-muted">
                {index + 1}
              </span>
              <span className="flex-1">
                <span className="block text-[17px] font-semibold leading-[1.24] tracking-[-0.374px] text-ink group-hover:text-primary dark:text-body-on-dark dark:group-hover:text-primary-on-dark">
                  {post.title}
                </span>
                <span className="mt-1.5 block text-sm text-ink-muted-48 dark:text-body-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true"> · </span>
                  <span>{`${post.readingTime}분 읽기`}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
