import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RecentPosts } from '@/components/home/recent-posts'
import type { PostMeta } from '@/types/post'

function meta(slug: string): PostMeta {
  return {
    slug,
    title: `제목 ${slug}`,
    date: '2026-06-18',
    tags: [],
    draft: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
  }
}

describe('RecentPosts', () => {
  it('최대 3개의 글만 렌더한다', () => {
    const posts = [meta('a'), meta('b'), meta('c'), meta('d'), meta('e')]
    render(<RecentPosts posts={posts} />)
    expect(screen.getByText('제목 a')).toBeInTheDocument()
    expect(screen.getByText('제목 c')).toBeInTheDocument()
    expect(screen.queryByText('제목 d')).not.toBeInTheDocument()
  })

  it('"전체 →" 링크가 /writing을 가리킨다', () => {
    render(<RecentPosts posts={[meta('a')]} />)
    const link = screen.getByRole('link', { name: /전체/ })
    expect(link).toHaveAttribute('href', '/writing')
  })

  it('글이 없으면 빈 상태를 렌더한다', () => {
    render(<RecentPosts posts={[]} />)
    expect(screen.getByText('아직 작성된 글이 없습니다.')).toBeInTheDocument()
  })
})
