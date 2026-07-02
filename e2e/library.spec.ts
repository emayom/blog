import { expect, test } from '@playwright/test'

test.describe('책장 페이지', () => {
  test('기본 진입 시 anime 카테고리와 연도 섹션이 보인다', async ({ page }) => {
    await page.goto('/library')

    // PC 레이아웃(기본 뷰포트 1280px)의 메인 헤더
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('anime')
    // anime 샘플은 연도 섹션에 렌더된다
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()
  })

  test('books 카테고리로 이동하면 연도 섹션이 보인다', async ({ page }) => {
    await page.goto('/library')
    await page.getByRole('link', { name: 'books' }).first().click()
    await expect(page).toHaveURL(/\/library\?type=book$/)
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('books')
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()
  })

  test('네비게이션에서 책장으로 이동할 수 있다', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '책장' }).first().click()
    await expect(page).toHaveURL(/\/library$/)
  })

  test('PC에서 FinderWindow와 카테고리 사이드바가 렌더된다', async ({ page }) => {
    await page.goto('/library')
    // 사이드바의 카테고리 링크(anime는 현재 페이지)
    await expect(page.getByRole('link', { name: 'anime' }).first()).toBeVisible()
    // CoverCard placeholder(제목 텍스트)가 캐러셀 안에 렌더된다
    const heading = await page.getByRole('heading', { level: 2 }).first().textContent()
    expect(heading).toBeTruthy()
  })
})
