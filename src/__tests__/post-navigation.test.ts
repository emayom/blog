import { describe, expect, it } from 'vitest'
import { getAdjacentPosts, getRelatedPosts } from '@/lib/post-navigation'
import type { PostMeta } from '@/types/post'

function meta(slug: string, date: string, tags: string[] = []): PostMeta {
  return {
    slug,
    title: `제목 ${slug}`,
    date,
    tags,
    draft: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
  }
}

// 날짜 내림차순 목록 (getPostMetaList 결과 형태)
const posts = [
  meta('c', '2026-03-01'),
  meta('b', '2026-02-01'),
  meta('a', '2026-01-01'),
]

describe('getAdjacentPosts', () => {
  it('중간 글은 next=더 최신, prev=더 과거를 반환한다', () => {
    expect(getAdjacentPosts(posts, 'b')).toEqual({
      next: posts[0],
      prev: posts[2],
    })
  })

  it('첫(최신) 글은 next=null', () => {
    expect(getAdjacentPosts(posts, 'c')).toEqual({ next: null, prev: posts[1] })
  })

  it('마지막(과거) 글은 prev=null', () => {
    expect(getAdjacentPosts(posts, 'a')).toEqual({ next: posts[1], prev: null })
  })

  it('목록에 없는 slug는 양쪽 null', () => {
    expect(getAdjacentPosts(posts, 'nope')).toEqual({ next: null, prev: null })
  })

  it('글이 1개면 양쪽 null', () => {
    const one = [meta('solo', '2026-01-01')]
    expect(getAdjacentPosts(one, 'solo')).toEqual({ next: null, prev: null })
  })

  it('빈 목록은 양쪽 null', () => {
    expect(getAdjacentPosts([], 'a')).toEqual({ next: null, prev: null })
  })
})

describe('getRelatedPosts', () => {
  it('태그 겹침 수 내림차순으로 정렬한다', () => {
    const list = [
      meta('current', '2026-05-01', ['react', 'ts']),
      meta('two', '2026-04-01', ['react', 'ts']),
      meta('one', '2026-03-01', ['react']),
    ]
    const result = getRelatedPosts(list, 'current')
    expect(result.map(p => p.slug)).toEqual(['two', 'one'])
  })

  it('겹침 수 동점은 날짜 내림차순으로 tie-break 한다', () => {
    const list = [
      meta('current', '2026-05-01', ['react']),
      meta('older', '2026-03-01', ['react']),
      meta('newer', '2026-04-01', ['react']),
    ]
    const result = getRelatedPosts(list, 'current')
    expect(result.map(p => p.slug)).toEqual(['newer', 'older'])
  })

  it('자기 자신은 제외한다', () => {
    const list = [
      meta('current', '2026-05-01', ['react']),
      meta('other', '2026-04-01', ['react']),
    ]
    const result = getRelatedPosts(list, 'current')
    expect(result.map(p => p.slug)).toEqual(['other'])
  })

  it('태그가 하나도 안 겹치는 글은 제외한다', () => {
    const list = [
      meta('current', '2026-05-01', ['react']),
      meta('vue', '2026-04-01', ['vue']),
    ]
    expect(getRelatedPosts(list, 'current')).toEqual([])
  })

  it('현재 글 태그가 비어 있으면 빈 배열', () => {
    const list = [
      meta('current', '2026-05-01', []),
      meta('other', '2026-04-01', ['react']),
    ]
    expect(getRelatedPosts(list, 'current')).toEqual([])
  })

  it('limit(기본 3)까지만 반환한다', () => {
    const list = [
      meta('current', '2026-05-01', ['react']),
      meta('a', '2026-04-01', ['react']),
      meta('b', '2026-03-01', ['react']),
      meta('c', '2026-02-01', ['react']),
      meta('d', '2026-01-01', ['react']),
    ]
    expect(getRelatedPosts(list, 'current')).toHaveLength(3)
  })

  it('목록에 없는 slug는 빈 배열', () => {
    expect(getRelatedPosts(posts, 'nope')).toEqual([])
  })

  it('limit 인자를 받는다', () => {
    const list = [
      meta('current', '2026-05-01', ['react']),
      meta('a', '2026-04-01', ['react']),
      meta('b', '2026-03-01', ['react']),
    ]
    expect(getRelatedPosts(list, 'current', 1)).toHaveLength(1)
  })
})
