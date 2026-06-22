import type { PostMeta } from '@/types/post'
import type { TagCount } from '@/types/tag'

export function getPostsByTag(posts: PostMeta[], tag: string): PostMeta[] {
  return posts.filter(post => post.tags.includes(tag))
}

// 개수 내림차순, 동일 개수는 가나다순(localeCompare)으로 정렬한다.
export function getTagCounts(posts: PostMeta[]): TagCount[] {
  const counts = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  )
}
