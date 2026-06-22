import { expect, test } from '@playwright/test'

test.describe('태그 페이지', () => {
  test('태그 페이지가 렌더되고 제목과 글 목록을 표시한다', async ({ page }) => {
    // javascript 태그는 실제 콘텐츠에서 5개 글을 가진다
    await page.goto('/tag/javascript')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('#javascript')
    await expect(page.locator('main ul li')).not.toHaveCount(0)
  })

  test('브레드크럼에 홈·글 링크가 있다', async ({ page }) => {
    await page.goto('/tag/javascript')

    await expect(page.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/')
    await expect(page.getByRole('link', { name: '글' })).toHaveAttribute('href', '/writing')
  })

  test('← 모든 글 버튼을 클릭하면 /writing으로 이동한다', async ({ page }) => {
    await page.goto('/tag/javascript')

    await page.getByRole('link', { name: '← 모든 글' }).click()
    await expect(page).toHaveURL(/\/writing$/)
  })

  test('글 카드를 클릭하면 해당 글 상세로 이동한다', async ({ page }) => {
    await page.goto('/tag/javascript')

    const firstCard = page.locator('main ul li a').first()
    await firstCard.click()
    await expect(page).toHaveURL(/\/writing\/.+/)
  })

  test('존재하지 않는 태그는 404를 반환한다', async ({ page }) => {
    const res = await page.goto('/tag/tag-does-not-exist')
    expect(res?.status()).toBe(404)
  })
})
