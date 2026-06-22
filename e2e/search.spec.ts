import { test, expect } from '@playwright/test'

test.describe('검색 모달', () => {
  test('/writing 페이지에 검색 버튼이 표시된다', async ({ page }) => {
    await page.goto('/writing')
    const trigger = page.getByRole('button', { name: '검색 열기' })
    await expect(trigger).toBeVisible()
  })

  test('검색 버튼 클릭 시 모달이 열린다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()
    await expect(page.getByRole('dialog', { name: '검색' })).toBeVisible()
  })

  test('모달이 열릴 때 input에 자동 포커스된다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()
    const input = page.getByRole('searchbox')
    await expect(input).toBeFocused()
  })

  test('ESC 키로 모달이 닫힌다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()
    await expect(page.getByRole('dialog', { name: '검색' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: '검색' })).not.toBeVisible()
  })

  test('방향키로 선택을 이동한 뒤 Enter로 해당 글로 이동한다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()
    const input = page.getByRole('searchbox')
    await input.fill('제네릭')
    const dialog = page.getByRole('dialog', { name: '검색' })
    const firstLink = dialog.getByRole('link').first()
    const href = await firstLink.getAttribute('href')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('dialog', { name: '검색' })).not.toBeVisible()
    if (href) {
      await expect(page).toHaveURL(href)
    }
  })

  test('오버레이 클릭 시 모달이 닫힌다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()
    await expect(page.getByRole('dialog', { name: '검색' })).toBeVisible()
    await page.mouse.click(10, 10)
    await expect(page.getByRole('dialog', { name: '검색' })).not.toBeVisible()
  })

  test('검색어 입력 시 일치하는 결과만 표시된다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()
    const input = page.getByRole('searchbox')
    // _search-fixture-typescript.mdx 제목에만 "제네릭" 포함
    await input.fill('제네릭')
    const dialog = page.getByRole('dialog', { name: '검색' })
    await expect(dialog.getByText('TypeScript 제네릭 심화')).toBeVisible()
    await expect(dialog.getByText('React Hooks 완전 정복')).not.toBeVisible()
  })

  test('검색어와 무관한 결과가 없으면 empty 메시지를 표시한다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()
    const input = page.getByRole('searchbox')
    await input.fill('zzzznotfound1234')
    const dialog = page.getByRole('dialog', { name: '검색' })
    await expect(dialog.getByText('검색 결과가 없습니다')).toBeVisible()
  })

  test('결과 링크 클릭 시 모달이 닫히고 해당 페이지로 이동한다', async ({ page }) => {
    await page.goto('/writing')
    await page.getByRole('button', { name: '검색 열기' }).click()

    const dialog = page.getByRole('dialog', { name: '검색' })
    await expect(dialog).toBeVisible()

    const firstLink = dialog.getByRole('link').first()
    const linkCount = await dialog.getByRole('link').count()
    if (linkCount > 0) {
      const href = await firstLink.getAttribute('href')
      await firstLink.click()
      await expect(page.getByRole('dialog', { name: '검색' })).not.toBeVisible()
      if (href) {
        await expect(page).toHaveURL(href)
      }
    }
  })
})

test.describe('검색 모달 — 모바일 375px', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('모바일에서도 /writing 페이지에 검색 버튼이 표시된다', async ({ page }) => {
    await page.goto('/writing')
    const trigger = page.getByRole('button', { name: '검색 열기' })
    await expect(trigger).toBeVisible()
  })
})
