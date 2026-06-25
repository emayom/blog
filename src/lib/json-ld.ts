import type {
  BlogPostingJsonLd,
  BreadcrumbItemInput,
  BreadcrumbListJsonLd,
  PersonJsonLd,
  WebSiteJsonLd,
} from '@/types/json-ld'
import { siteConfig, social } from '@/config/site'
import { absoluteUrl } from '@/lib/seo'

// social 링크 중 실제 외부 프로필 URL만 추린다.
// 현재 social href는 모두 placeholder('#')라 빈 배열이 된다.
export function collectSameAs(): string[] {
  return social
    .map(item => item.href)
    .filter(href => /^https?:\/\//.test(href))
}

export function buildWebSiteJsonLd(): WebSiteJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteConfig.name,
    'url': absoluteUrl('/'),
  }
}

export function buildPersonJsonLd(opts?: { includeContext?: boolean }): PersonJsonLd {
  const sameAs = collectSameAs()
  return {
    // 중첩 author로 쓰일 땐 @context를 생략한다(BlogPosting이 이미 컨텍스트를 선언).
    ...(opts?.includeContext ? { '@context': 'https://schema.org' as const } : {}),
    '@type': 'Person',
    'name': siteConfig.name,
    'url': absoluteUrl('/about'),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

export function buildBlogPostingJsonLd(post: {
  slug: string
  title: string
  date: string
  tags: string[]
  description?: string
  updated?: string
}): BlogPostingJsonLd {
  const url = absoluteUrl(`/writing/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'datePublished': post.date,
    'dateModified': post.updated ?? post.date,
    'author': buildPersonJsonLd(),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
    'image': absoluteUrl(`/writing/${post.slug}/opengraph-image`),
    url,
    'mainEntityOfPage': url,
  }
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItemInput[]): BreadcrumbListJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  }
}
