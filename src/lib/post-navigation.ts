import type { PostMeta } from '@/types/post'
import type { AdjacentPosts } from '@/types/post-navigation'

// 입력은 날짜 내림차순(getPostMetaList 결과). 목록상 최신이 next, 과거가 prev다.
export function getAdjacentPosts(posts: PostMeta[], slug: string): AdjacentPosts {
  const index = posts.findIndex(post => post.slug === slug)
  if (index === -1) return { prev: null, next: null }

  return {
    next: posts[index - 1] ?? null,
    prev: posts[index + 1] ?? null,
  }
}

// 태그 겹침 수 내림차순, 동점은 날짜 내림차순(localeCompare) tie-break. 자기 자신·겹침 0은 제외.
export function getRelatedPosts(posts: PostMeta[], slug: string, limit = 3): PostMeta[] {
  const current = posts.find(post => post.slug === slug)
  if (!current) return []

  const currentTags = new Set(current.tags)
  if (currentTags.size === 0) return []

  return posts
    .filter(post => post.slug !== slug)
    .map(post => ({
      post,
      overlap: post.tags.reduce((count, tag) => count + (currentTags.has(tag) ? 1 : 0), 0),
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map(({ post }) => post)
}
