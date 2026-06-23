import { describe, expect, it } from 'vitest'
import { buildRssFeed, escapeXml, toRfc822 } from '@/lib/rss'
import { siteConfig } from '@/config/site'
import type { PostMeta } from '@/types/post'

function makePost(overrides: Partial<PostMeta> = {}): PostMeta {
  return {
    title: '제목',
    date: '2026-01-15',
    tags: ['react', 'nextjs'],
    draft: false,
    description: '설명',
    thumbnail: '',
    readingTime: 3,
    slug: 'hello-world',
    ...overrides,
  }
}

describe('escapeXml', () => {
  it('& < > " \' 5종을 엔티티로 변환한다', () => {
    expect(escapeXml('&')).toBe('&amp;')
    expect(escapeXml('<')).toBe('&lt;')
    expect(escapeXml('>')).toBe('&gt;')
    expect(escapeXml('"')).toBe('&quot;')
    expect(escapeXml('\'')).toBe('&apos;')
  })

  it('&를 가장 먼저 처리해 이중 이스케이프하지 않는다', () => {
    expect(escapeXml('a & b < c')).toBe('a &amp; b &lt; c')
    expect(escapeXml('Tom & Jerry')).toBe('Tom &amp; Jerry')
    expect(escapeXml('&amp;')).toBe('&amp;amp;')
  })

  it('빈 문자열은 빈 문자열을 반환한다', () => {
    expect(escapeXml('')).toBe('')
  })
})

describe('toRfc822', () => {
  it('RFC822(toUTCString) 형식 문자열을 반환한다', () => {
    const result = toRfc822('2026-01-15')
    expect(result).toBe(new Date('2026-01-15').toUTCString())
    expect(result).toMatch(/GMT$/)
  })
})

describe('buildRssFeed', () => {
  it('item 개수가 posts 수와 같다', () => {
    const posts = [makePost({ slug: 'a' }), makePost({ slug: 'b' }), makePost({ slug: 'c' })]
    const xml = buildRssFeed(posts)
    const itemCount = (xml.match(/<item>/g) ?? []).length
    expect(itemCount).toBe(3)
  })

  it('각 link와 guid는 https://ayounglim.dev로 시작한다', () => {
    const posts = [makePost({ slug: 'first-post' })]
    const xml = buildRssFeed(posts)
    expect(xml).toContain(`<link>${siteConfig.url}/writing/first-post</link>`)
    expect(xml).toContain(`${siteConfig.url}/writing/first-post</guid>`)
    expect(xml).toContain('https://ayounglim.dev')
    expect(xml).not.toContain('localhost')
  })

  it('pubDate는 RFC822 형식이다', () => {
    const posts = [makePost({ date: '2026-01-15' })]
    const xml = buildRssFeed(posts)
    expect(xml).toContain(`<pubDate>${new Date('2026-01-15').toUTCString()}</pubDate>`)
  })

  it('category는 tags 수만큼 생성된다', () => {
    const posts = [makePost({ tags: ['react', 'nextjs', 'rss'] })]
    const xml = buildRssFeed(posts)
    const categoryCount = (xml.match(/<category>/g) ?? []).length
    expect(categoryCount).toBe(3)
    expect(xml).toContain('<category>react</category>')
  })

  it('특수문자가 포함된 제목을 이스케이프한다', () => {
    const posts = [makePost({ title: 'A & B < C > "D"' })]
    const xml = buildRssFeed(posts)
    expect(xml).toContain('A &amp; B &lt; C &gt; &quot;D&quot;')
    expect(xml).not.toContain('A & B < C')
  })

  it('빈 description과 빈 tags를 안전하게 처리한다', () => {
    const posts = [makePost({ description: '', tags: [] })]
    const xml = buildRssFeed(posts)
    expect((xml.match(/<category>/g) ?? []).length).toBe(0)
    expect(xml).toContain('<item>')
  })

  it('빈 posts 배열에도 valid 채널 구조를 생성한다', () => {
    const xml = buildRssFeed([])
    expect(xml).toContain('<?xml')
    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain('<channel>')
    expect((xml.match(/<item>/g) ?? []).length).toBe(0)
  })

  it('rss 루트와 채널 메타(title/link/description/language/atom self-link)를 포함한다', () => {
    const xml = buildRssFeed([makePost()])
    expect(xml).toContain('<?xml version="1.0" encoding="utf-8"?>')
    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain('xmlns:atom="http://www.w3.org/2005/Atom"')
    expect(xml).toContain('<language>ko-kr</language>')
    expect(xml).toContain(`<atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>`)
    expect(xml).toContain(`<link>${siteConfig.url}</link>`)
  })

  it('채널 title/description도 이스케이프 대상이다', () => {
    const xml = buildRssFeed([])
    expect(xml).not.toContain('Tom & Jerry')
  })
})
