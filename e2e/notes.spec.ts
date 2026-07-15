import { expect, test } from '@playwright/test'

test.describe('메모 페이지', () => {
  test('메모 목록과 제목이 렌더된다', async ({ page }) => {
    await page.goto('/notes')
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('메모')
    // 발행된 메모 본문이 렌더된다
    await expect(page.getByText('내가 가지고 있는 재능 중에')).toBeVisible()
  })

  test('태그 필터 바에서 태그로 필터할 수 있다', async ({ page }) => {
    await page.goto('/notes')
    const filterNav = page.getByRole('navigation', { name: '주제 필터' })
    await expect(filterNav).toBeVisible()
    await expect(filterNav.getByRole('link', { name: /전체/ })).toBeVisible()

    // 태그 칩 클릭 → /notes?tag= 스코프 필터로 이동
    await filterNav.getByRole('link', { name: /inspiration/ }).click()
    await expect(page).toHaveURL(/\/notes\?tag=inspiration$/)
    await expect(page.getByText('내가 가지고 있는 재능 중에')).toBeVisible()
  })

  test('일치하는 메모가 없는 태그는 빈 상태를 보여준다', async ({ page }) => {
    await page.goto('/notes?tag=no-such-tag')
    await expect(page.getByText(/메모가 없어요/)).toBeVisible()
    await expect(page.getByRole('link', { name: '전체 메모 보기' })).toBeVisible()
  })

  test('breadcrumb이 렌더되고 홈 링크가 있다', async ({ page }) => {
    await page.goto('/notes')
    const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' })
    await expect(breadcrumb).toBeVisible()
    await expect(breadcrumb.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/')
  })

  test('네비게이션에서 메모로 이동할 수 있다', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '메모' }).first().click()
    await expect(page).toHaveURL(/\/notes$/)
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('메모')
  })
})
