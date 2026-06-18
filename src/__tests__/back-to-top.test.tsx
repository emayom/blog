import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BackToTop } from '@/components/writing/back-to-top'

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true })
}

beforeEach(() => {
  setScrollY(0)
  window.scrollTo = vi.fn()
  window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('BackToTop', () => {
  it('초기(상단)에는 숨김 상태다', () => {
    render(<BackToTop />)
    const button = screen.getByRole('button', { name: '맨 위로' })
    expect(button.className).toContain('opacity-0')
    expect(button.className).toContain('pointer-events-none')
  })

  it('임계값 이상 스크롤 시 노출된다', () => {
    render(<BackToTop />)
    act(() => {
      setScrollY(800)
      window.dispatchEvent(new Event('scroll'))
    })
    const button = screen.getByRole('button', { name: '맨 위로' })
    expect(button.className).toContain('opacity-100')
  })

  it('클릭 시 smooth 스크롤로 맨 위로 이동한다', async () => {
    render(<BackToTop />)
    await userEvent.click(screen.getByRole('button', { name: '맨 위로' }))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('reduced-motion이면 auto 스크롤을 사용한다', async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia
    render(<BackToTop />)
    await userEvent.click(screen.getByRole('button', { name: '맨 위로' }))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })
})
