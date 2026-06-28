import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FolderCard } from '@/components/archive/folder-card'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string, children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

describe('FolderCard', () => {
  it('연도와 글 수를 렌더한다', () => {
    render(<FolderCard year="2026" count={3} />)
    expect(screen.getByText('2026')).toBeInTheDocument()
    expect(screen.getByText(/3/)).toBeInTheDocument()
    expect(screen.getByText(/편/)).toBeInTheDocument()
  })

  it('/archive/[year]로 링크한다', () => {
    render(<FolderCard year="2026" count={3} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/archive/2026')
  })
})
