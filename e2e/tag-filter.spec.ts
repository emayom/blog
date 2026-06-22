import { expect, test } from '@playwright/test'

test.describe('태그 필터', () => {
  test('태그 칩 클릭 시 태그 페이지로 이동한다', async ({ page }) => {
    await page.goto('/writing')

    const filter = page.getByRole('navigation', { name: '주제 필터' })
    const chip = filter.getByRole('link', { name: /nextjs/ })
    await expect(chip).toBeVisible()
    await chip.click()

    await expect(page).toHaveURL(/\/tag\/nextjs/)
  })

  test('전체 칩 클릭 시 /writing으로 이동한다', async ({ page }) => {
    await page.goto('/writing')

    const filter = page.getByRole('navigation', { name: '주제 필터' })
    await filter.getByRole('link', { name: /전체/ }).click()
    await expect(page).toHaveURL(/\/writing$/)
  })
})
