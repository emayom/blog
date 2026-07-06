import type { Metadata } from 'next'
import { getPostMetaList } from '@/lib/mdx'
import { getArchiveCounts } from '@/lib/archive'
import { getLibraryItemsByType } from '@/lib/library'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/home/hero'
import { MagnifierHero } from '@/components/home/magnifier-hero'
import { RecentPosts } from '@/components/home/recent-posts'
import { ArchiveSidebar } from '@/components/home/archive-sidebar'

export const metadata: Metadata = buildMetadata({
  description: '개발하며 배운 것, 읽고 생각한 것들을 기록합니다.',
  path: '/',
})

/* 히어로 문진에 깔리는 최근 읽은 책의 글귀 — 캔버스와 스크린리더 양쪽에 재사용 */
const HERO_QUOTE
  = '검은 티티새가 담장 위에 앉아 있다. 부리는 노랗고 눈은 반짝인다. 그 존재 자체로 빛나고, 스스로도 자기 존재에 만족하는 듯하다. 이 작은 새는 언제나 자신의 삶을 산다. 우리도 저 티티새처럼 자기 자신과 삶을 있는 그대로 받아들이고 만족해한다면, 하루하루가 좀 더 가벼울 수 있을까? (4) \'털갈이 이클립스\'는 날아오름을 멈추고 깃털이 다시 자라기를 고요히 기다리는 순간을 묘사하는 멋진 은유다. 새들은 자신의 연약함을 알기에 눈에 띄지않게 가만히 인내하고 기다린다. 새 깃털이 돋아나 힘과 아름다움을 되찾을 그날을 말이다. (12) 매일 새롭게 펼쳐지는 자연의 조건에 적응하며 살아가는 새들에게 \'지루한 일상\'이란 있을 수 없다. (25) 나쁜 습관은 삶을 단조롭고 무기력하게 만들지만, 좋은 습관은 삶을 정도해주고 흘러가는 시간을 온전히 느낄 수 있게 한다. 해마다 같은 곳에 둥지를 트는 새에게도, 아름다운 추억이 깃든 장소를 다시 찾는 인간에게도 좋은 습관은 필요하다. (29) 새들은 \'망설임\'이라는 것을 거의. 아니 전혀 모르는 듯 하다. (65)'

export default function Home() {
  const posts = getPostMetaList()
  const years = getArchiveCounts(posts)
  const nowReading = getLibraryItemsByType('book')[0]

  return (
    <div className="mx-auto max-w-4xl px-6">
      <Hero latestPost={posts[0]} nowReading={nowReading}>
        <h1 className="sr-only">읽고 / 만들고 / 씁니다</h1>
        <MagnifierHero body={HERO_QUOTE} />
      </Hero>
      <div className="grid grid-cols-1 gap-12 pb-20 md:grid-cols-2">
        <RecentPosts posts={posts} className="md:col-span-2" />
        <ArchiveSidebar years={years} />
      </div>
    </div>
  )
}
