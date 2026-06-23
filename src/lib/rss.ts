// RSS 2.0은 단순 고정 XML 구조라 외부 피드 라이브러리 없이 템플릿 리터럴 + 엔티티 이스케이프로 생성한다.
import type { PostMeta } from '@/types/post'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/seo'

// &를 가장 먼저 치환해야 이후 치환 결과(&lt; 등)의 &가 다시 이스케이프되지 않는다.
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function toRfc822(date: string): string {
  return new Date(date).toUTCString()
}

// siteConfig.locale(ko_KR) → RSS <language> 표기(ko-kr). siteConfig에 새 필드를 추가하지 않는다.
function toRssLanguage(locale: string): string {
  return locale.toLowerCase().replace('_', '-')
}

function buildItem(post: PostMeta): string {
  const url = absoluteUrl(`/writing/${post.slug}`)
  const categories = post.tags
    .map(tag => `      <category>${escapeXml(tag)}</category>`)
    .join('\n')

  return [
    '    <item>',
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${toRfc822(post.date)}</pubDate>`,
    `      <description>${escapeXml(post.description)}</description>`,
    ...(categories ? [categories] : []),
    '    </item>',
  ].join('\n')
}

export function buildRssFeed(posts: PostMeta[]): string {
  const homeUrl = absoluteUrl('/')
  const feedUrl = absoluteUrl('/feed.xml')
  const lastBuildDate = posts.length > 0 ? toRfc822(posts[0].date) : new Date().toUTCString()

  const items = posts.map(buildItem).join('\n')

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(siteConfig.name)}</title>`,
    `    <link>${homeUrl}</link>`,
    `    <description>${escapeXml(siteConfig.description)}</description>`,
    `    <language>${toRssLanguage(siteConfig.locale)}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
    ...(items ? [items] : []),
    '  </channel>',
    '</rss>',
  ].join('\n')
}
