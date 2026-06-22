import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SeriesNavigation } from '@/components/writing/series-navigation'
import type { PostMeta } from '@/types/post'
import type { SeriesNavigation as SeriesNavigationData } from '@/types/series-navigation'

function meta(slug: string): PostMeta {
  return {
    slug,
    title: `제목 ${slug}`,
    date: '2026-01-01',
    tags: [],
    draft: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
  }
}

function nav(): SeriesNavigationData {
  return {
    name: '자바스크립트로 구현하는 자료구조',
    total: 2,
    currentPosition: 2,
    items: [
      { post: meta('lru'), order: 1, isCurrent: false },
      { post: meta('heap'), order: 2, isCurrent: true },
    ],
  }
}

describe('SeriesNavigation', () => {
  it('series가 null이면 아무것도 렌더하지 않는다', () => {
    const { container } = render(<SeriesNavigation series={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('시리즈명과 위치 메타를 렌더한다', () => {
    render(<SeriesNavigation series={nav()} />)
    expect(screen.getByText('자바스크립트로 구현하는 자료구조')).toBeInTheDocument()
    expect(screen.getByText('2편 중 2번째')).toBeInTheDocument()
  })

  it('일반 항목은 링크로, 현재 글은 비링크 aria-current로 렌더한다', () => {
    render(<SeriesNavigation series={nav()} />)

    const link = screen.getByRole('link', { name: /제목 lru/ })
    expect(link).toHaveAttribute('href', '/writing/lru')
    expect(link).toHaveTextContent('1. 제목 lru')

    const current = screen.getByText('2. 제목 heap')
    expect(current).toHaveAttribute('aria-current', 'true')
    expect(current.tagName).toBe('SPAN')
    expect(screen.queryByRole('link', { name: /제목 heap/ })).not.toBeInTheDocument()
  })

  it('시맨틱 ol로 목록을 렌더한다', () => {
    render(<SeriesNavigation series={nav()} />)
    expect(screen.getByRole('list').tagName).toBe('OL')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
