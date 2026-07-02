import type { Metadata } from 'next'
import { getPostMetaList } from '@/lib/mdx'
import { getArchiveCounts } from '@/lib/archive'
import { getLibraryItemsByType } from '@/lib/library'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/home/hero'
import { Heading } from '@/components/ui/heading'
import { RecentPosts } from '@/components/home/recent-posts'
import { ArchiveSidebar } from '@/components/home/archive-sidebar'

export const metadata: Metadata = buildMetadata({
  description: '개발하며 배운 것, 읽고 생각한 것들을 기록합니다.',
  path: '/',
})

export default function Home() {
  const posts = getPostMetaList()
  const years = getArchiveCounts(posts)
  const nowReading = getLibraryItemsByType('book')[0]

  return (
    <div className="mx-auto max-w-4xl px-6">
      <Hero latestPost={posts[0]} nowReading={nowReading}>
        <div className="relative mt-auto pt-8">
          <Heading as="h1" size="lg" className="leading-none text-balance text-ink dark:text-body-on-dark">
            읽고 / 만들고 / 씁니다
          </Heading>
          <p className="mt-3 text-sm leading-normal text-ink dark:text-body-on-dark">
            이것저것 읽습니다. 채운 것들이 쌓이면 만들어보고, 생각들은 종종 글로 씁니다.
          </p>
        </div>
      </Hero>
      <div className="grid grid-cols-1 gap-12 pb-20 md:grid-cols-2">
        <RecentPosts posts={posts} className="md:col-span-2" />
        <ArchiveSidebar years={years} />
      </div>
    </div>
  )
}
