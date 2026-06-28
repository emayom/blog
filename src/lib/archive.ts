import type { PostMeta } from '@/types/post'
import type { YearCount } from '@/types/archive'
import type { TagCount } from '@/types/tag'
import { getTagCounts } from '@/lib/tags'

export function getPostsByYear(posts: PostMeta[], year: string): PostMeta[] {
  return posts.filter(post => post.date.startsWith(year))
}

// 해당 연도 글의 태그를 집계해 상위 limit개를 반환한다.
// 정렬(개수 내림차순·동순위 가나다순)은 getTagCounts에 위임한다.
export function getTopTagsByYear(posts: PostMeta[], year: string, limit = 5): TagCount[] {
  const yearPosts = getPostsByYear(posts, year)
  return getTagCounts(yearPosts).slice(0, limit)
}

// 연도별 글 수를 집계하여 연도 내림차순으로 반환한다.
export function getArchiveCounts(posts: PostMeta[]): YearCount[] {
  const counts = new Map<string, number>()

  for (const post of posts) {
    const year = post.date.slice(0, 4)
    if (!/^\d{4}$/.test(year)) continue
    counts.set(year, (counts.get(year) ?? 0) + 1)
  }

  return Array.from(counts, ([year, count]) => ({ year, count })).sort(
    (a, b) => b.year.localeCompare(a.year),
  )
}
