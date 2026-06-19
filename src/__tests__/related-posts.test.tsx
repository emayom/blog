import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RelatedPosts } from '@/components/writing/related-posts'
import type { PostMeta } from '@/types/post'

function meta(slug: string): PostMeta {
  return {
    slug,
    title: `제목 ${slug}`,
    date: '2026-06-18',
    tags: ['react'],
    draft: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
  }
}

describe('RelatedPosts', () => {
  it('글이 비면 섹션·divider 모두 렌더하지 않는다', () => {
    const { container } = render(<RelatedPosts posts={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('"관련 글" 제목과 카드를 렌더한다', () => {
    render(<RelatedPosts posts={[meta('a'), meta('b')]} />)
    expect(screen.getByRole('heading', { name: '관련 글' })).toBeInTheDocument()
    expect(screen.getByText('제목 a')).toBeInTheDocument()
    expect(screen.getByText('제목 b')).toBeInTheDocument()
  })

  it('각 카드가 해당 글 상세로 링크된다', () => {
    render(<RelatedPosts posts={[meta('a')]} />)
    expect(screen.getByRole('link', { name: /제목 a/ })).toHaveAttribute(
      'href',
      '/writing/a',
    )
  })
})
