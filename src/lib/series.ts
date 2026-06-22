import type { PostMeta } from '@/types/post'
import type { SeriesNavigation, SeriesPostItem } from '@/types/series-navigation'

// seriesOrder 오름차순 → date 오름차순 tie-break.
// seriesOrder 미존재(undefined)는 가장 뒤로 보내되 date로 정렬되게 한다.
export function sortSeriesPosts(posts: PostMeta[]): PostMeta[] {
  return [...posts].sort((a, b) => {
    const orderA = a.seriesOrder ?? Number.POSITIVE_INFINITY
    const orderB = b.seriesOrder ?? Number.POSITIVE_INFINITY
    if (orderA !== orderB) return orderA - orderB
    return a.date.localeCompare(b.date)
  })
}

// 현재 글과 같은 시리즈(대소문자 정확 일치) 글을 그룹핑·정렬해 네비게이션 정보를 만든다.
// 시리즈 미소속 / 같은 시리즈 글이 1개뿐이면 null.
export function getSeriesNavigation(
  posts: PostMeta[],
  slug: string,
): SeriesNavigation | null {
  const current = posts.find(post => post.slug === slug)
  if (!current) return null

  const seriesName = current.series
  if (typeof seriesName !== 'string' || seriesName === '') return null

  const grouped = posts.filter(post => post.series === seriesName)
  if (grouped.length < 2) return null

  const sorted = sortSeriesPosts(grouped)

  const items: SeriesPostItem[] = sorted.map((post, index) => ({
    post,
    order: index + 1,
    isCurrent: post.slug === slug,
  }))

  const currentItem = items.find(item => item.isCurrent)

  return {
    name: seriesName,
    total: items.length,
    currentPosition: currentItem?.order ?? 0,
    items,
  }
}
