import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Breadcrumb } from '@/components/ui/breadcrumb'

describe('Breadcrumb', () => {
  it('href가 있는 항목은 링크로 렌더한다', () => {
    render(<Breadcrumb items={[{ label: '홈', href: '/' }, { label: '글', href: '/writing' }]} />)
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: '글' })).toHaveAttribute('href', '/writing')
  })

  it('href가 없는 마지막 항목은 aria-current="page" span으로 렌더한다', () => {
    render(<Breadcrumb items={[{ label: '홈', href: '/' }, { label: '현재 글' }]} />)
    const current = screen.getByText('현재 글')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current.tagName).toBe('SPAN')
  })

  it('truncate 항목에 max-w-[40ch] truncate 클래스를 적용한다', () => {
    render(<Breadcrumb items={[{ label: '홈', href: '/' }, { label: '긴 제목', truncate: true }]} />)
    const current = screen.getByText('긴 제목')
    expect(current).toHaveClass('max-w-[40ch]', 'truncate')
  })

  it('nav에 aria-label="breadcrumb"를 부여한다', () => {
    render(<Breadcrumb items={[{ label: '홈', href: '/' }]} />)
    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
  })
})
