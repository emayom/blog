import { describe, expect, it } from 'vitest'
import { filterLibraryItemsByTitle } from './library-search'
import type { LibraryItemMeta } from '@/types/library'

function item(title: string): LibraryItemMeta {
  return { title, type: 'anime', draft: false, slug: title.toLowerCase().replace(/\s/g, '-') }
}

const items: LibraryItemMeta[] = [
  item('장송의 프리렌 1기'),
  item('주술회전 1기'),
  item('귀멸의 칼날'),
  item('나의 히어로 아카데미아 1기'),
]

describe('filterLibraryItemsByTitle', () => {
  it('빈 쿼리는 전체 반환', () => {
    expect(filterLibraryItemsByTitle(items, '')).toEqual(items)
    expect(filterLibraryItemsByTitle(items, '  ')).toEqual(items)
  })

  it('정확 일치', () => {
    const result = filterLibraryItemsByTitle(items, '프리렌')
    expect(result.some(r => r.title === '장송의 프리렌 1기')).toBe(true)
  })

  it('부분 일치', () => {
    const result = filterLibraryItemsByTitle(items, '주술')
    expect(result.some(r => r.title === '주술회전 1기')).toBe(true)
  })

  it('미스매치는 빈 배열', () => {
    expect(filterLibraryItemsByTitle(items, 'xyzxyz')).toHaveLength(0)
  })
})
