import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button, buttonVariants } from '@/components/ui/button'

describe('Button', () => {
  it('기본값은 outline·sm이다 (px-sm 포함)', () => {
    render(<Button>default</Button>)
    const el = screen.getByRole('button')
    expect(el).toHaveClass('border', 'border-hairline', 'text-fg', 'px-sm', 'py-xxs')
  })

  it('primary variant는 pill·bg-primary·body 타이포를 포함한다', () => {
    render(<Button variant="primary">buy</Button>)
    const el = screen.getByRole('button')
    expect(el).toHaveClass('rounded-pill', 'bg-primary', 'text-on-primary', 'text-body')
  })

  it('primary는 size 패딩을 px-lg py-sm로 무효화한다', () => {
    render(<Button variant="primary" size="md">buy</Button>)
    const el = screen.getByRole('button')
    expect(el).toHaveClass('px-lg', 'py-sm')
    expect(el).not.toHaveClass('px-md', 'py-xs')
  })

  it('active:scale-95는 전 variant에 적용된다', () => {
    render(<Button variant="ghost">press</Button>)
    expect(screen.getByRole('button')).toHaveClass('active:scale-95')
  })

  it('className을 병합한다', () => {
    render(<Button className="mt-8">merge</Button>)
    expect(screen.getByRole('button')).toHaveClass('mt-8')
  })

  it('disabled 속성을 전달한다', () => {
    render(<Button disabled>off</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('onClick 핸들러를 호출한다', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('buttonVariants는 클래스 문자열을 반환하는 순수 함수다', () => {
    expect(buttonVariants({ variant: 'primary' })).toContain('bg-primary')
  })

  it('buttonVariants는 className 인자를 병합한다', () => {
    expect(buttonVariants({ variant: 'primary', className: 'mt-8' })).toContain('mt-8')
  })
})

describe('buttonVariants — 병합 보장', () => {
  it('primary 결과에 size 축의 충돌 클래스가 남지 않는다', () => {
    const merged = buttonVariants({ variant: 'primary' }).split(/\s+/)
    expect(merged).not.toContain('text-sm')
    expect(merged).not.toContain('px-sm')
    expect(merged).toContain('px-lg')
    expect(merged).toContain('text-body')
  })
})
