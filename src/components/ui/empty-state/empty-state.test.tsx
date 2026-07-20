import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { EmptyState } from '@/components/ui/empty-state'

describe('EmptyState', () => {
  it('title을 렌더한다', () => {
    render(<EmptyState variant="empty" title="없음" />)
    expect(screen.getByText('없음')).toBeInTheDocument()
  })

  it('onClick 액션은 버튼으로 렌더하고 클릭 시 호출한다', async () => {
    const onClick = vi.fn()
    render(
      <EmptyState variant="error" title="에러" action={{ label: '다시 시도', onClick }} />,
    )
    await userEvent.click(screen.getByRole('button', { name: '다시 시도' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('href 액션은 링크로 렌더한다', () => {
    render(
      <EmptyState variant="empty" title="없음" action={{ label: '전체 보기', href: '/writing' }} />,
    )
    expect(screen.getByRole('link', { name: '전체 보기' })).toHaveAttribute('href', '/writing')
  })

  it('action이 없으면 버튼/링크를 렌더하지 않는다', () => {
    render(<EmptyState variant="empty" title="없음" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
