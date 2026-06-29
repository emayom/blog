import { describe, expect, it } from 'vitest'
import { getTagCounts, getPostsByTag } from '@/lib/tags'
import type { PostMeta } from '@/types/post'

function meta(slug: string, tags: string[]): PostMeta {
  return {
    slug,
    title: slug,
    date: '2026-01-01',
    tags,
    draft: false,
    featured: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
  }
}

describe('getTagCounts', () => {
  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(getTagCounts([])).toEqual([])
  })

  it('태그별 개수를 집계한다', () => {
    const posts = [
      meta('a', ['Next.js', 'MDX']),
      meta('b', ['Next.js']),
      meta('c', ['MDX']),
    ]
    expect(getTagCounts(posts)).toEqual([
      { tag: 'MDX', count: 2 },
      { tag: 'Next.js', count: 2 },
    ])
  })

  it('개수 내림차순, 동일 개수는 가나다순으로 정렬한다', () => {
    const posts = [
      meta('a', ['B', 'C']),
      meta('b', ['B', 'A']),
      meta('c', ['B']),
    ]
    expect(getTagCounts(posts)).toEqual([
      { tag: 'B', count: 3 },
      { tag: 'A', count: 1 },
      { tag: 'C', count: 1 },
    ])
  })

  it('태그가 없는 글은 무시한다', () => {
    const posts = [meta('a', []), meta('b', ['X'])]
    expect(getTagCounts(posts)).toEqual([{ tag: 'X', count: 1 }])
  })
})

describe('getPostsByTag', () => {
  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(getPostsByTag([], 'react')).toEqual([])
  })

  it('해당 태그를 가진 글만 반환한다', () => {
    const posts = [
      meta('a', ['react', 'nextjs']),
      meta('b', ['react']),
      meta('c', ['nextjs']),
    ]
    const result = getPostsByTag(posts, 'react')
    expect(result).toHaveLength(2)
    expect(result.map(p => p.slug)).toEqual(['a', 'b'])
  })

  it('존재하지 않는 태그는 빈 배열을 반환한다', () => {
    const posts = [meta('a', ['react']), meta('b', ['nextjs'])]
    expect(getPostsByTag(posts, 'vue')).toEqual([])
  })

  it('태그는 정확히 일치해야 한다 (부분 문자열 불일치)', () => {
    const posts = [meta('a', ['react']), meta('b', ['react-native'])]
    const result = getPostsByTag(posts, 'react')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('a')
  })
})
