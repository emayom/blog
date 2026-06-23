import { expect, test } from '@playwright/test'

const SITE_URL = 'https://ayounglim.dev'

test.describe('RSS 피드 (/feed.xml)', () => {
  test('200과 application/rss+xml content-type을 반환한다', async ({ request }) => {
    const res = await request.get('/feed.xml')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('application/rss+xml')
  })

  test('본문이 RSS 2.0 채널 구조를 가진다', async ({ request }) => {
    const res = await request.get('/feed.xml')
    const body = await res.text()

    expect(body.startsWith('<?xml')).toBe(true)
    expect(body).toContain('<rss version="2.0"')
    expect(body).toContain('<channel>')
    expect(body).toMatch(/<item>/)
    expect(body).toContain(SITE_URL)
    expect(body).not.toContain('localhost')
  })

  test('XML이 well-formed로 파싱된다(이스케이프 회귀 방지)', async ({ request, page }) => {
    const res = await request.get('/feed.xml')
    const body = await res.text()

    const parseError = await page.evaluate((xml) => {
      const doc = new DOMParser().parseFromString(xml, 'application/xml')
      return doc.querySelector('parsererror') ? doc.querySelector('parsererror')?.textContent : null
    }, body)

    expect(parseError).toBeNull()
  })

  test('홈 head에 RSS alternate link가 있다', async ({ page }) => {
    await page.goto('/')
    const rssLink = page.locator('head link[type="application/rss+xml"]')
    await expect(rssLink).toHaveCount(1)
    await expect(rssLink).toHaveAttribute('href', `${SITE_URL}/feed.xml`)
  })
})
