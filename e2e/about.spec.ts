import { expect, test } from '@playwright/test'

test.describe('소개 페이지', () => {
  test('프로필 이름과 소셜 채널을 표시한다', async ({ page }) => {
    await page.goto('/about')

    const main = page.locator('main')
    await expect(main.getByRole('heading', { level: 1, name: 'Ayoung Lim' })).toBeVisible()
    await expect(main.getByRole('link', { name: 'GitHub' })).toBeVisible()
    await expect(main.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
  })

  test('네비게이션에서 소개로 이동할 수 있다', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '소개' }).first().click()
    await expect(page).toHaveURL(/\/about$/)
  })
})
