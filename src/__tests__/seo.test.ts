import { describe, expect, it } from 'vitest'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

describe('absoluteUrl', () => {
  it('루트 경로는 siteConfig.url을 그대로 반환한다', () => {
    expect(absoluteUrl('/')).toBe(siteConfig.url)
  })

  it('경로를 siteConfig.url에 결합한다', () => {
    expect(absoluteUrl('/writing')).toBe(`${siteConfig.url}/writing`)
  })

  it('선행 슬래시가 없어도 결합한다', () => {
    expect(absoluteUrl('writing')).toBe(`${siteConfig.url}/writing`)
  })

  it('중복 슬래시를 만들지 않는다', () => {
    expect(absoluteUrl('/about')).not.toContain('//about')
  })

  it('localhost를 포함하지 않는다', () => {
    expect(absoluteUrl('/writing')).not.toContain('localhost')
  })
})

describe('buildMetadata', () => {
  it('canonical은 siteConfig.url 기반 절대 경로다', () => {
    const meta = buildMetadata({ description: '설명', path: '/writing' })
    expect(meta.alternates?.canonical).toBe(`${siteConfig.url}/writing`)
  })

  it('canonical은 localhost를 포함하지 않는다', () => {
    const meta = buildMetadata({ description: '설명', path: '/' })
    expect(String(meta.alternates?.canonical)).not.toContain('localhost')
  })

  it('title과 description을 채운다', () => {
    const meta = buildMetadata({ title: '글', description: '설명', path: '/writing' })
    expect(meta.title).toBe('글')
    expect(meta.description).toBe('설명')
  })

  it('title이 없으면 title을 설정하지 않는다(레이아웃 default 사용)', () => {
    const meta = buildMetadata({ description: '설명', path: '/' })
    expect(meta.title).toBeUndefined()
  })

  it('openGraph를 title/description/url로 채운다', () => {
    const meta = buildMetadata({ title: '글', description: '설명', path: '/writing' })
    expect(meta.openGraph?.title).toBe('글')
    expect(meta.openGraph?.description).toBe('설명')
    expect(meta.openGraph?.url).toBe(`${siteConfig.url}/writing`)
  })

  it('기본 openGraph type은 website다', () => {
    const meta = buildMetadata({ description: '설명', path: '/' })
    const og = meta.openGraph as { type?: string }
    expect(og.type).toBe('website')
  })

  it('article type일 때 publishedTime과 tags를 채운다', () => {
    const meta = buildMetadata({
      title: '글',
      description: '설명',
      path: '/writing/foo',
      type: 'article',
      publishedTime: '2026-01-01',
      tags: ['react', 'nextjs'],
    })
    const og = meta.openGraph as { type?: string, publishedTime?: string, tags?: string[] }
    expect(og.type).toBe('article')
    expect(og.publishedTime).toBe('2026-01-01')
    expect(og.tags).toEqual(['react', 'nextjs'])
  })

  it('openGraph.images를 지정하지 않는다(opengraph-image 파일 자동 주입과 중복 방지)', () => {
    const meta = buildMetadata({ title: '글', description: '설명', path: '/writing' })
    expect(meta.openGraph?.images).toBeUndefined()
  })
})
