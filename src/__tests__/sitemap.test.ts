import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { siteConfig } from '@/config/site'

describe('sitemap', () => {
  const entries = sitemap()

  it('모든 URL은 siteConfig.url(https://ayounglim.dev) prefix를 가진다', () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(siteConfig.url)).toBe(true)
    }
  })

  it('localhost를 포함하지 않는다', () => {
    for (const entry of entries) {
      expect(entry.url).not.toContain('localhost')
    }
  })

  it('정적 경로(홈, /writing, /about)를 포함한다', () => {
    const urls = entries.map(e => e.url)
    expect(urls).toContain(siteConfig.url)
    expect(urls).toContain(`${siteConfig.url}/writing`)
    expect(urls).toContain(`${siteConfig.url}/about`)
  })

  it('홈 priority는 1.0, /writing은 0.6이다', () => {
    const home = entries.find(e => e.url === siteConfig.url)
    const writing = entries.find(e => e.url === `${siteConfig.url}/writing`)
    expect(home?.priority).toBe(1.0)
    expect(writing?.priority).toBe(0.6)
  })

  it('글 경로(/writing/[slug])를 동적으로 포함하며 priority는 0.8이다', () => {
    const posts = entries.filter(
      e => e.url.startsWith(`${siteConfig.url}/writing/`),
    )
    expect(posts.length).toBeGreaterThan(0)
    for (const post of posts) {
      expect(post.priority).toBe(0.8)
    }
  })

  it('태그/아카이브 경로의 priority는 0.4다', () => {
    const tagOrArchive = entries.filter(
      e =>
        e.url.startsWith(`${siteConfig.url}/tag/`)
        || e.url.startsWith(`${siteConfig.url}/archive/`),
    )
    for (const entry of tagOrArchive) {
      expect(entry.priority).toBe(0.4)
    }
  })

  it('draft 글(_ prefix 픽스처)을 포함하지 않는다', () => {
    const urls = entries.map(e => e.url)
    expect(urls.some(u => u.includes('_draft'))).toBe(false)
    expect(urls.some(u => u.includes('/writing/_'))).toBe(false)
  })

  it('글 항목은 lastModified를 Date로 가진다', () => {
    const post = entries.find(
      e => e.url.startsWith(`${siteConfig.url}/writing/`),
    )
    expect(post?.lastModified).toBeInstanceOf(Date)
  })
})
