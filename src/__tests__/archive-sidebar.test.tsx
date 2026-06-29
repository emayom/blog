import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ArchiveSidebar } from '@/components/home/archive-sidebar'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string, children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

describe('ArchiveSidebar', () => {
  it('연도와 글 수를 렌더한다', () => {
    render(<ArchiveSidebar years={[{ year: '2026', count: 3 }]} />)
    expect(screen.getByText('2026')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '3편' })).toBeInTheDocument()
  })

  it('연도 항목은 /archive/[year]로 링크한다', () => {
    render(<ArchiveSidebar years={[{ year: '2026', count: 3 }]} />)
    expect(screen.getByRole('link', { name: '2026' })).toHaveAttribute('href', '/archive/2026')
  })

  it('"전체 →" 링크가 /archive를 가리킨다', () => {
    render(<ArchiveSidebar years={[{ year: '2026', count: 3 }]} />)
    expect(screen.getByRole('link', { name: /전체/ })).toHaveAttribute('href', '/archive')
  })

  it('연도가 없으면 아무것도 렌더하지 않는다', () => {
    const { container } = render(<ArchiveSidebar years={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
