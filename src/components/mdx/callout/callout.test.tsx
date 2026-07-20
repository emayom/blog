import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Callout } from '@/components/mdx/callout'

describe('Callout', () => {
  it('기본 type=info로 렌더되고 기본 타이틀을 표시한다', () => {
    render(<Callout>내용</Callout>)
    expect(screen.getByText('알아두기')).toBeInTheDocument()
    expect(screen.getByText('내용')).toBeInTheDocument()
    expect(screen.getByRole('note')).toBeInTheDocument()
  })

  it('type=warning이면 "주의" 기본 타이틀을 표시한다', () => {
    render(<Callout type="warning">위험</Callout>)
    expect(screen.getByText('주의')).toBeInTheDocument()
  })

  it('type=tip이면 "팁" 기본 타이틀을 표시한다', () => {
    render(<Callout type="tip">도움말</Callout>)
    expect(screen.getByText('팁')).toBeInTheDocument()
  })

  it('title prop이 있으면 커스텀 타이틀을 표시한다', () => {
    render(<Callout title="커스텀">내용</Callout>)
    expect(screen.getByText('커스텀')).toBeInTheDocument()
    expect(screen.queryByText('알아두기')).not.toBeInTheDocument()
  })
})
