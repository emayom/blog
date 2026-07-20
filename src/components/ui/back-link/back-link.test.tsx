import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BackLink } from '@/components/ui/back-link'

describe('BackLink', () => {
  it('href와 라벨을 링크로 렌더한다', () => {
    render(<BackLink href="/writing">모든 글</BackLink>)
    expect(screen.getByRole('link', { name: '모든 글' })).toHaveAttribute('href', '/writing')
  })

  it('className을 기본 클래스와 병합한다', () => {
    render(<BackLink href="/library" className="mt-12">책장으로</BackLink>)
    const link = screen.getByRole('link', { name: '책장으로' })
    expect(link).toHaveClass('mt-12')
    expect(link).toHaveClass('inline-flex')
  })

  it('화살표 아이콘은 aria-hidden 처리한다', () => {
    const { container } = render(<BackLink href="/writing">모든 글</BackLink>)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
