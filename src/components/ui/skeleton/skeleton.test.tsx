import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton } from '@/components/ui/skeleton'

describe('Skeleton', () => {
  it('shimmer·radius 기본 클래스를 렌더한다', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstElementChild

    expect(el?.className).toContain('skeleton-shimmer')
    expect(el?.className).toContain('rounded-xs')
  })

  it('장식 요소로 aria-hidden 처리한다', () => {
    const { container } = render(<Skeleton />)

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('className으로 크기를 지정할 수 있다', () => {
    const { container } = render(<Skeleton className="h-10 w-full" />)
    const cls = container.firstElementChild?.className

    expect(cls).toContain('h-10')
    expect(cls).toContain('w-full')
  })

  it('style로 동적 너비를 받는다', () => {
    const { container } = render(<Skeleton style={{ width: '70%' }} />)

    expect(container.firstElementChild).toHaveStyle({ width: '70%' })
  })
})
