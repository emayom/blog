import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('outline variant는 rounded-md·text-fg-muted·border-hairline 클래스를 포함한다', () => {
    render(<Badge variant="outline">status</Badge>)
    const el = screen.getByText('status')
    expect(el).toHaveClass('rounded-md', 'text-fg-muted', 'border-hairline')
  })

  it('solid+dark는 bg-black/80·text-white/90·font-semibold 클래스를 포함한다', () => {
    render(<Badge variant="solid" tone="dark">badge</Badge>)
    const el = screen.getByText('badge')
    expect(el).toHaveClass('bg-black/80', 'text-white/90', 'font-semibold')
  })

  it('solid+light는 bg-white/80·text-black/90 클래스를 포함한다', () => {
    render(<Badge variant="solid" tone="light">badge</Badge>)
    const el = screen.getByText('badge')
    expect(el).toHaveClass('bg-white/80', 'text-black/90')
  })

  it('기본값은 outline이다', () => {
    render(<Badge>default</Badge>)
    expect(screen.getByText('default')).toHaveClass('rounded-md', 'border-hairline')
  })

  it('className을 병합한다', () => {
    render(<Badge className="mt-3">merge</Badge>)
    expect(screen.getByText('merge')).toHaveClass('mt-3')
  })

  it('children을 렌더한다', () => {
    render(<Badge>hello</Badge>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
