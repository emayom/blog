import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { mainNav, siteConfig } from '@/config/site'

vi.mock('next/navigation', () => ({
  usePathname: () => '/writing',
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() }),
}))

import { Navbar } from './navbar'

describe('Navbar', () => {
  it('enabled:true 메뉴 항목만 렌더한다', () => {
    render(<Navbar />)
    for (const item of mainNav.filter(item => item.enabled)) {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    }
    for (const item of mainNav.filter(item => !item.enabled)) {
      expect(screen.queryByRole('link', { name: item.label })).not.toBeInTheDocument()
    }
  })

  it('로고가 홈으로 링크된다', () => {
    render(<Navbar />)
    const logo = screen.getByRole('link', { name: siteConfig.logoText })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('활성 경로에 aria-current를 설정한다', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: '글' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: '소개' })).not.toHaveAttribute(
      'aria-current',
    )
  })
})
