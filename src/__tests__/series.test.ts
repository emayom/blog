import { describe, expect, it } from 'vitest'
import { getSeriesNavigation, sortSeriesPosts } from '@/lib/series'
import type { PostMeta } from '@/types/post'

function meta(
  slug: string,
  date: string,
  series?: string,
  seriesOrder?: number,
): PostMeta {
  return {
    slug,
    title: `제목 ${slug}`,
    date,
    tags: [],
    draft: false,
    description: '',
    thumbnail: '',
    readingTime: 1,
    series,
    seriesOrder,
  }
}

describe('sortSeriesPosts', () => {
  it('seriesOrder 오름차순으로 정렬한다', () => {
    const posts = [
      meta('b', '2026-01-02', 'S', 2),
      meta('a', '2026-01-01', 'S', 1),
      meta('c', '2026-01-03', 'S', 3),
    ]
    expect(sortSeriesPosts(posts).map(p => p.slug)).toEqual(['a', 'b', 'c'])
  })

  it('seriesOrder 동점은 date 오름차순으로 tie-break 한다', () => {
    const posts = [
      meta('newer', '2026-02-01', 'S', 1),
      meta('older', '2026-01-01', 'S', 1),
    ]
    expect(sortSeriesPosts(posts).map(p => p.slug)).toEqual(['older', 'newer'])
  })

  it('seriesOrder 0을 정상 정렬한다 (truthy 검사 금지)', () => {
    const posts = [
      meta('one', '2026-01-02', 'S', 1),
      meta('zero', '2026-01-01', 'S', 0),
    ]
    expect(sortSeriesPosts(posts).map(p => p.slug)).toEqual(['zero', 'one'])
  })

  it('seriesOrder 미존재는 date 오름차순으로 정렬한다', () => {
    const posts = [
      meta('b', '2026-02-01', 'S'),
      meta('a', '2026-01-01', 'S'),
    ]
    expect(sortSeriesPosts(posts).map(p => p.slug)).toEqual(['a', 'b'])
  })
})

describe('getSeriesNavigation', () => {
  it('같은 시리즈 글을 그룹핑하고 위치·전체 편수를 계산한다', () => {
    const posts = [
      meta('b', '2026-01-14', '자료구조', 2),
      meta('a', '2026-01-03', '자료구조', 1),
      meta('x', '2026-01-05', '다른 시리즈', 1),
    ]
    const nav = getSeriesNavigation(posts, 'b')
    expect(nav).not.toBeNull()
    expect(nav?.name).toBe('자료구조')
    expect(nav?.total).toBe(2)
    expect(nav?.currentPosition).toBe(2)
    expect(nav?.items.map(i => i.post.slug)).toEqual(['a', 'b'])
    expect(nav?.items.map(i => i.order)).toEqual([1, 2])
    expect(nav?.items.find(i => i.isCurrent)?.post.slug).toBe('b')
  })

  it('1편(첫 글) 진입 시 currentPosition=1', () => {
    const posts = [
      meta('b', '2026-01-14', '자료구조', 2),
      meta('a', '2026-01-03', '자료구조', 1),
    ]
    const nav = getSeriesNavigation(posts, 'a')
    expect(nav?.currentPosition).toBe(1)
    expect(nav?.items.find(i => i.isCurrent)?.post.slug).toBe('a')
  })

  it('시리즈에 속하지 않은 글은 null을 반환한다', () => {
    const posts = [
      meta('a', '2026-01-01', '자료구조', 1),
      meta('plain', '2026-01-02'),
    ]
    expect(getSeriesNavigation(posts, 'plain')).toBeNull()
  })

  it('같은 시리즈 글이 1개뿐이면 null을 반환한다', () => {
    const posts = [
      meta('a', '2026-01-01', '자료구조', 1),
      meta('x', '2026-01-02', '다른 시리즈', 1),
    ]
    expect(getSeriesNavigation(posts, 'a')).toBeNull()
  })

  it('목록에 없는 slug는 null을 반환한다', () => {
    const posts = [
      meta('a', '2026-01-01', '자료구조', 1),
      meta('b', '2026-01-02', '자료구조', 2),
    ]
    expect(getSeriesNavigation(posts, 'nope')).toBeNull()
  })

  it('시리즈명은 대소문자 정확 일치만 같은 그룹으로 본다', () => {
    const posts = [
      meta('a', '2026-01-01', 'React', 1),
      meta('b', '2026-01-02', 'react', 2),
    ]
    expect(getSeriesNavigation(posts, 'a')).toBeNull()
  })

  it('order 동점은 date 오름차순으로 위치를 매긴다', () => {
    const posts = [
      meta('newer', '2026-02-01', 'S', 1),
      meta('older', '2026-01-01', 'S', 1),
    ]
    const nav = getSeriesNavigation(posts, 'newer')
    expect(nav?.items.map(i => i.post.slug)).toEqual(['older', 'newer'])
    expect(nav?.currentPosition).toBe(2)
  })

  it('items.order는 정렬 순서대로 1부터 매겨진다', () => {
    const posts = [
      meta('c', '2026-01-03', 'S', 5),
      meta('a', '2026-01-01', 'S', 1),
      meta('b', '2026-01-02', 'S', 3),
    ]
    const nav = getSeriesNavigation(posts, 'a')
    expect(nav?.items.map(i => i.order)).toEqual([1, 2, 3])
  })
})
