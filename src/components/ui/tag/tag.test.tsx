import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tag } from '@/components/ui/tag'

describe('Tag', () => {
  it('href를 주면 링크로 렌더한다', () => {
    render(<Tag href="/tag/react" label="react" />)
    const link = screen.getByRole('link', { name: 'react' })

    expect(link).toHaveAttribute('href', '/tag/react')
  })

  it('as="span"이면 링크가 아닌 span으로 렌더한다', () => {
    const { container } = render(<Tag as="span" label="react" />)

    expect(screen.queryByRole('link')).toBeNull()
    expect(container.querySelector('span')?.textContent).toContain('react')
  })

  it('count를 주면 라벨과 함께 표시한다', () => {
    render(<Tag href="/tag/react" label="react" count={3} />)

    expect(screen.getByRole('link').textContent).toBe('react3')
  })

  it('count가 없으면 개수 요소를 렌더하지 않는다', () => {
    render(<Tag href="/tag/react" label="react" />)

    expect(screen.getByRole('link').textContent).toBe('react')
  })

  it('기본값은 soft·sm이다', () => {
    render(<Tag href="/tag/react" label="react" />)
    const cls = screen.getByRole('link').className

    expect(cls).toContain('bg-canvas-parchment')
    expect(cls).toContain('px-3')
  })

  it('outline·md variant 클래스를 적용한다', () => {
    render(<Tag href="/tag/react" label="react" variant="outline" size="md" />)
    const cls = screen.getByRole('link').className

    expect(cls).toContain('border-hairline')
    expect(cls).toContain('h-[34px]')
  })

  it('aria-current를 전달한다', () => {
    render(<Tag href="/tag/react" label="react" aria-current="page" />)

    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
  })

  it('className을 병합한다', () => {
    render(<Tag href="/tag/react" label="react" className="mt-2" />)

    expect(screen.getByRole('link').className).toContain('mt-2')
  })
})
