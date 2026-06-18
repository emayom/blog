import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostMetaList } from '@/lib/mdx'
import { getTagCounts } from '@/lib/tags'
import { PostList } from '@/components/writing/post-list'
import { PostListSkeleton } from '@/components/writing/post-list-skeleton'

export const metadata: Metadata = {
  title: '글',
  description: '배우고 기록한 글 목록',
}

export default function WritingPage() {
  const posts = getPostMetaList()
  const tags = getTagCounts(posts)

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-4 text-xs tracking-[-0.12px] text-ink-muted-48">
        <Link href="/" className="text-primary dark:text-primary-on-dark">
          홈
        </Link>
        <span aria-hidden="true"> / 글</span>
      </nav>

      <h1 className="mb-2 font-display text-[40px] font-semibold leading-[1.1] text-ink dark:text-body-on-dark">
        글
      </h1>
      <p className="mb-7 text-[17px] text-ink-muted-80 dark:text-body-muted">
        배우고 기록한 것들을 모았습니다.
      </p>

      {/* useSearchParams를 쓰는 PostList는 Suspense 경계 필수 (Next.js 16 빌드 요구) */}
      <Suspense fallback={<PostListSkeleton />}>
        <PostList posts={posts} tags={tags} />
      </Suspense>
    </main>
  )
}
