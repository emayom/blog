import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from '@/components/ui/divider'

describe('Divider', () => {
  it('구분선 기본 클래스를 렌더한다', () => {
    const { container } = render(<Divider />)
    const el = container.firstElementChild

    expect(el?.className).toContain('h-px')
    expect(el?.className).toContain('bg-hairline')
    expect(el?.className).toContain('dark:bg-fg-muted')
  })

  it('className으로 여백을 지정할 수 있다', () => {
    const { container } = render(<Divider className="my-12" />)

    expect(container.firstElementChild?.className).toContain('my-12')
  })
})
