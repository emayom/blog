import { describe, it, expect } from 'vitest'
import { getAllNotes, getNoteBody } from './notes'

describe('getAllNotes', () => {
  it('non-draft 샘플 메모를 파싱한다', () => {
    const notes = getAllNotes()
    expect(notes.length).toBeGreaterThanOrEqual(3)
  })

  it('date 내림차순으로 정렬한다', () => {
    const dates = getAllNotes().map(n => n.date)
    const sorted = [...dates].sort((a, b) => b.localeCompare(a))
    expect(dates).toEqual(sorted)
  })

  it('tags·pinned 기본값을 채운다', () => {
    getAllNotes().forEach((note) => {
      expect(Array.isArray(note.tags)).toBe(true)
      expect(typeof note.pinned).toBe('boolean')
    })
  })

  it('pinned 메모가 최소 1개 있다', () => {
    expect(getAllNotes().some(n => n.pinned)).toBe(true)
  })
})

describe('getNoteBody', () => {
  it('frontmatter 블록을 제거한 본문을 반환한다', () => {
    const body = getNoteBody('naming-is-hard')
    expect(body).not.toContain('---')
    expect(body).toContain('좋은 이름은')
  })

  it('존재하지 않는 slug는 빈 문자열', () => {
    expect(getNoteBody('does-not-exist')).toBe('')
  })
})
