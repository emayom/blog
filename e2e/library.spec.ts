import { expect, test } from '@playwright/test'

test.describe('책장 페이지', () => {
  test('기본 진입 시 anime 카테고리와 연도 섹션이 보인다', async ({ page }) => {
    await page.goto('/library')

    // PC 레이아웃(기본 뷰포트 1280px)의 메인 헤더
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('anime')
    // anime 샘플은 연도 섹션에 렌더된다
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()
  })

  test('anime 카테고리는 Featured 섹션을 표시한다', async ({ page }) => {
    await page.goto('/library')
    // frieren-beyond-journeys-end-s1 이 featured: true
    await expect(page.getByText('Featured').first()).toBeVisible()
  })

  test('books 카테고리는 Featured 섹션을 표시하지 않는다', async ({ page }) => {
    await page.goto('/library?type=book')
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText('books')
    // featured book 없음 → Featured 섹션 미노출
    await expect(page.getByText('Featured')).not.toBeVisible()
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

  test('검색 아이콘 클릭 시 입력창이 열리고 검색어 입력 시 Featured 섹션이 숨겨진다', async ({ page }) => {
    await page.goto('/library')
    // Featured 섹션이 초기에 보임 (anime 기본, frieren featured)
    await expect(page.getByText('Featured').first()).toBeVisible()
    // 검색 아이콘 클릭
    await page.getByRole('button', { name: '검색' }).click()
    const input = page.getByPlaceholder('제목 검색')
    await expect(input).toBeVisible()
    // 검색어 입력 시 Featured 섹션 숨겨짐
    await input.fill('프리렌')
    await expect(page.getByText('Featured')).not.toBeVisible()
  })

  test('검색어와 일치하는 항목이 없으면 빈 상태를 표시한다', async ({ page }) => {
    await page.goto('/library')
    await page.getByRole('button', { name: '검색' }).click()
    await page.getByPlaceholder('제목 검색').fill('xyzxyzxyz')
    await expect(page.getByText('검색 결과가 없어요')).toBeVisible()
  })
})

test.describe('책장 항목 상세 페이지', () => {
  test('본문 있는 항목은 감상 본문과 복귀 링크를 표시한다', async ({ page }) => {
    await page.goto('/library/a-short-philosophy-from-birds')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('새들이 전하는 짧은 철학')
    await expect(page.getByText('티티새', { exact: false })).toBeVisible()
    await expect(page.getByRole('link', { name: '← 책장으로' })).toBeVisible()
  })

  test('본문 없는 항목은 메타와 빈 상태를 표시한다', async ({ page }) => {
    await page.goto('/library/frieren-beyond-journeys-end-s1')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('장송의 프리렌 1기')
    await expect(page.getByText('아직 감상 기록이 없어요')).toBeVisible()
  })

  test('breadcrumb으로 책장 목록에 복귀한다', async ({ page }) => {
    await page.goto('/library/frieren-beyond-journeys-end-s1')
    await page.getByRole('link', { name: '책장' }).click()
    await expect(page).toHaveURL(/\/library$/)
  })

  test('존재하지 않는 slug는 404', async ({ page }) => {
    const res = await page.goto('/library/does-not-exist-slug')
    expect(res?.status()).toBe(404)
  })

  test('Featured 카드 클릭 시 상세 페이지로 이동한다', async ({ page }) => {
    await page.goto('/library')
    await page.getByRole('link', { name: '장송의 프리렌 1기' }).first().click()
    await expect(page).toHaveURL(/\/library\/frieren-beyond-journeys-end-s1$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('장송의 프리렌 1기')
  })
})
