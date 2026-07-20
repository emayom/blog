import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { IconButton } from '@/components/ui/icon-button'

describe('IconButton', () => {
  it('label을 aria-label로 강제한다', () => {
    render(<IconButton label="메뉴 열기" />)
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toBeInTheDocument()
  })

  it('type 기본값은 button이다', () => {
    render(<IconButton label="닫기" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('size sm은 size-7이다', () => {
    render(<IconButton label="x" size="sm" />)
    expect(screen.getByRole('button')).toHaveClass('size-7')
  })

  it('size md는 size-9이다', () => {
    render(<IconButton label="x" size="md" />)
    expect(screen.getByRole('button')).toHaveClass('size-9')
  })

  it('size lg는 size-11이다', () => {
    render(<IconButton label="x" size="lg" />)
    expect(screen.getByRole('button')).toHaveClass('size-11')
  })

  it('shape circle은 rounded-full이다', () => {
    render(<IconButton label="x" shape="circle" />)
    expect(screen.getByRole('button')).toHaveClass('rounded-full')
  })

  it('shape square는 rounded-sm이다', () => {
    render(<IconButton label="x" shape="square" />)
    expect(screen.getByRole('button')).toHaveClass('rounded-sm')
  })

  it('variant ghost는 text-fg를 포함한다', () => {
    render(<IconButton label="x" variant="ghost" />)
    expect(screen.getByRole('button')).toHaveClass('text-fg', 'dark:text-body-on-dark')
  })

  it('variant outline은 border·bg·fg-subtle을 포함한다', () => {
    render(<IconButton label="x" variant="outline" />)
    expect(screen.getByRole('button')).toHaveClass(
      'border',
      'border-hairline',
      'bg-canvas',
      'text-fg-subtle',
    )
  })

  it('base 전조합(press·focus ring·svg 크기)을 포함한다', () => {
    render(<IconButton label="x" />)
    expect(screen.getByRole('button')).toHaveClass(
      'inline-flex',
      'shrink-0',
      'items-center',
      'justify-center',
      'active:scale-95',
      'focus-visible:outline-primary-focus',
      '[&_svg]:size-4',
    )
  })

  it('svg 기본 크기 유틸리티가 존재한다', () => {
    render(<IconButton label="x" />)
    expect(screen.getByRole('button')).toHaveClass('[&_svg]:size-4')
  })

  it('className 충돌 시 호출부가 이긴다', () => {
    render(<IconButton label="x" size="md" className="size-11" />)
    const el = screen.getByRole('button')
    expect(el).toHaveClass('size-11')
    expect(el).not.toHaveClass('size-9')
  })

  it('defaultVariants는 md·circle·ghost이다', () => {
    render(<IconButton label="x" />)
    const el = screen.getByRole('button')
    expect(el).toHaveClass('size-9', 'rounded-full', 'text-fg')
  })

  it('children을 렌더한다', () => {
    render(<IconButton label="x"><svg data-testid="icon" /></IconButton>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('onClick 핸들러를 호출한다', () => {
    const onClick = vi.fn()
    render(<IconButton label="x" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('disabled 속성을 전달한다', () => {
    render(<IconButton label="x" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('임의 속성(aria-expanded)을 pass-through한다', () => {
    render(<IconButton label="x" aria-expanded />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })
})
