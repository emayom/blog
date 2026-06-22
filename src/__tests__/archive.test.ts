import { describe, expect, it } from 'vitest'
import { getArchiveCounts, getPostsByYear } from '@/lib/archive'
import type { PostMeta } from '@/types/post'

function meta(slug: string, date: string): PostMeta {
  return {
    slug,
    title: slug,
    date,
    tags: [],
    draft: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
  }
}

describe('getArchiveCounts', () => {
  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(getArchiveCounts([])).toEqual([])
  })

  it('연도별 글 수를 합산한다', () => {
    const posts = [
      meta('a', '2026-06-18'),
      meta('b', '2026-01-02'),
      meta('c', '2025-12-31'),
    ]
    expect(getArchiveCounts(posts)).toEqual([
      { year: '2026', count: 2 },
      { year: '2025', count: 1 },
    ])
  })

  it('연도 내림차순으로 정렬한다', () => {
    const posts = [
      meta('a', '2024-01-01'),
      meta('b', '2026-01-01'),
      meta('c', '2025-01-01'),
    ]
    expect(getArchiveCounts(posts).map(y => y.year)).toEqual([
      '2026',
      '2025',
      '2024',
    ])
  })

  it('날짜 형식이 불량한 글(빈 문자열·비YYYY)은 제외한다', () => {
    const posts = [
      meta('a', '2026-06-18'),
      meta('b', ''),
      meta('c', 'invalid-date'),
      meta('d', '26-06-18'),
    ]
    expect(getArchiveCounts(posts)).toEqual([{ year: '2026', count: 1 }])
  })
})

describe('getPostsByYear', () => {
  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(getPostsByYear([], '2024')).toEqual([])
  })

  it('해당 연도의 글만 반환한다', () => {
    const posts = [
      meta('a', '2024-01-01'),
      meta('b', '2024-06-15'),
      meta('c', '2025-03-10'),
    ]
    const result = getPostsByYear(posts, '2024')
    expect(result).toHaveLength(2)
    expect(result.map(p => p.slug)).toEqual(['a', 'b'])
  })

  it('존재하지 않는 연도는 빈 배열을 반환한다', () => {
    const posts = [meta('a', '2024-01-01'), meta('b', '2025-01-01')]
    expect(getPostsByYear(posts, '2023')).toEqual([])
  })

  it('date.startsWith(year) 기준으로 필터한다', () => {
    const posts = [
      meta('a', '2024-01-01'),
      meta('b', '20241231'), // YYYY 슬래시 없이도 startsWith 통과
    ]
    const result = getPostsByYear(posts, '2024')
    expect(result).toHaveLength(2)
  })
})
