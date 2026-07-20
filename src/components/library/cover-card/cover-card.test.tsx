import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CoverCard } from '@/components/library/cover-card'
import type { LibraryItemMeta } from '@/types/library'

function item(overrides: Partial<LibraryItemMeta> = {}): LibraryItemMeta {
  return { slug: 'x', title: '테스트 항목', type: 'book', draft: false, featured: false, ...overrides }
}

describe('CoverCard', () => {
  it('href가 있고 onToggle이 없으면 링크로 래핑하고 라벨에 hover underline을 준다', () => {
    render(<CoverCard item={item()} showLabel href="/library/x" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/library/x')
    const label = link.querySelector('span.line-clamp-2')
    expect(label?.className).toContain('group-hover:underline')
  })

  it('onToggle이 있으면 href가 있어도 링크로 래핑하지 않는다', () => {
    const onToggle = vi.fn()
    render(<CoverCard item={item({ series: 's', seriesCount: 2 })} showLabel href="/library/x" onToggle={onToggle} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('href가 없으면 링크가 아니다', () => {
    render(<CoverCard item={item()} showLabel />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
