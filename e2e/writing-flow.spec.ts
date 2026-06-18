import { expect, test } from '@playwright/test'

test.describe('글 읽기 플로우', () => {
  test('목록 → 글 클릭 → 상세 → 목록 복귀', async ({ page }) => {
    await page.goto('/writing')

    await expect(page.getByRole('heading', { level: 1, name: '글' })).toBeVisible()

    const firstCard = page.locator('main a[href^="/writing/"]').first()
    await expect(firstCard).toBeVisible()
    await firstCard.click()

    await expect(page).toHaveURL(/\/writing\/.+/)
    await expect(page.locator('article h1')).toBeVisible()
    await expect(page.getByText(/분 읽기/)).toBeVisible()

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
