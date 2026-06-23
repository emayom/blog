import { getPostMetaList } from '@/lib/mdx'
import { buildRssFeed } from '@/lib/rss'

// Route Handler GET 기본이 dynamic이라(v15-RC+), 명시하지 않으면 빌드 시 정적 생성되지 않고 매 요청 SSR된다.
export const dynamic = 'force-static'

export function GET(): Response {
  const feed = buildRssFeed(getPostMetaList())

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
