import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostMetaList } from '@/lib/mdx'
import { getTagCounts } from '@/lib/tags'
import { buildMetadata } from '@/lib/seo'
import { PostList } from '@/components/writing/post-list'
import { FeaturedPosts } from '@/components/writing/featured-posts'
import { SearchProvider } from '@/components/search/search-provider'
import { SearchTrigger } from '@/components/search/search-trigger'

export const metadata: Metadata = buildMetadata({
  title: '글',
  description: '배우고 기록한 글 목록',
  path: '/writing',
})

export default function WritingPage() {
  const posts = getPostMetaList()
  const tags = getTagCounts(posts)
  const featured = posts.filter(p => p.featured)

  return (
    <SearchProvider posts={posts}>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-4 text-xs tracking-[-0.12px] text-ink-muted-48">
          <Link href="/" className="text-primary dark:text-primary-on-dark">
            홈
          </Link>
          <span aria-hidden="true"> / 글</span>
        </nav>

        <div className="mb-2 flex items-center justify-between gap-4">
          <h1 className="font-display text-[40px] font-semibold leading-[1.1] text-ink dark:text-body-on-dark">
            글
          </h1>
          <SearchTrigger />
        </div>
        <p className="mb-7 text-[17px] text-ink-muted-80 dark:text-body-muted">
          배우고 기록한 것들을 모았습니다.
        </p>

        <FeaturedPosts posts={featured} />
        <PostList posts={posts} tags={tags} />
      </main>
    </SearchProvider>
  )
}
