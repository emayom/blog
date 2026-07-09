import type { Metadata } from 'next'
import { getPostMetaList } from '@/lib/mdx'
import { getArchiveCounts } from '@/lib/archive'
import { getLibraryBody, getLibraryItemsByType } from '@/lib/library'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/home/hero'
import { MagnifierHero } from '@/components/home/magnifier-hero'
import { RecentPosts } from '@/components/home/recent-posts'
import { ArchiveSidebar } from '@/components/home/archive-sidebar'

export const metadata: Metadata = buildMetadata({
  description: '개발하며 배운 것, 읽고 생각한 것들을 기록합니다.',
  path: '/',
})

/* nowReading에 본문 감상이 없을 때의 히어로 폴백 문구 */
const HERO_FALLBACK = '읽고, 만들고, 씁니다.'

export default function Home() {
  const posts = getPostMetaList()
  const years = getArchiveCounts(posts)
  const nowReading = getLibraryItemsByType('book')[0]
  const heroBody = (nowReading ? getLibraryBody(nowReading.slug) : '') || HERO_FALLBACK

  return (
    <div className="mx-auto max-w-4xl px-6">
      <Hero latestPost={posts[0]} nowReading={nowReading}>
        <h1 className="sr-only">읽고 / 만들고 / 씁니다</h1>
        <MagnifierHero body={heroBody} />
      </Hero>
      <div className="grid grid-cols-1 gap-12 pb-20 md:grid-cols-2">
        <RecentPosts posts={posts} className="md:col-span-2" />
        <ArchiveSidebar years={years} />
      </div>
    </div>
  )
}
