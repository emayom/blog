export interface PageMetaInput {
  title?: string
  description: string
  path: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
}
