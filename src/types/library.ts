export type LibraryType = 'book' | 'anime'

export interface LibraryItemFrontmatter {
  title: string
  type: LibraryType
  date?: string
  rating?: number
  cover?: string
  author?: string
  genres?: string[]
  status?: string
  id?: string
  width?: number
  height?: number
  featured?: boolean
  draft: boolean
}

export interface LibraryItemMeta extends LibraryItemFrontmatter {
  slug: string
}
