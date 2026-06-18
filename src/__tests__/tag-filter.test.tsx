import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TagFilter } from '@/components/writing/tag-filter'
import type { TagCount } from '@/types/tag'

const tags: TagCount[] = [
  { tag: 'Next.js', count: 2 },
  { tag: 'MDX', count: 1 },
]

describe('TagFilter', () => {
  it('전체 칩과 모든 태그 칩을 렌더한다', () => {
    render(<TagFilter tags={tags} total={3} selected={null} onSelect={vi.fn()} />)
    expect(screen.getByRole('button', { name: /전체/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Next.js/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /MDX/ })).toBeInTheDocument()
  })

  it('선택된 태그에 aria-pressed를 표시한다', () => {
    render(<TagFilter tags={tags} total={3} selected="MDX" onSelect={vi.fn()} />)
    expect(screen.getByRole('button', { name: /MDX/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /전체/ })).toHaveAttribute('aria-pressed', 'false')
  })

  it('태그 클릭 시 해당 태그로 onSelect를 호출한다', async () => {
    const onSelect = vi.fn()
    render(<TagFilter tags={tags} total={3} selected={null} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: /Next.js/ }))
    expect(onSelect).toHaveBeenCalledWith('Next.js')
  })

  it('전체 클릭 시 null로 onSelect를 호출한다', async () => {
    const onSelect = vi.fn()
    render(<TagFilter tags={tags} total={3} selected="MDX" onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: /전체/ }))
    expect(onSelect).toHaveBeenCalledWith(null)
  })
})
