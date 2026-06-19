import type { PostMeta } from '@/types/post'

export interface AdjacentPosts {
  prev: PostMeta | null
  next: PostMeta | null
}
