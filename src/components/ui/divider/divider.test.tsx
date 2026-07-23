import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from '@/components/ui/divider'

describe('Divider', () => {
  it('separator 역할의 hr로 렌더한다', () => {
    render(<Divider />)

    expect(screen.getByRole('separator').tagName).toBe('HR')
  })

  it('구분선 기본 클래스를 렌더한다', () => {
    render(<Divider />)
    const cls = screen.getByRole('separator').className

    expect(cls).toContain('border-t')
    expect(cls).toContain('border-hairline')
  })

  it('className으로 여백을 지정할 수 있다', () => {
    render(<Divider className="my-12" />)

    expect(screen.getByRole('separator').className).toContain('my-12')
  })
})
