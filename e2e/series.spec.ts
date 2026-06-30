import { expect, test } from '@playwright/test'

test.describe('엮은 글 섹션 (글 목록)', () => {
  test('글 목록 하단에 엮은 글 섹션이 렌더된다', async ({ page }) => {
    await page.goto('/writing')

    const section = page.getByRole('region', { name: '엮은 글' })
    await expect(section.getByRole('heading', { name: '엮은 글' })).toBeVisible()
    await expect(section.getByRole('link', { name: /Problem Solving/ })).toBeVisible()
  })

  test('카테고리 카드를 클릭하면 상세 페이지로 이동한다', async ({ page }) => {
    await page.goto('/writing')

    await page.getByRole('region', { name: '엮은 글' }).getByRole('link', { name: /Problem Solving/ }).click()
    await expect(page).toHaveURL(/\/series\/problem-solving$/)
  })
})

test.describe('시리즈 상세 페이지', () => {
  test('제목·편수·번호 매긴 글 목록을 표시한다', async ({ page }) => {
    await page.goto('/series/greedy')

    await expect(page.getByRole('heading', { level: 1, name: 'Greedy' })).toBeVisible()
    await expect(page.locator('main ol li')).not.toHaveCount(0)
  })

  test('브레드크럼에 홈·글 링크가 있다', async ({ page }) => {
    await page.goto('/series/greedy')

    const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' })
    await expect(breadcrumb.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/')
    await expect(breadcrumb.getByRole('link', { name: '글' })).toHaveAttribute('href', '/writing')
  })

  test('글 항목을 클릭하면 해당 글 상세로 이동한다', async ({ page }) => {
    await page.goto('/series/greedy')

    await page.locator('main ol li a').first().click()
    await expect(page).toHaveURL(/\/writing\/.+/)
  })
})
