import type { ReactElement } from 'react'

export interface TocItem {
  id: string
  text: string
  depth: 2 | 3
}

export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  draft: boolean
  featured: boolean
  description: string
  thumbnail: string
  series?: string
  seriesOrder?: number
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: number
}

export interface Post extends PostMeta {
  content: ReactElement
  toc: TocItem[]
}
