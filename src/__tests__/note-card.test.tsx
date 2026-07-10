import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NoteCardShell } from '@/components/notes/note-card'
import type { NoteMeta } from '@/types/note'

function note(overrides: Partial<NoteMeta> = {}): NoteMeta {
  return {
    slug: 'x',
    date: '2026-07-08',
    tags: [],
    pinned: false,
    draft: false,
    ...overrides,
  }
}

describe('NoteCardShell', () => {
  it('태그·짧은 날짜·본문을 렌더한다 (제목 없음)', () => {
    render(
      <NoteCardShell note={note({ tags: ['thought', 'design'] })}>
        <p>본문 단상입니다</p>
      </NoteCardShell>,
    )
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('thought')).toBeInTheDocument()
    expect(screen.getByText('design')).toBeInTheDocument()
    expect(screen.getByText('07.08')).toBeInTheDocument()
    expect(screen.getByText('본문 단상입니다')).toBeInTheDocument()
  })

  it('태그가 없으면 날짜만 렌더한다', () => {
    render(
      <NoteCardShell note={note({ tags: [] })}>
        <p>본문</p>
      </NoteCardShell>,
    )
    expect(screen.getByText('07.08')).toBeInTheDocument()
  })
})
