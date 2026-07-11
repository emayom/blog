import { describe, expect, it } from 'vitest'
import { getNoteTagCounts, getNotesByTag, getPrimaryTag } from '@/lib/note-tags'
import type { NoteMeta } from '@/types/note'

function meta(slug: string, tags: string[]): NoteMeta {
  return {
    slug,
    date: '2026-01-01',
    tags,
    pinned: false,
    draft: false,
  }
}

describe('getPrimaryTag', () => {
  it('tags 배열의 첫 번째 태그를 반환한다', () => {
    expect(getPrimaryTag(meta('a', ['thought', 'naming']))).toBe('thought')
  })

  it('태그가 없으면 undefined를 반환한다', () => {
    expect(getPrimaryTag(meta('a', []))).toBeUndefined()
  })
})

describe('getNoteTagCounts', () => {
  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(getNoteTagCounts([])).toEqual([])
  })

  it('각 메모의 대표 태그(tags[0])만 집계한다 — 겹침 없음', () => {
    const notes = [
      meta('a', ['thought', 'naming']),
      meta('b', ['thought']),
    ]
    // thought=2, naming은 대표가 아니므로 나타나지 않는다.
    expect(getNoteTagCounts(notes)).toEqual([{ tag: 'thought', count: 2 }])
  })

  it('개수 내림차순, 동일 개수는 가나다순으로 정렬한다', () => {
    const notes = [
      meta('a', ['B']),
      meta('b', ['B']),
      meta('c', ['B']),
      meta('d', ['A']),
      meta('e', ['C']),
    ]
    expect(getNoteTagCounts(notes)).toEqual([
      { tag: 'B', count: 3 },
      { tag: 'A', count: 1 },
      { tag: 'C', count: 1 },
    ])
  })

  it('대표 태그 카운트 합은 태그 있는 메모 수와 같다', () => {
    const notes = [
      meta('a', ['x', 'y']),
      meta('b', ['y', 'x']),
      meta('c', ['z']),
      meta('d', []),
    ]
    const total = getNoteTagCounts(notes).reduce((sum, t) => sum + t.count, 0)
    expect(total).toBe(3)
  })

  it('태그가 없는 메모는 무시한다', () => {
    const notes = [meta('a', []), meta('b', ['X'])]
    expect(getNoteTagCounts(notes)).toEqual([{ tag: 'X', count: 1 }])
  })
})

describe('getNotesByTag', () => {
  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(getNotesByTag([], 'react')).toEqual([])
  })

  it('대표 태그가 일치하는 메모만 반환한다', () => {
    const notes = [
      meta('a', ['react', 'nextjs']),
      meta('b', ['react']),
      meta('c', ['nextjs']),
    ]
    const result = getNotesByTag(notes, 'react')
    expect(result).toHaveLength(2)
    expect(result.map(n => n.slug)).toEqual(['a', 'b'])
  })

  it('대표 태그가 아닌 태그로는 필터되지 않는다', () => {
    const notes = [
      meta('a', ['thought', 'naming']),
      meta('b', ['thought']),
    ]
    // naming은 어떤 메모의 대표 태그도 아니다.
    expect(getNotesByTag(notes, 'naming')).toEqual([])
  })

  it('존재하지 않는 태그는 빈 배열을 반환한다', () => {
    const notes = [meta('a', ['react']), meta('b', ['nextjs'])]
    expect(getNotesByTag(notes, 'vue')).toEqual([])
  })

  it('태그는 정확히 일치해야 한다 (부분 문자열 불일치)', () => {
    const notes = [meta('a', ['react']), meta('b', ['react-native'])]
    const result = getNotesByTag(notes, 'react')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('a')
  })
})
