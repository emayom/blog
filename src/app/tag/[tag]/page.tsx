import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostMetaList } from '@/lib/mdx'
import { getTagCounts, getPostsByTag } from '@/lib/tags'
import { buildMetadata } from '@/lib/seo'
import { PostCard } from '@/components/writing/post-card'

type Props = { params: Promise<{ tag: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  const posts = getPostMetaList()
  return getTagCounts(posts).map(({ tag }) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  return buildMetadata({
    title: `#${tag}`,
    description: `'${tag}' 태그의 글 목록`,
    path: `/tag/${tag}`,
  })
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const posts = getPostMetaList()
  const filtered = getPostsByTag(posts, tag)
  if (filtered.length === 0) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav aria-label="breadcrumb" className="mb-4 text-xs tracking-[-0.12px] text-ink-muted-48">
        <Link href="/" className="text-primary dark:text-primary-on-dark">홈</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/writing" className="text-primary dark:text-primary-on-dark">글</Link>
        <span aria-hidden="true">
          {' '}
          / #
          {tag}
        </span>
      </nav>

      <Link
        href="/writing"
        className="mb-[18px] inline-block rounded-sm border border-hairline px-[17px] py-[7px] text-[14px] tracking-[-0.224px] text-ink-muted-80 transition-transform hover:border-ink-muted-48 hover:text-ink active:scale-95 dark:text-body-muted dark:hover:text-body-on-dark"
      >
        ← 모든 글
      </Link>

      <h1 className="mb-[22px] font-display text-[34px] font-semibold leading-[1.47] tracking-[-0.374px] text-ink dark:text-body-on-dark">
        #
        {tag}
        <span className="ml-2 text-[28px] font-normal text-ink-muted-48 dark:text-body-muted">
          (
          {filtered.length}
          )
        </span>
      </h1>

      <ul className="flex flex-col gap-3.5">
        {filtered.map(post => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  )
}
