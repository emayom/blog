import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/config/site', () => ({
  siteConfig: { name: 'Ayoung Lim', location: 'Seoul, Korea' },
  footerNav: [
    {
      title: '탐색',
      items: [
        { label: '글', href: '/writing', enabled: true },
        { label: '숨김', href: '/hidden', enabled: false },
      ],
    },
    {
      title: '연결',
      items: [
        { label: 'GitHub', href: '#', enabled: true, external: true },
      ],
    },
    {
      title: '빈그룹',
      items: [{ label: '비활성', href: '/x', enabled: false }],
    },
  ],
}))

import { Footer } from './footer'

describe('Footer', () => {
  it('enabled:true 항목만 렌더한다', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: '글' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '숨김' })).not.toBeInTheDocument()
  })

  it('활성 항목이 없는 그룹은 렌더하지 않는다', () => {
    render(<Footer />)
    expect(screen.queryByText('빈그룹')).not.toBeInTheDocument()
    expect(screen.getByText('탐색')).toBeInTheDocument()
    expect(screen.getByText('연결')).toBeInTheDocument()
  })

  it('legal row에 연도와 사이트명, 위치를 표시한다', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year}. Ayoung Lim`),
    ).toBeInTheDocument()
    expect(screen.getByText('Seoul, Korea')).toBeInTheDocument()
  })

  it('external 링크는 새 탭으로 연다', () => {
    render(<Footer />)
    const gh = screen.getByRole('link', { name: 'GitHub' })
    expect(gh).toHaveAttribute('target', '_blank')
    expect(gh).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
