import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { PostMeta } from '@/types/post'
import type { TagCount } from '@/types/tag'

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

describe('PostList', () => {
  it('모든 글을 렌더한다', () => {
    render(<PostList posts={posts} tags={tags} />)
    expect(screen.getByText('글-a')).toBeInTheDocument()
    expect(screen.getByText('글-b')).toBeInTheDocument()
    expect(screen.getByText('글-c')).toBeInTheDocument()
  })

  it('태그 필터 링크를 렌더한다', () => {
    render(<PostList posts={posts} tags={tags} />)
    expect(screen.getByRole('link', { name: 'Next.js2' })).toHaveAttribute('href', '/tag/Next.js')
    expect(screen.getByRole('link', { name: 'MDX1' })).toHaveAttribute('href', '/tag/MDX')
  })

  it('전체 0건이면 빈 상태를 렌더한다', () => {
    render(<PostList posts={[]} tags={[]} />)
    expect(screen.getByText('아직 작성된 글이 없습니다.')).toBeInTheDocument()
  })
})
