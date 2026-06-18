import { expect, test } from '@playwright/test'

test.describe('태그 필터', () => {
  test('태그 칩 클릭 시 URL에 tag 쿼리가 반영된다', async ({ page }) => {
    await page.goto('/writing')

    const chip = page.locator('main').getByRole('button', { name: /nextjs/ })
    await expect(chip).toBeVisible()
    await chip.click()

    await expect(page).toHaveURL(/\?tag=nextjs/)
    await expect(chip).toHaveAttribute('aria-pressed', 'true')
  })

  test('tag 쿼리로 진입하면 필터가 유지되고 새로고침 후에도 유지된다', async ({ page }) => {
    await page.goto('/writing?tag=nextjs')
    const chip = page.locator('main').getByRole('button', { name: /nextjs/ })
    await expect(chip).toHaveAttribute('aria-pressed', 'true')

    await page.reload()
    await expect(
      page.locator('main').getByRole('button', { name: /nextjs/ }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  test('전체 칩 클릭 시 tag 쿼리가 제거된다', async ({ page }) => {
    await page.goto('/writing?tag=nextjs')
    await page.locator('main').getByRole('button', { name: /전체/ }).click()
    await expect(page).toHaveURL(/\/writing$/)
  })
})
