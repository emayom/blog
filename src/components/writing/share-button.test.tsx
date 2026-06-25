import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ShareButton } from '@/components/writing/share-button'

function mockClipboard() {
  const writeText = vi.fn(() => Promise.resolve())
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  })
  return writeText
}

function setShare(impl: ((data: ShareData) => Promise<void>) | undefined) {
  Object.defineProperty(navigator, 'share', {
    configurable: true,
    value: impl,
  })
}

afterEach(() => {
  setShare(undefined)
})

describe('ShareButton', () => {
  it('Web Share API 지원 시 url과 title로 공유한다', async () => {
    const user = userEvent.setup()
    const share = vi.fn(() => Promise.resolve())
    setShare(share)
    render(<ShareButton url="https://example.com/writing/post" title="제목" />)

    await user.click(screen.getByRole('button'))
    expect(share).toHaveBeenCalledWith({
      url: 'https://example.com/writing/post',
      title: '제목',
    })
  })

  it('Web Share API 미지원 시 클립보드에 url을 복사한다', async () => {
    const user = userEvent.setup()
    setShare(undefined)
    const writeText = mockClipboard()
    render(<ShareButton url="https://example.com/writing/post" />)

    await user.click(screen.getByRole('button'))
    expect(writeText).toHaveBeenCalledWith('https://example.com/writing/post')
  })

  it('클립보드 복사 후 aria-label을 "링크 복사됨"으로 토글한다', async () => {
    const user = userEvent.setup()
    setShare(undefined)
    mockClipboard()
    render(<ShareButton url="https://example.com/writing/post" />)
    expect(
      screen.getByRole('button', { name: '글 공유' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(
      await screen.findByRole('button', { name: '링크 복사됨' }),
    ).toBeInTheDocument()
  })

  it('공유 취소(AbortError) 시 에러를 전파하지 않고 상태도 바뀌지 않는다', async () => {
    const user = userEvent.setup()
    const share = vi.fn(() =>
      Promise.reject(new DOMException('cancelled', 'AbortError')),
    )
    setShare(share)
    render(<ShareButton url="https://example.com/writing/post" title="제목" />)

    await user.click(screen.getByRole('button'))
    expect(
      screen.getByRole('button', { name: '글 공유' }),
    ).toBeInTheDocument()
  })
})
