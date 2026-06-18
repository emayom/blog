import type { ReactElement } from 'react'

export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  draft: boolean
  description: string
  thumbnail: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: number
}

export interface Post extends PostMeta {
  content: ReactElement
}
