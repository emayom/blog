import type { Metadata } from 'next'
import type { PageMetaInput } from '@/types/seo'
import { siteConfig } from '@/config/site'

// siteConfig.url 단일 소스로 절대 URL을 만든다. localhost/preview 하드코딩 없음.
export function absoluteUrl(path: string): string {
  if (path === '/' || path === '') return siteConfig.url
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${normalized}`
}

// openGraph.images는 의도적으로 지정하지 않는다.
// opengraph-image.tsx 메타 라우트가 해당 세그먼트의 og:image를 자동 주입하므로 중복을 피한다.
export function buildMetadata(input: PageMetaInput): Metadata {
  const { title, description, path, type = 'website', publishedTime, tags } = input
  const url = absoluteUrl(path)

  const metadata: Metadata = {
    description,
    alternates: { canonical: url },
    openGraph: {
      ...(title ? { title } : {}),
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(type === 'article'
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(tags && tags.length > 0 ? { tags } : {}),
          }
        : {}),
    },
  }

  if (title) metadata.title = title

  return metadata
}
