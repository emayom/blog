import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { PostMeta } from '@/types/post'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string, children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />,
}))

import { FeaturedPosts } from '@/components/writing/featured-posts'

function meta(slug: string, thumbnail = ''): PostMeta {
  return {
    slug,
    title: `글-${slug}`,
    date: '2026-01-01',
    tags: [],
    draft: false,
    featured: true,
    description: '',
    thumbnail,
    readingTime: 1,
  }
}

describe('FeaturedPosts', () => {
  it('제목과 각 글 제목을 렌더한다', () => {
    render(<FeaturedPosts posts={[meta('a'), meta('b')]} />)
    expect(screen.getByText('Featured Posts')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /글-a/ })).toHaveAttribute('href', '/writing/a')
    expect(screen.getByText('글-b')).toBeInTheDocument()
  })

  it('posts가 비어 있으면 아무것도 렌더하지 않는다', () => {
    const { container } = render(<FeaturedPosts posts={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('thumbnail이 있으면 이미지를, 없으면 이미지를 렌더하지 않는다', () => {
    render(<FeaturedPosts posts={[meta('with', '/x.png'), meta('without')]} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(1)
    expect(images[0]).toHaveAttribute('src', '/x.png')
  })
})
