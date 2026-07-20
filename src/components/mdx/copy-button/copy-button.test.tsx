import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CopyButton } from '@/components/mdx/copy-button'

// userEvent.setup()이 navigator.clipboard에 자체 stub을 설치하므로,
// setup 이후 writeText 스파이를 덮어써 컴포넌트의 호출을 관측한다.
function mockClipboard() {
  const writeText = vi.fn(() => Promise.resolve())
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  })
  return writeText
}

describe('CopyButton', () => {
  it('전달된 code를 클립보드에 복사한다', async () => {
    const user = userEvent.setup()
    const writeText = mockClipboard()
    render(<CopyButton code="const x = 1" />)

    await user.click(screen.getByRole('button'))
    expect(writeText).toHaveBeenCalledWith('const x = 1')
  })

  it('복사 후 aria-label을 "복사됨"으로 토글한다', async () => {
    const user = userEvent.setup()
    mockClipboard()
    render(<CopyButton code="abc" />)
    expect(
      screen.getByRole('button', { name: '코드 복사' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(
      await screen.findByRole('button', { name: '복사됨' }),
    ).toBeInTheDocument()
  })

  it('2초 후 라벨이 초기 상태로 돌아온다', async () => {
    const user = userEvent.setup()
    mockClipboard()
    render(<CopyButton code="abc" />)

    await user.click(screen.getByRole('button'))
    expect(
      await screen.findByRole('button', { name: '복사됨' }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole(
        'button',
        { name: '코드 복사' },
        { timeout: 3000 },
      ),
    ).toBeInTheDocument()
  })
})
