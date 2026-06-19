import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PostNavigation } from '@/components/writing/post-navigation'
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

describe('PostNavigation', () => {
  it('prev·next가 모두 null이면 아무것도 렌더하지 않는다', () => {
    const { container } = render(<PostNavigation prev={null} next={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('prev·next 라벨과 제목, 링크를 렌더한다', () => {
    render(<PostNavigation prev={meta('older')} next={meta('newer')} />)
    expect(screen.getByText('이전 글')).toBeInTheDocument()
    expect(screen.getByText('다음 글')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /제목 older/ })).toHaveAttribute(
      'href',
      '/writing/older',
    )
    expect(screen.getByRole('link', { name: /제목 newer/ })).toHaveAttribute(
      'href',
      '/writing/newer',
    )
  })

  it('prev만 있으면 다음 글 셀은 미렌더', () => {
    render(<PostNavigation prev={meta('older')} next={null} />)
    expect(screen.getByText('이전 글')).toBeInTheDocument()
    expect(screen.queryByText('다음 글')).not.toBeInTheDocument()
  })

  it('next만 있으면 col-start-2로 위치를 유지한다', () => {
    render(<PostNavigation prev={null} next={meta('newer')} />)
    expect(screen.queryByText('이전 글')).not.toBeInTheDocument()
    const link = screen.getByRole('link', { name: /제목 newer/ })
    expect(link.className).toContain('sm:col-start-2')
  })
})
