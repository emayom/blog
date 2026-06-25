import { describe, expect, it } from 'vitest'
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  collectSameAs,
} from '@/lib/json-ld'
import { serialize } from '@/components/seo/json-ld'
import { absoluteUrl } from '@/lib/seo'
import { siteConfig } from '@/config/site'

describe('buildWebSiteJsonLd', () => {
  it('WebSite 타입에 name/url을 채운다', () => {
    const data = buildWebSiteJsonLd()
    expect(data['@type']).toBe('WebSite')
    expect(data.url).toBe(absoluteUrl('/'))
    expect(data.name).toBe(siteConfig.name)
  })
})

describe('collectSameAs', () => {
  it('현재 placeholder social에서 빈 배열을 반환한다', () => {
    expect(collectSameAs()).toEqual([])
  })
})

describe('buildPersonJsonLd', () => {
  it('sameAs가 비면 키를 생략한다', () => {
    const person = buildPersonJsonLd()
    expect('sameAs' in person).toBe(false)
  })

  it('url은 /about 절대 경로다', () => {
    expect(buildPersonJsonLd().url).toBe(absoluteUrl('/about'))
  })

  it('includeContext=false(기본)일 때 @context를 포함하지 않는다', () => {
    expect('@context' in buildPersonJsonLd()).toBe(false)
  })

  it('includeContext=true일 때 @context를 포함한다', () => {
    expect(buildPersonJsonLd({ includeContext: true })['@context']).toBe('https://schema.org')
  })
})

describe('buildBlogPostingJsonLd', () => {
  const base = {
    slug: 'hello-world',
    title: '안녕 세계',
    date: '2026-01-01',
    tags: ['a', 'b'],
  }

  it('headline과 datePublished를 매핑한다', () => {
    const data = buildBlogPostingJsonLd(base)
    expect(data.headline).toBe('안녕 세계')
    expect(data.datePublished).toBe('2026-01-01')
  })

  it('updated 미제공 시 dateModified는 date와 같다', () => {
    expect(buildBlogPostingJsonLd(base).dateModified).toBe('2026-01-01')
  })

  it('updated 제공 시 dateModified는 그 값이다', () => {
    const data = buildBlogPostingJsonLd({ ...base, updated: '2026-02-02' })
    expect(data.dateModified).toBe('2026-02-02')
  })

  it('author는 Person이고 중첩 author엔 @context가 없다', () => {
    const data = buildBlogPostingJsonLd(base)
    expect(data.author['@type']).toBe('Person')
    expect('@context' in data.author).toBe(false)
  })

  it('keywords는 태그를 콤마로 잇는다', () => {
    expect(buildBlogPostingJsonLd(base).keywords).toBe('a, b')
  })

  it('빈 tags면 keywords 키를 생략한다', () => {
    const data = buildBlogPostingJsonLd({ ...base, tags: [] })
    expect('keywords' in data).toBe(false)
  })

  it('image/url/mainEntityOfPage는 절대 URL이며 localhost를 포함하지 않는다', () => {
    const data = buildBlogPostingJsonLd(base)
    expect(data.image).toBe(absoluteUrl('/writing/hello-world/opengraph-image'))
    expect(data.url).toBe(absoluteUrl('/writing/hello-world'))
    expect(data.mainEntityOfPage).toBe(absoluteUrl('/writing/hello-world'))
    expect(data.url).not.toContain('localhost')
  })
})

describe('buildBreadcrumbJsonLd', () => {
  it('position을 1부터 순차 부여하고 item은 절대 URL이다', () => {
    const data = buildBreadcrumbJsonLd([
      { name: '홈', url: absoluteUrl('/') },
      { name: '#react', url: absoluteUrl('/tag/react') },
    ])
    expect(data.itemListElement[0].position).toBe(1)
    expect(data.itemListElement[1].position).toBe(2)
    expect(data.itemListElement[1].item).toBe(absoluteUrl('/tag/react'))
  })
})

describe('serialize', () => {
  it('raw "<"를 이스케이프하지만 "<" 시퀀스는 존재한다', () => {
    const out = serialize({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': '<script>',
      'url': 'https://example.com',
    })
    expect(out).not.toContain('<')
    expect(out).toContain('\\u003c')
  })

  it('JSON.parse로 동일 데이터를 역직렬화한다', () => {
    const data = buildWebSiteJsonLd()
    expect(JSON.parse(serialize(data))).toEqual(data)
  })
})
