import { test, expect } from '@playwright/test'

const PUBLISHED_SLUG = 'next-mdx-library-decision'

test.describe('MDX 파이프라인 — 글 상세', () => {
  test('발행된 글의 제목과 본문이 렌더된다', async ({ page }) => {
    await page.goto(`/writing/${PUBLISHED_SLUG}`)

    await expect(
      page.getByRole('heading', {
        name: 'Next.js App Router에서 MDX 파싱 라이브러리를 어떻게 골랐나',
        level: 1,
      }),
    ).toBeVisible()

    // 본문 article — 하단 연관 글 카드 article과 구분 (h1 보유)
    const article = page.locator('article').filter({ has: page.getByRole('heading', { level: 1 }) })
    await expect(article).toContainText('후보는 두 가지')
  })

  test('코드 블록에 신택스 하이라이팅 마크업이 존재한다', async ({ page }) => {
    await page.goto(`/writing/${PUBLISHED_SLUG}`)

    const codeBlock = page.locator('pre code[data-language]').first()
    await expect(codeBlock).toBeVisible()
    await expect(page.locator('pre [data-line]').first()).toBeVisible()
  })

  test('복사 버튼 클릭 시 상태가 토글된다', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto(`/writing/${PUBLISHED_SLUG}`)

    const copyButton = page.getByRole('button', { name: '코드 복사' }).first()
    await expect(copyButton).toBeVisible()

    await copyButton.click()
    await expect(
      page.getByRole('button', { name: '복사됨' }).first(),
    ).toBeVisible()
  })
})

test.describe('MDX 파이프라인 — draft', () => {
  test('_ prefix 픽스처 글은 라우트로 접근할 수 없다', async ({ page }) => {
    const res = await page.goto('/writing/_draft-sample')
    expect(res?.status()).toBe(404)
  })
})
