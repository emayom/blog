import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/writing',
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() }),
}))

vi.mock('@/config/site', () => ({
  siteConfig: { name: 'Ayoung Lim' },
  mainNav: [
    { label: '글', href: '/writing', enabled: true },
    { label: '소개', href: '/about', enabled: true },
    { label: '메모', href: '/notes', enabled: false },
  ],
  social: [{ label: 'GitHub', href: 'https://github.com/x', enabled: true, external: true, icon: 'github' }],
}))

import { Navbar } from './navbar'

describe('Navbar', () => {
  it('enabled:true 메뉴 항목만 렌더한다', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: '글' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '소개' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '메모' })).not.toBeInTheDocument()
  })

  it('로고가 홈으로 링크된다', () => {
    render(<Navbar />)
    const logo = screen.getByRole('link', { name: 'Ayoung Lim' })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('GitHub 링크를 렌더한다', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/x',
    )
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
