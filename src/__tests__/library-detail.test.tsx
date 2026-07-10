import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LibraryDetail } from '@/components/library/library-detail'
import type { LibraryItem } from '@/types/library'

function item(overrides: Partial<LibraryItem> = {}): LibraryItem {
  return {
    slug: 'x',
    title: '테스트 책',
    type: 'book',
    draft: false,
    featured: false,
    content: null,
    ...overrides,
  }
}

describe('LibraryDetail', () => {
  it('breadcrumb과 제목·저자·메타를 렌더한다', () => {
    render(
      <LibraryDetail
        item={item({ author: '홍길동', date: '2026-02', genres: ['Drama', 'Fantasy'], status: 'FINISHED' })}
        hasBody={false}
      />,
    )
    expect(screen.getByRole('heading', { level: 1, name: '테스트 책' })).toBeInTheDocument()
    expect(screen.getByText('홍길동')).toBeInTheDocument()
    expect(screen.getByText('Drama·Fantasy')).toBeInTheDocument()
    expect(screen.getByText('FINISHED')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '책장' })).toHaveAttribute('href', '/library?type=book')
  })

  it('문장·감상이 모두 없으면 EmptyState를 렌더한다', () => {
    render(<LibraryDetail item={item()} hasBody={false} />)
    expect(screen.getByText('아직 감상 기록이 없어요')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '책장으로 돌아가기' })).toHaveAttribute('href', '/library?type=book')
  })

  it('book은 복귀 링크에 ?type=book, anime는 파라미터 없이 /library로 이동한다', () => {
    const { rerender } = render(<LibraryDetail item={item({ type: 'book' })} hasBody={false} />)
    expect(screen.getByRole('link', { name: '책장' })).toHaveAttribute('href', '/library?type=book')
    rerender(<LibraryDetail item={item({ type: 'anime' })} hasBody={false} />)
    expect(screen.getByRole('link', { name: '책장' })).toHaveAttribute('href', '/library')
  })

  it('quotes가 있으면 문장 섹션과 복귀 링크를 렌더한다', () => {
    render(<LibraryDetail item={item({ quotes: ['공유하고 싶은 문장 하나'] })} hasBody={false} />)
    expect(screen.getByText('공유하고 싶은 문장 하나')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '← 책장으로' })).toBeInTheDocument()
    expect(screen.queryByText('아직 감상 기록이 없어요')).not.toBeInTheDocument()
  })

  it('quotes와 감상이 모두 있으면 둘 다 렌더한다', () => {
    render(
      <LibraryDetail
        item={item({ quotes: ['밑줄 문장'], content: <p>감상 본문입니다</p> })}
        hasBody
      />,
    )
    expect(screen.getByText('밑줄 문장')).toBeInTheDocument()
    expect(screen.getByText('감상 본문입니다')).toBeInTheDocument()
  })

  it('본문이 있으면 content와 복귀 링크를 렌더한다', () => {
    render(<LibraryDetail item={item({ content: <p>감상 본문입니다</p> })} hasBody />)
    expect(screen.getByText('감상 본문입니다')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '← 책장으로' })).toHaveAttribute('href', '/library?type=book')
    expect(screen.queryByText('아직 감상 기록이 없어요')).not.toBeInTheDocument()
  })

  it('저자가 없으면 저자를 표출하지 않는다', () => {
    render(<LibraryDetail item={item()} hasBody={false} />)
    expect(screen.queryByText('홍길동')).not.toBeInTheDocument()
  })
})
