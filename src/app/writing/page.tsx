import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostMetaList } from '@/lib/mdx'
import { getTagCounts } from '@/lib/tags'
import { buildMetadata } from '@/lib/seo'
import { PostList } from '@/components/writing/post-list'
import { FeaturedPosts } from '@/components/writing/featured-posts'
import { SearchProvider } from '@/components/search/search-provider'
import { SearchTrigger } from '@/components/search/search-trigger'
import { Heading } from '@/components/ui/heading'

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
      <main className="mx-auto max-w-4xl px-6 py-12">
        <nav className="mb-4 text-xs tracking-[-0.12px] text-ink-muted-48">
          <Link href="/" className="text-primary dark:text-primary-on-dark">
            홈
          </Link>
          <span aria-hidden="true"> / 글</span>
        </nav>

        <div className="mb-2 flex items-center justify-between gap-4">
          <Heading as="h1" size="md">글</Heading>
          <SearchTrigger />
        </div>
        <p className="mb-7 text-[17px] text-ink-muted-80 dark:text-body-muted">
          개발, 경험, 생각을 기록합니다.
        </p>

        <FeaturedPosts posts={featured} />
        <PostList posts={posts} tags={tags} />
      </main>
    </SearchProvider>
  )
}
