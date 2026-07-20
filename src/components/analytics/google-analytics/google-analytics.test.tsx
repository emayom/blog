import type { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { GoogleAnalytics } from './google-analytics'

// next/script는 afterInteractive 전략에서 jsdom DOM에 동기 삽입하지 않는다.
// 컴포넌트 자체의 게이팅/출력을 검증하기 위해 passthrough script로 대체한다.
vi.mock('next/script', () => ({
  default: ({ src, dangerouslySetInnerHTML, id }: ComponentProps<'script'>) => (
    <script data-src={src} id={id} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
  ),
}))

const GA_SRC = 'googletagmanager.com/gtag/js'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('GoogleAnalytics', () => {
  it('NEXT_PUBLIC_GA_ID 미설정 시 스크립트를 렌더하지 않는다', () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_GA_ID', '')
    const { container } = render(<GoogleAnalytics />)
    expect(container.innerHTML).toBe('')
  })

  it('GA_ID 설정 + production 환경에서 gtag 스크립트를 렌더한다', () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST123')
    const { container } = render(<GoogleAnalytics />)
    expect(container.innerHTML).toContain(GA_SRC)
    expect(container.innerHTML).toContain('G-TEST123')
  })

  it('development 환경에서는 GA_ID가 있어도 렌더하지 않는다', () => {
    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST123')
    const { container } = render(<GoogleAnalytics />)
    expect(container.innerHTML).toBe('')
  })
})
