import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

const setTheme = vi.fn()
let resolvedTheme = 'light'

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme, setTheme }),
}))

import { ThemeToggle } from './theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    setTheme.mockClear()
    resolvedTheme = 'light'
  })

  it('마운트 후 토글 버튼을 렌더한다', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('라이트 모드에서 다크로 전환한다', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('다크 모드에서 라이트로 전환한다', async () => {
    resolvedTheme = 'dark'
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('현재 상태에 맞는 aria-label을 제공한다', () => {
    render(<ThemeToggle />)
    expect(
      screen.getByRole('button', { name: '다크 모드로 전환' }),
    ).toBeInTheDocument()
  })
})
