import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TagFilter } from '@/components/writing/tag-filter'
import type { TagCount } from '@/types/tag'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string, children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

const tags: TagCount[] = [
  { tag: 'Next.js', count: 2 },
  { tag: 'MDX', count: 1 },
]

describe('TagFilter', () => {
  it('전체 링크와 모든 태그 링크를 렌더한다', () => {
    render(<TagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /전체/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Next.js/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /MDX/ })).toBeInTheDocument()
  })

  it('전체 링크는 /writing으로 연결한다', () => {
    render(<TagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /전체/ })).toHaveAttribute('href', '/writing')
  })

  it('태그 링크는 /tag/[tag]로 연결한다', () => {
    render(<TagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /Next.js/ })).toHaveAttribute('href', '/tag/Next.js')
    expect(screen.getByRole('link', { name: /MDX/ })).toHaveAttribute('href', '/tag/MDX')
  })

  it('태그 개수를 표시한다', () => {
    render(<TagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /Next.js/ })).toHaveTextContent('2')
    expect(screen.getByRole('link', { name: /MDX/ })).toHaveTextContent('1')
  })
})
