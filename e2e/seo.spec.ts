import { expect, test } from '@playwright/test'

const SITE_URL = 'https://ayounglim.dev'

test.describe('SEO 메타데이터', () => {
  test('홈에 description과 canonical, og:image가 있다', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('head meta[name="description"]')).toHaveCount(1)
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', SITE_URL)
    await expect(page.locator('head meta[property="og:image"]')).toHaveCount(1)
  })

  test('canonical은 절대 URL이며 localhost를 포함하지 않는다', async ({ page }) => {
    await page.goto('/writing')

    const canonical = page.locator('head link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${SITE_URL}/writing`)
    const href = await canonical.getAttribute('href')
    expect(href).not.toContain('localhost')
  })

  test('소개 페이지에 title과 canonical이 있다', async ({ page }) => {
    await page.goto('/about')

    await expect(page).toHaveTitle(/소개/)
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_URL}/about`,
    )
  })

  test('글 상세 페이지는 og:type article과 canonical을 가진다', async ({ page }) => {
    const slug = 'next-mdx-library-decision'
    await page.goto(`/writing/${slug}`)

    await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute(
      'content',
      'article',
    )
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_URL}/writing/${slug}`,
    )
  })

  test('sitemap.xml은 200이며 siteConfig URL을 포함한다', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const body = await res.text()
    expect(body).toContain(SITE_URL)
    expect(body).not.toContain('localhost')
  })

  test('robots.txt는 200이며 sitemap을 가리킨다', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.status()).toBe(200)
    const body = await res.text()
    expect(body).toContain(`${SITE_URL}/sitemap.xml`)
    expect(body.toLowerCase()).toContain('allow: /')
  })

  test('사이트 기본 OG 이미지는 200 PNG를 반환한다', async ({ request }) => {
    const res = await request.get('/opengraph-image')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('image/png')
  })
})

test.describe('JSON-LD 구조화 데이터', () => {
  test('홈에 WebSite JSON-LD가 파싱 가능하게 존재한다', async ({ page }) => {
    await page.goto('/')

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    const parsed = scripts.map(s => JSON.parse(s))
    const website = parsed.find(d => d['@type'] === 'WebSite')

    expect(website).toBeDefined()
    expect(website.url).toBe(SITE_URL)
    expect(website.name).toBeTruthy()
  })

  test('글 상세에 BlogPosting JSON-LD가 1개 존재하고 절대 URL을 가진다', async ({ page }) => {
    const slug = 'next-mdx-library-decision'
    await page.goto(`/writing/${slug}`)

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    const blogPostings = scripts
      .map(s => JSON.parse(s))
      .filter(d => d['@type'] === 'BlogPosting')

    expect(blogPostings).toHaveLength(1)
    const post = blogPostings[0]
    expect(post.headline).toBeTruthy()
    expect(post.image).toBe(`${SITE_URL}/writing/${slug}/opengraph-image`)
    expect(post.url).toBe(`${SITE_URL}/writing/${slug}`)
    expect(JSON.stringify(post)).not.toContain('localhost')
  })
})
