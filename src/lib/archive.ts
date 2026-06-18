import type { PostMeta } from '@/types/post'
import type { YearCount } from '@/types/archive'

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
