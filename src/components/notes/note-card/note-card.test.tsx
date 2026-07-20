import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NoteCardShell } from '@/components/notes/note-card'
import type { NoteMeta } from '@/types/note'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string, children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

const CURRENT_YEAR = new Date().getFullYear()

function note(overrides: Partial<NoteMeta> = {}): NoteMeta {
  return {
    slug: 'x',
    date: `${CURRENT_YEAR}-07-08`,
    tags: [],
    pinned: false,
    draft: false,
    ...overrides,
  }
}

describe('NoteCardShell', () => {
  it('대표 태그 하나만·짧은 날짜·본문을 렌더한다 (제목 없음)', () => {
    render(
      <NoteCardShell note={note({ tags: ['thought', 'design'] })}>
        <p>본문 단상입니다</p>
      </NoteCardShell>,
    )
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('thought')).toBeInTheDocument()
    // 두 번째 태그는 렌더되지 않는다 (대표 태그 1개만).
    expect(screen.queryByText('design')).not.toBeInTheDocument()
    expect(screen.getByText('07.08')).toBeInTheDocument()
    expect(screen.getByText('본문 단상입니다')).toBeInTheDocument()
  })

  it('대표 태그는 /notes?tag= 링크로 렌더한다', () => {
    render(
      <NoteCardShell note={note({ tags: ['생각'] })}>
        <p>본문</p>
      </NoteCardShell>,
    )
    expect(screen.getByRole('link', { name: '생각' })).toHaveAttribute(
      'href',
      '/notes?tag=%EC%83%9D%EA%B0%81',
    )
  })

  it('태그가 없으면 태그 칩 없이 날짜만 렌더한다', () => {
    render(
      <NoteCardShell note={note({ tags: [] })}>
        <p>본문</p>
      </NoteCardShell>,
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('07.08')).toBeInTheDocument()
  })

  it('고정 메모는 고정 표시를 렌더한다', () => {
    render(
      <NoteCardShell note={note({ pinned: true })}>
        <p>본문</p>
      </NoteCardShell>,
    )
    expect(screen.getByText('고정')).toBeInTheDocument()
  })

  it('고정이 아니면 고정 표시가 없다', () => {
    render(
      <NoteCardShell note={note({ pinned: false })}>
        <p>본문</p>
      </NoteCardShell>,
    )
    expect(screen.queryByText('고정')).not.toBeInTheDocument()
  })

  it('올해 메모는 월.일만 표기한다', () => {
    render(
      <NoteCardShell note={note({ date: `${CURRENT_YEAR}-07-08` })}>
        <p>본문</p>
      </NoteCardShell>,
    )
    expect(screen.getByText('07.08')).toBeInTheDocument()
  })

  it('지난 해 메모는 연도까지 표기한다', () => {
    render(
      <NoteCardShell note={note({ date: '2020-03-05' })}>
        <p>본문</p>
      </NoteCardShell>,
    )
    expect(screen.getByText('2020.03.05')).toBeInTheDocument()
  })
})
