import { describe, it, expect } from 'vitest'
import { getAllLibraryItems, getLibraryItemsByType, groupByYear } from './library'
import type { LibraryItemMeta } from '@/types/library'

function item(slug: string, date?: string): LibraryItemMeta {
  return { slug, title: slug, type: 'book', date, featured: false, draft: false }
}

describe('library', () => {
  it('샘플 2개 파싱', () => {
    expect(getAllLibraryItems().length).toBeGreaterThanOrEqual(2)
  })
  it('book 필터', () => {
    expect(getLibraryItemsByType('book').length).toBeGreaterThanOrEqual(1)
  })
  it('anime 필터', () => {
    expect(getLibraryItemsByType('anime').length).toBeGreaterThanOrEqual(1)
  })
  it('id가 string 타입', () => {
    const items = getAllLibraryItems()
    items.forEach((item) => {
      if (item.id !== undefined) expect(typeof item.id).toBe('string')
    })
  })
})

describe('groupByYear', () => {
  it('빈 배열은 빈 결과', () => {
    expect(groupByYear([])).toEqual([])
  })
  it('연도 내림차순 정렬', () => {
    const result = groupByYear([item('a', '2023-01-01'), item('b', '2025-05-05'), item('c', '2024-02-02')])
    expect(result.map(([y]) => y)).toEqual(['2025', '2024', '2023'])
  })
  it('같은 연도끼리 묶음', () => {
    const result = groupByYear([item('a', '2025-01-01'), item('b', '2025-12-31')])
    expect(result).toHaveLength(1)
    expect(result[0][1]).toHaveLength(2)
  })
  it('date 없는 항목은 \'\' 그룹으로 맨 뒤', () => {
    const result = groupByYear([item('a'), item('b', '2025-01-01')])
    expect(result.map(([y]) => y)).toEqual(['2025', ''])
  })
})
