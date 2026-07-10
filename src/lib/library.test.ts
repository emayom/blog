import { describe, it, expect } from 'vitest'
import { getAllLibraryItems, getLibraryBody, getLibraryItem, getLibraryItemsByType, groupByYear } from './library'
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

describe('getLibraryBody', () => {
  it('quotes가 frontmatter로 분리된 항목은 본문이 비어 있다', () => {
    expect(getLibraryBody('a-short-philosophy-from-birds')).toBe('')
  })
  it('존재하지 않는 slug는 빈 문자열', () => {
    expect(getLibraryBody('does-not-exist')).toBe('')
  })
})

describe('quotes frontmatter', () => {
  it('quotes 리스트를 문자열 배열로 파싱한다', () => {
    const bird = getLibraryItemsByType('book').find(b => b.slug === 'a-short-philosophy-from-birds')
    expect(bird?.quotes).toHaveLength(5)
    expect(bird?.quotes?.[0]).toContain('티티새')
  })
  it('quotes 없는 항목은 undefined', () => {
    const frieren = getLibraryItemsByType('anime').find(a => a.slug === 'frieren-beyond-journeys-end-s1')
    expect(frieren?.quotes).toBeUndefined()
  })
})

describe('getLibraryItem', () => {
  it('존재하는 slug는 메타와 content를 반환한다', async () => {
    const item = await getLibraryItem('a-short-philosophy-from-birds')
    expect(item).not.toBeNull()
    expect(item?.slug).toBe('a-short-philosophy-from-birds')
    expect(item?.title).toBe('새들이 전하는 짧은 철학')
    expect(item?.content).toBeDefined()
  })

  it('본문 없는 항목도 메타를 반환한다', async () => {
    const item = await getLibraryItem('frieren-beyond-journeys-end-s1')
    expect(item).not.toBeNull()
    expect(item?.title).toBe('장송의 프리렌 1기')
    expect(getLibraryBody('frieren-beyond-journeys-end-s1')).toBe('')
  })

  it('존재하지 않는 slug는 null', async () => {
    expect(await getLibraryItem('does-not-exist')).toBeNull()
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
