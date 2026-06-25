import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light' }),
}))

function stubGiscusEnv() {
  vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO', 'owner/repo')
  vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO_ID', 'R_123')
  vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY', 'General')
  vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY_ID', 'DIC_123')
}

beforeEach(() => {
  vi.resetModules()
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('Comments', () => {
  it('giscus env가 없으면 아무것도 렌더하지 않는다', async () => {
    const { Comments } = await import('@/components/writing/comments')
    const { container } = render(<Comments />)
    expect(container).toBeEmptyDOMElement()
  })

  it('giscus env가 설정되면 댓글 섹션과 스크립트를 렌더한다', async () => {
    stubGiscusEnv()
    const { Comments } = await import('@/components/writing/comments')
    render(<Comments />)

    expect(
      screen.getByRole('heading', { name: '댓글' }),
    ).toBeInTheDocument()

    const script = document.querySelector<HTMLScriptElement>(
      'script[src="https://giscus.app/client.js"]',
    )
    expect(script).not.toBeNull()
    expect(script?.getAttribute('data-repo')).toBe('owner/repo')
    expect(script?.getAttribute('data-theme')).toBe('light')
  })
})
