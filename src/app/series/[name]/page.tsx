import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getPostMetaList } from '@/lib/mdx'
import { getSeriesCategory, getSeriesSummaries, sortSeriesPosts, toSeriesSlug } from '@/lib/series'
import { buildMetadata } from '@/lib/seo'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { PostCard } from '@/components/writing/post-card'
import { Heading } from '@/components/ui/heading'
import type { PostMeta } from '@/types/post'

type Props = { params: Promise<{ name: string }> }

const SERIES_DIR = path.join(process.cwd(), 'src/content/series')

export function generateStaticParams() {
  const summaries = getSeriesSummaries(getPostMetaList())
  const seriesSlugs = summaries.map(s => s.slug)
  const categorySlugs = summaries
    .filter(s => s.category !== '')
    .map(s => toSeriesSlug(s.category))
  return [...new Set([...seriesSlugs, ...categorySlugs])].map(name => ({ name }))
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
  const { name: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const posts = getPostMetaList()

  const category = getSeriesCategory(slug, posts)
  if (category) {
    return buildMetadata({
      title: `${category.name} 시리즈`,
      description: `${category.name} 시리즈에 속한 글 목록`,
      path: `/series/${slug}`,
    })
  }

  const name = findSeriesName(slug)
  if (!name) return {}

  return buildMetadata({
    title: `${name} 시리즈`,
    description: `${name} 시리즈에 속한 글 목록`,
    path: `/series/${slug}`,
  })
}

// 번호가 매겨진 글 목록 — 단일 시리즈와 카테고리 섹션 양쪽에서 재사용한다.
function PostOrderedList({ posts }: { posts: PostMeta[] }) {
  return (
    <ol className="flex flex-col divide-y divide-hairline dark:divide-ink-muted-80">
      {posts.map((post, index) => (
        <li key={post.slug} className="flex gap-3.5">
          <span className="w-5 flex-none pt-lg text-sm text-ink-muted-48 dark:text-body-muted">
            {index + 1}
          </span>
          <div className="flex-1">
            <PostCard post={post} showTags={false} showDate />
          </div>
        </li>
      ))}
    </ol>
  )
}

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="breadcrumb" className="mb-6 text-xs tracking-[-0.12px] text-ink-muted-48">
      <Link href="/" className="text-primary hover:underline dark:text-primary-on-dark">홈</Link>
      <span aria-hidden="true"> / </span>
      <Link href="/writing" className="text-primary hover:underline dark:text-primary-on-dark">글</Link>
      <span aria-hidden="true"> / </span>
      <span>{name}</span>
    </nav>
  )
}

export default async function SeriesDetailPage({ params }: Props) {
  const { name: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const posts = getPostMetaList()

  // 카테고리(예: 알고리즘) — 소속 시리즈를 subtitle 섹션으로 나눠 보여준다
  const category = getSeriesCategory(slug, posts)
  if (category) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb name={category.name} />

        <Heading as="h1" size="md" className="mb-2">{category.name}</Heading>
        <p className="mb-9 text-sm tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted">
          {`${category.count}편`}
        </p>

        <div className="flex flex-col gap-10">
          {category.sections.map(section => (
            <section key={section.slug}>
              <Heading as="h2" size="sm" className="mb-4">{section.name}</Heading>
              <PostOrderedList posts={section.posts} />
            </section>
          ))}
        </div>
      </main>
    )
  }

  // 단일 시리즈
  const name = findSeriesName(slug)
  if (!name) notFound()

  const seriesPosts = sortSeriesPosts(posts.filter(p => p.series === name))
  const intro = await renderSeriesIntro(slug)

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumb name={name} />

      <Heading as="h1" size="md" className="mb-2">{name}</Heading>
      <p className="mb-7 text-sm tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted">
        {`${seriesPosts.length}편`}
      </p>

      {intro && (
        <div className="mb-9 rounded-lg bg-canvas-parchment p-6 dark:bg-surface-tile-2">
          <p className="sr-only">
            시리즈 소개
          </p>
          <div className="text-md leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:text-body-muted">
            {intro}
          </div>
        </div>
      )}

      <Heading size="sm" className="sr-only">글 목록</Heading>
      <PostOrderedList posts={seriesPosts} />
    </main>
  )
}
