import { expect, test } from '@playwright/test'

test.describe('메모 페이지', () => {
  test('메모 목록과 제목이 렌더된다', async ({ page }) => {
    await page.goto('/notes')
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('메모')
    // 샘플 메모 본문이 렌더된다
    await expect(page.getByText('좋은 이름은 구현을 숨기고')).toBeVisible()
  })

  test('고정된 메모 그룹이 모든 메모 그룹보다 위에 있다', async ({ page }) => {
    await page.goto('/notes')
    const pinnedHeading = page.getByRole('heading', { name: '고정된 메모' })
    const allHeading = page.getByRole('heading', { name: '모든 메모' })
    await expect(pinnedHeading).toBeVisible()
    await expect(allHeading).toBeVisible()

    const pinnedBox = await pinnedHeading.boundingBox()
    const allBox = await allHeading.boundingBox()
    expect(pinnedBox!.y).toBeLessThan(allBox!.y)
  })

  test('자유형식 코드 스니펫이 렌더된다', async ({ page }) => {
    await page.goto('/notes')
    // date-locale-compare 메모의 코드블록
    await expect(page.locator('pre').first()).toBeVisible()
    await expect(page.getByText('localeCompare').first()).toBeVisible()
  })

  test('네비게이션에서 메모로 이동할 수 있다', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '메모' }).first().click()
    await expect(page).toHaveURL(/\/notes$/)
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('메모')
  })
})
