import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NotesTagFilter } from '@/components/notes/notes-tag-filter'
import type { TagCount } from '@/types/tag'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string, children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

const tags: TagCount[] = [
  { tag: '생각', count: 2 },
  { tag: 'react', count: 1 },
]

describe('NotesTagFilter', () => {
  it('전체 링크와 모든 태그 링크를 렌더한다', () => {
    render(<NotesTagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /전체/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /생각/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /react/ })).toBeInTheDocument()
  })

  it('전체 링크는 /notes로 연결한다', () => {
    render(<NotesTagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /전체/ })).toHaveAttribute('href', '/notes')
  })

  it('태그 링크는 /notes?tag=[tag]로 연결한다', () => {
    render(<NotesTagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /생각/ })).toHaveAttribute('href', '/notes?tag=%EC%83%9D%EA%B0%81')
    expect(screen.getByRole('link', { name: /react/ })).toHaveAttribute('href', '/notes?tag=react')
  })

  it('태그 개수를 표시한다', () => {
    render(<NotesTagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /생각/ })).toHaveTextContent('2')
    expect(screen.getByRole('link', { name: /react/ })).toHaveTextContent('1')
  })

  it('activeTag가 없으면 전체 칩이 활성(aria-current=page)이다', () => {
    render(<NotesTagFilter tags={tags} total={3} />)
    expect(screen.getByRole('link', { name: /전체/ })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: /생각/ })).not.toHaveAttribute('aria-current')
  })

  it('activeTag가 지정되면 해당 태그 칩이 활성이다', () => {
    render(<NotesTagFilter tags={tags} total={3} activeTag="생각" />)
    expect(screen.getByRole('link', { name: /생각/ })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: /전체/ })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: /react/ })).not.toHaveAttribute('aria-current')
  })
})
