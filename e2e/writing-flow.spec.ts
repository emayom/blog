import { expect, test } from '@playwright/test'

test.describe('글 읽기 플로우', () => {
  test('목록 → 글 클릭 → 상세 → 목록 복귀', async ({ page }) => {
    await page.goto('/writing')

    await expect(page.getByRole('heading', { level: 1, name: '글' })).toBeVisible()

    const firstCard = page.locator('main a[href^="/writing/"]').first()
    await expect(firstCard).toBeVisible()
    await firstCard.click()

    await expect(page).toHaveURL(/\/writing\/.+/)
    await expect(page.locator('article > h1')).toBeVisible()
    await expect(page.locator('article > p').filter({ has: page.locator('time') })).toContainText('분 읽기')

    await page.getByRole('link', { name: '← 모든 글' }).first().click()
    await expect(page).toHaveURL(/\/writing$/)
    await expect(page.getByRole('heading', { level: 1, name: '글' })).toBeVisible()
  })

  test('존재하지 않는 글은 404를 표시한다', async ({ page }) => {
    const res = await page.goto('/writing/does-not-exist')
    expect(res?.status()).toBe(404)
  })
})

test.describe('글 상세 — TOC + Back to Top (데스크톱)', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('TOC 항목 클릭 시 해당 섹션으로 이동하고, 스크롤 시 Back to Top이 동작한다', async ({ page }) => {
    await page.goto('/writing/next-mdx-library-decision')
    await expect(page.locator('article h1')).toBeVisible()

    const toc = page.getByRole('navigation', { name: '목차' })
    await expect(toc).toBeVisible()

    const back = page.getByRole('button', { name: '맨 위로' })
    await expect(back).toHaveCSS('opacity', '0')

    await toc.getByRole('link', { name: '결론' }).click()
    await expect(page).toHaveURL(/#결론|#%EA%B2%B0%EB%A1%A0/)
    await expect(page.locator('#결론')).toBeInViewport()

    await expect(back).toHaveCSS('opacity', '1')
    await back.click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50)
  })
})

test.describe('글 상세 — 모바일에서 TOC 숨김', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('모바일에서는 목차 사이드바가 보이지 않는다', async ({ page }) => {
    await page.goto('/writing/next-mdx-library-decision')
    await expect(page.locator('article h1')).toBeVisible()
    await expect(page.getByRole('navigation', { name: '목차' })).toBeHidden()
  })
})

test.describe('글 상세 — 관련 글 + 이전·다음', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('관련 글 섹션과 이전·다음 내비게이션이 보이고, 관련 글로 이동한다', async ({ page }) => {
    // react·architecture 태그를 가진 글 — 다른 react 글들과 태그가 겹친다
    await page.goto('/writing/data-flow-in-react')
    await expect(page.locator('article > h1')).toBeVisible()

    const related = page.getByRole('heading', { name: '관련 글' })
    await expect(related).toBeVisible()

    const nav = page.getByRole('navigation', { name: '이전·다음 글' })
    await expect(nav).toBeVisible()

    const relatedLink = page
      .locator('article a[href^="/writing/"]')
      .filter({ hasNot: page.getByText('모든 글') })
      .last()
    await relatedLink.click()
    await expect(page).toHaveURL(/\/writing\/.+/)
    await expect(page.locator('article > h1')).toBeVisible()
  })
})

test.describe('글 상세 — 시리즈 네비게이션', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('연재 글에서 시리즈 nav가 노출되고, 다른 편으로 이동한다', async ({ page }) => {
    // heap = 시리즈 2편 중 2번째
    await page.goto('/writing/heap-in-javascript')
    await expect(page.locator('article > h1')).toBeVisible()

    const series = page.getByRole('region', { name: '시리즈' })
    await expect(series).toBeVisible()
    await expect(series).toContainText('자바스크립트로 구현하는 자료구조')
    await expect(series).toContainText('2편 중 2번째')

    // 현재 글은 aria-current로 표기되고 링크가 아니다
    await expect(series.locator('[aria-current="true"]')).toContainText('2. ')

    // 1편(lru) 링크 클릭 → 이동
    await series.getByRole('link', { name: /1\./ }).click()
    await expect(page).toHaveURL(/\/writing\/lru-cache-in-javascript$/)
    await expect(page.getByRole('region', { name: '시리즈' })).toContainText('2편 중 1번째')
  })

  test('비연재 글에서는 시리즈 nav가 노출되지 않는다', async ({ page }) => {
    await page.goto('/writing/next-mdx-library-decision')
    await expect(page.locator('article > h1')).toBeVisible()
    await expect(page.getByRole('region', { name: '시리즈' })).toHaveCount(0)
  })
})

test.describe('반응형 — 모바일 375px', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('목록이 가로 스크롤 없이 렌더된다', async ({ page }) => {
    await page.goto('/writing')
    await expect(page.getByRole('heading', { level: 1, name: '글' })).toBeVisible()
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
