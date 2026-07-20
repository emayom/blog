import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { PostMeta } from '@/types/post'
import { SearchContext } from '@/components/search/search-provider'
import { SearchModal } from '@/components/search/search-modal'

const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

// next/link는 jsdom 환경에서 동작하도록 단순 앵커로 모킹
vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: {
    href: string
    children: React.ReactNode
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

const mockPosts: PostMeta[] = [
  {
    slug: 'react-hooks',
    title: 'React Hooks 완전 정복',
    description: 'useState, useEffect, useCallback 등 핵심 훅 정리',
    date: '2024-01-15',
    tags: ['React', 'JavaScript'],
    draft: false,
    featured: false,
    thumbnail: '',
    readingTime: 5,
  },
  {
    slug: 'typescript-generics',
    title: 'TypeScript 제네릭 심화',
    description: '복잡한 제네릭 패턴과 조건부 타입 이해하기',
    date: '2024-02-20',
    tags: ['TypeScript'],
    draft: false,
    featured: false,
    thumbnail: '',
    readingTime: 8,
  },
  {
    slug: 'nextjs-app-router',
    title: 'Next.js App Router 가이드',
    description: 'App Router의 레이아웃, 로딩, 에러 처리',
    date: '2024-03-10',
    tags: ['Next.js', 'React'],
    draft: false,
    featured: false,
    thumbnail: '',
    readingTime: 10,
  },
]

function renderModal(setOpen = vi.fn()) {
  return render(
    <SearchContext.Provider value={{ posts: mockPosts, open: true, setOpen }}>
      <SearchModal />
    </SearchContext.Provider>,
  )
}

describe('SearchModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('dialog 역할로 렌더된다', () => {
    renderModal()
    expect(screen.getByRole('dialog', { name: '검색' })).toBeInTheDocument()
  })

  it('input이 자동 포커스된다', () => {
    renderModal()
    expect(screen.getByRole('searchbox')).toHaveFocus()
  })

  it('쿼리 없을 때 초기 안내 메시지를 표시한다', () => {
    renderModal()
    expect(screen.getByText('검색어를 입력해 글을 찾아보세요')).toBeInTheDocument()
  })

  it('검색어 입력 시 일치하는 글을 필터링한다', async () => {
    const user = userEvent.setup()
    renderModal()
    const input = screen.getByRole('searchbox')
    // "제네릭"은 TypeScript 글에만 존재
    await user.type(input, '제네릭')
    expect(screen.getByText('TypeScript 제네릭 심화')).toBeInTheDocument()
    expect(screen.queryByText('React Hooks 완전 정복')).not.toBeInTheDocument()
  })

  it('결과 없을 때 empty 메시지를 표시한다', async () => {
    const user = userEvent.setup()
    renderModal()
    const input = screen.getByRole('searchbox')
    await user.type(input, 'zzzznotfound1234')
    await waitFor(() => {
      expect(screen.getByText('검색 결과가 없습니다')).toBeInTheDocument()
    })
  })

  it('ESC 키 입력 시 setOpen(false)를 호출한다', async () => {
    const setOpen = vi.fn()
    const user = userEvent.setup()
    renderModal(setOpen)
    await user.keyboard('{Escape}')
    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('오버레이 클릭 시 setOpen(false)를 호출한다', async () => {
    const setOpen = vi.fn()
    const user = userEvent.setup()
    renderModal(setOpen)
    // 오버레이(fixed inset-0 div)를 직접 클릭 — 패널 외부
    const overlay = screen.getByRole('dialog').parentElement!
    await user.click(overlay)
    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('결과 클릭 시 setOpen(false)를 호출한다', async () => {
    const setOpen = vi.fn()
    const user = userEvent.setup()
    renderModal(setOpen)
    await user.type(screen.getByRole('searchbox'), 'React')
    const link = screen.getByText('React Hooks 완전 정복').closest('a')!
    await user.click(link)
    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('결과 링크가 올바른 href를 가진다', async () => {
    const user = userEvent.setup()
    renderModal()
    await user.type(screen.getByRole('searchbox'), 'React')
    const link = screen.getByText('React Hooks 완전 정복').closest('a')
    expect(link).toHaveAttribute('href', '/writing/react-hooks')
  })

  it('날짜가 포맷되어 표시된다', async () => {
    const user = userEvent.setup()
    renderModal()
    await user.type(screen.getByRole('searchbox'), 'React')
    expect(screen.getByText(/2024\.01\.15/)).toBeInTheDocument()
  })

  it('Enter 입력 시 선택된 결과로 이동하고 모달을 닫는다', async () => {
    const setOpen = vi.fn()
    const user = userEvent.setup()
    renderModal(setOpen)
    await user.type(screen.getByRole('searchbox'), 'React')
    await user.keyboard('{Enter}')
    expect(pushMock).toHaveBeenCalledWith('/writing/react-hooks')
    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('ArrowDown으로 선택을 이동한 뒤 Enter로 해당 결과를 연다', async () => {
    const user = userEvent.setup()
    renderModal()
    await user.type(screen.getByRole('searchbox'), 'React')
    await user.keyboard('{ArrowDown}{Enter}')
    // 첫 결과(react-hooks)가 아닌 두 번째 결과로 이동
    expect(pushMock).toHaveBeenCalledWith('/writing/nextjs-app-router')
  })

  it('첫 결과가 기본 선택(active) 상태로 표시된다', async () => {
    const user = userEvent.setup()
    renderModal()
    await user.type(screen.getByRole('searchbox'), 'React')
    const firstLink = screen.getByText('React Hooks 완전 정복').closest('a')
    expect(firstLink).toHaveAttribute('aria-current', 'true')
  })
})
