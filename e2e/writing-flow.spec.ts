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
