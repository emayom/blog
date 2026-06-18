import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NotFound from './not-found'

describe('NotFound', () => {
  it('404 헤드라인을 렌더한다', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })

  it('홈 복귀 링크를 렌더한다', () => {
    render(<NotFound />)
    const link = screen.getByRole('link', { name: '홈으로 돌아가기' })
    expect(link).toHaveAttribute('href', '/')
  })
})
