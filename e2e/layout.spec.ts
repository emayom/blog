import { test, expect } from '@playwright/test'

test.describe('레이아웃 셸', () => {
  test('헤더와 푸터가 렌더된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})

test.describe('다크모드', () => {
  test('토글 클릭 시 dark 클래스가 적용되고 새로고침 후 유지된다', async ({
    page,
  }) => {
    await page.goto('/')
    const html = page.locator('html')

    const toggle = page.getByRole('button', { name: /모드로 전환/ }).first()
    await toggle.click()
    await expect(html).toHaveClass(/dark/)

    await page.reload()
    await expect(html).toHaveClass(/dark/)
  })

  test('시스템 다크 설정 시 다크가 적용된다', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' })
    const page = await context.newPage()
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/dark/)
    await context.close()
  })
})

test.describe('반응형 — 모바일 375px', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('햄버거 노출, 트레이 열림/ESC 닫힘, 가로 스크롤 없음', async ({
    page,
  }) => {
    await page.goto('/')

    const hamburger = page.getByRole('button', { name: '메뉴 열기' })
    await expect(hamburger).toBeVisible()

    await hamburger.click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()

    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasHorizontalScroll).toBe(false)
  })
})

test.describe('반응형 — 데스크톱 1280px', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('햄버거가 숨겨진다', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('button', { name: '메뉴 열기' }),
    ).toBeHidden()
  })
})

test.describe('404', () => {
  test('없는 경로는 404 UI와 셸을 보여주고 홈 링크가 동작한다', async ({
    page,
  }) => {
    await page.goto('/this-route-does-not-exist')

    await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()

    await page.getByRole('link', { name: '홈으로 돌아가기' }).click()
    await expect(page).toHaveURL('/')
  })
})
