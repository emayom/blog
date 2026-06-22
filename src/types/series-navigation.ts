import type { PostMeta } from '@/types/post'

export interface SeriesPostItem {
  post: PostMeta
  order: number
  isCurrent: boolean
}

export interface SeriesNavigation {
  name: string
  total: number
  currentPosition: number
  items: SeriesPostItem[]
}
