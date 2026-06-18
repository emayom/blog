import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PostCard } from '@/components/writing/post-card'
import type { PostMeta } from '@/types/post'

const post: PostMeta = {
  slug: 'hello-world',
  title: '안녕 세상',
  date: '2026-06-18',
  tags: ['Next.js', 'MDX'],
  draft: false,
  description: '첫 글입니다.',
  thumbnail: '',
  readingTime: 3,
}

describe('PostCard', () => {
  it('제목을 렌더하고 slug로 링크한다', () => {
    render(<PostCard post={post} />)
    const link = screen.getByRole('link', { name: /안녕 세상/ })
    expect(link).toHaveAttribute('href', '/writing/hello-world')
  })

  it('날짜를 점 형식으로, 읽기 시간을 표시한다', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('2026.06.18')).toBeInTheDocument()
    expect(screen.getByText('3분 읽기')).toBeInTheDocument()
  })

  it('태그를 모두 렌더한다', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('MDX')).toBeInTheDocument()
  })

  it('description이 없으면 요약을 렌더하지 않는다', () => {
    render(<PostCard post={{ ...post, description: '' }} />)
    expect(screen.queryByText('첫 글입니다.')).not.toBeInTheDocument()
  })
})
