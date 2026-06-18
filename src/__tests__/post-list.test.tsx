import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { PostMeta } from '@/types/post'
import type { TagCount } from '@/types/tag'

const replace = vi.fn()
let searchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/writing',
  useSearchParams: () => searchParams,
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string, children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

import { PostList } from '@/components/writing/post-list'

function meta(slug: string, tags: string[]): PostMeta {
  return {
    slug,
    title: `글-${slug}`,
    date: '2026-01-01',
    tags,
    draft: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
  }
}

const posts = [meta('a', ['Next.js']), meta('b', ['MDX']), meta('c', ['Next.js'])]
const tags: TagCount[] = [
  { tag: 'Next.js', count: 2 },
  { tag: 'MDX', count: 1 },
]

afterEach(() => {
  replace.mockClear()
  searchParams = new URLSearchParams()
})

describe('PostList', () => {
  it('필터 미선택 시 모든 글을 렌더한다', () => {
    render(<PostList posts={posts} tags={tags} />)
    expect(screen.getByText('글-a')).toBeInTheDocument()
    expect(screen.getByText('글-b')).toBeInTheDocument()
    expect(screen.getByText('글-c')).toBeInTheDocument()
  })

  it('URL의 tag로 목록을 필터링한다', () => {
    searchParams = new URLSearchParams('tag=Next.js')
    render(<PostList posts={posts} tags={tags} />)
    expect(screen.getByText('글-a')).toBeInTheDocument()
    expect(screen.getByText('글-c')).toBeInTheDocument()
    expect(screen.queryByText('글-b')).not.toBeInTheDocument()
  })

  it('태그 클릭 시 router.replace로 tag 쿼리를 설정한다', async () => {
    render(<PostList posts={posts} tags={tags} />)
    await userEvent.click(screen.getByRole('button', { name: /MDX/ }))
    expect(replace).toHaveBeenCalledWith('/writing?tag=MDX', { scroll: false })
  })

  it('전체 0건이면 빈 상태(작성된 글 없음)를 렌더한다', () => {
    render(<PostList posts={[]} tags={[]} />)
    expect(screen.getByText('아직 작성된 글이 없습니다.')).toBeInTheDocument()
  })

  it('필터 결과 0건이면 전체 보기 액션이 있는 빈 상태를 렌더한다', () => {
    searchParams = new URLSearchParams('tag=Next.js')
    render(<PostList posts={[meta('only', ['MDX'])]} tags={[{ tag: 'Next.js', count: 0 }]} />)
    expect(screen.getByText(/태그의 글이 없습니다/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '전체 보기' })).toBeInTheDocument()
  })
})
