import { expect, test } from '@playwright/test'

test.describe('홈 페이지', () => {
  test('Hero 헤드라인과 CTA를 표시한다', async ({ page }) => {
    await page.goto('/')

    const main = page.locator('main')
    await expect(main.getByRole('heading', { level: 1 })).toBeVisible()

    const primary = main.getByRole('link', { name: '글 보러가기' })
    await expect(primary).toHaveAttribute('href', '/writing')

    const ghost = main.getByRole('link', { name: '소개' })
    await expect(ghost).toHaveAttribute('href', '/about')
  })

  test('CTA로 글 목록과 소개로 이동할 수 있다', async ({ page }) => {
    await page.goto('/')
    await page.locator('main').getByRole('link', { name: '글 보러가기' }).click()
    await expect(page).toHaveURL(/\/writing$/)

    await page.goto('/')
    await page.locator('main').getByRole('link', { name: '소개' }).click()
    await expect(page).toHaveURL(/\/about$/)
  })

  test('최근 글 섹션과 전체 링크를 표시한다', async ({ page }) => {
    await page.goto('/')

    const recent = page.locator('section').filter({
      has: page.getByRole('heading', { level: 2, name: '최근 글' }),
    })
    await expect(recent.getByRole('heading', { level: 2, name: '최근 글' })).toBeVisible()
    await expect(recent.getByRole('link', { name: /전체/ })).toHaveAttribute('href', '/writing')
  })

  test('아카이브 사이드바의 전체·연도 항목 링크', async ({ page }) => {
    await page.goto('/')

    const aside = page.locator('aside')
    await expect(aside.getByRole('heading', { level: 2, name: '아카이브' })).toBeVisible()
    await expect(aside.getByRole('link', { name: /전체/ })).toHaveAttribute('href', '/archive')

    const yearLinks = aside.getByRole('link', { name: /^\d{4}$/ })
    expect(await yearLinks.count()).toBeGreaterThan(0)
    await expect(yearLinks.first()).toHaveAttribute('href', /\/archive\/\d{4}$/)
  })

  test('모바일·데스크톱에서 가로 스크롤이 없다', async ({ page }) => {
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/')
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      )
      expect(overflow, `viewport ${width}px`).toBe(false)
    }
  })
})
