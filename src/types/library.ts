import type { ReactNode } from 'react'

export type LibraryType = 'book' | 'anime'

export interface LibraryItemFrontmatter {
  title: string
  type: LibraryType
  date?: string
  rating?: number
  cover?: string
  author?: string
  genres?: string[]
  /* 공유하고 싶은 문장(밑줄) — 홈 히어로 글귀·상세 문장 섹션에 쓰인다. 본문(감상)과 구분 */
  quotes?: string[]
  status?: string
  id?: string
  series?: string
  width?: number
  height?: number
  featured?: boolean
  draft: boolean
}

export interface LibraryItemMeta extends LibraryItemFrontmatter {
  slug: string
  seriesCount?: number
  seriesItems?: LibraryItemMeta[]
}

export interface LibraryItem extends LibraryItemMeta {
  content: ReactNode
}
