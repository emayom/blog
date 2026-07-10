export interface NoteFrontmatter {
  date: string
  tags: string[]
  pinned: boolean
  draft: boolean
}

export interface NoteMeta extends NoteFrontmatter {
  slug: string
}
