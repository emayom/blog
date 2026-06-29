import type { Metadata } from 'next'
import { getPostMetaList } from '@/lib/mdx'
import { getArchiveCounts } from '@/lib/archive'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/home/hero'
import { RecentPosts } from '@/components/home/recent-posts'
import { ArchiveSidebar } from '@/components/home/archive-sidebar'

export const metadata: Metadata = buildMetadata({
  description: '개발하며 배운 것, 읽고 생각한 것들을 기록합니다.',
  path: '/',
})

export default function Home() {
  const posts = getPostMetaList()
  const years = getArchiveCounts(posts)

  return (
    <div className="mx-auto max-w-4xl px-6">
      <Hero />
      <div className="grid grid-cols-1 gap-12 pb-20 md:grid-cols-2">
        <RecentPosts posts={posts} className="md:col-span-2" />
        <ArchiveSidebar years={years} />
      </div>
    </div>
  )
}
