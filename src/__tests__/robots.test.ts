import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import { siteConfig } from '@/config/site'

describe('robots', () => {
  const result = robots()

  it('모든 user-agent에 대해 루트를 allow한다', () => {
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules
    expect(rules?.userAgent).toBe('*')
    expect(rules?.allow).toBe('/')
  })

  it('sitemap을 siteConfig.url 기반 절대 URL로 가리킨다', () => {
    expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`)
  })

  it('host를 siteConfig.url로 설정한다', () => {
    expect(result.host).toBe(siteConfig.url)
  })

  it('localhost를 포함하지 않는다', () => {
    expect(JSON.stringify(result)).not.toContain('localhost')
  })
})
