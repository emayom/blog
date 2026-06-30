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

export interface SeriesSummary {
  name: string
  slug: string
  count: number
  latestDate: string
  thumbnail: string
  category: string
  categoryOrder: number
}

// writing 페이지의 시리즈 카드 단위. 카테고리는 하나로 합쳐지고, 카테고리 없는 시리즈는 그대로 카드가 된다.
export interface SeriesBrowseItem {
  name: string
  slug: string
  count: number
  thumbnail: string
}

// 카테고리 상세: 소속 시리즈를 subtitle 섹션으로 나눠 보여준다.
export interface SeriesCategorySection {
  name: string
  slug: string
  posts: PostMeta[]
}

export interface SeriesCategoryDetail {
  name: string
  slug: string
  count: number
  sections: SeriesCategorySection[]
}
