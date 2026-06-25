export interface WebSiteJsonLd {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  'name': string
  'url': string
}

export interface PersonJsonLd {
  '@context'?: 'https://schema.org'
  '@type': 'Person'
  'name': string
  'url': string
  'sameAs'?: string[]
}

export interface BlogPostingJsonLd {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting'
  'headline': string
  'datePublished': string
  'dateModified': string
  'author': PersonJsonLd
  'keywords'?: string
  'image'?: string
  'url': string
  'mainEntityOfPage': string
}

export interface BreadcrumbItemInput {
  name: string
  url: string
}

export interface BreadcrumbListItemJsonLd {
  '@type': 'ListItem'
  'position': number
  'name': string
  'item': string
}

export interface BreadcrumbListJsonLd {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  'itemListElement': BreadcrumbListItemJsonLd[]
}

export type JsonLdData
  = | WebSiteJsonLd
    | PersonJsonLd
    | BlogPostingJsonLd
    | BreadcrumbListJsonLd
