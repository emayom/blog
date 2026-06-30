import { describe, expect, it } from 'vitest'
import { getSeriesBrowseItems, getSeriesCategory, getSeriesNavigation, getSeriesSummaries, getSeriesThumbnail, sortSeriesPosts, toSeriesSlug } from '@/lib/series'
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
    featured: false,
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

describe('toSeriesSlug', () => {
  it('소문자로 변환한다', () => {
    expect(toSeriesSlug('Greedy')).toBe('greedy')
  })

  it('슬래시를 하이픈으로 바꾼다', () => {
    expect(toSeriesSlug('DFS/BFS')).toBe('dfs-bfs')
  })

  it('공백을 하이픈으로 바꾼다', () => {
    expect(toSeriesSlug('Shortest Path')).toBe('shortest-path')
  })

  it('한글 시리즈명의 공백만 하이픈으로 바꾼다', () => {
    expect(toSeriesSlug('자바스크립트로 구현하는 자료구조')).toBe('자바스크립트로-구현하는-자료구조')
  })
})

describe('getSeriesSummaries', () => {
  it('2편 미만 시리즈는 제외한다', () => {
    const posts = [
      meta('a', '2026-01-01', 'Greedy', 1),
      meta('b', '2026-01-02', 'Greedy', 2),
      meta('solo', '2026-01-03', 'DP', 1),
    ]
    const summaries = getSeriesSummaries(posts)
    expect(summaries.map(s => s.name)).toEqual(['Greedy'])
  })

  it('count·slug·latestDate를 정확히 집계한다', () => {
    const posts = [
      meta('a', '2026-01-01', 'DFS/BFS', 1),
      meta('b', '2026-03-10', 'DFS/BFS', 2),
      meta('c', '2026-02-05', 'DFS/BFS', 3),
    ]
    const summaries = getSeriesSummaries(posts)
    expect(summaries).toHaveLength(1)
    expect(summaries[0].name).toBe('DFS/BFS')
    expect(summaries[0].slug).toBe('dfs-bfs')
    expect(summaries[0].count).toBe(3)
    expect(summaries[0].latestDate).toBe('2026-03-10')
  })

  it('series MDX가 없는 슬러그의 thumbnail은 빈 문자열이다', () => {
    const posts = [
      meta('a', '2026-01-01', '존재하지 않는 시리즈', 1),
      meta('b', '2026-03-10', '존재하지 않는 시리즈', 2),
    ]
    expect(getSeriesSummaries(posts)[0].thumbnail).toBe('')
  })

  it('latestDate 내림차순으로 정렬한다', () => {
    const posts = [
      meta('a1', '2026-01-01', 'A', 1),
      meta('a2', '2026-01-05', 'A', 2),
      meta('b1', '2026-02-01', 'B', 1),
      meta('b2', '2026-03-01', 'B', 2),
    ]
    const summaries = getSeriesSummaries(posts)
    expect(summaries.map(s => s.name)).toEqual(['B', 'A'])
  })

  it('latestDate 동점은 name 오름차순으로 정렬한다', () => {
    const posts = [
      meta('z1', '2026-01-01', 'Zebra', 1),
      meta('z2', '2026-05-01', 'Zebra', 2),
      meta('a1', '2026-02-01', 'Apple', 1),
      meta('a2', '2026-05-01', 'Apple', 2),
    ]
    const summaries = getSeriesSummaries(posts)
    expect(summaries.map(s => s.name)).toEqual(['Apple', 'Zebra'])
  })

  it('series 없는 글은 무시한다', () => {
    const posts = [
      meta('a', '2026-01-01', 'Greedy', 1),
      meta('b', '2026-01-02', 'Greedy', 2),
      meta('plain1', '2026-01-03'),
      meta('plain2', '2026-01-04'),
    ]
    const summaries = getSeriesSummaries(posts)
    expect(summaries).toHaveLength(1)
    expect(summaries[0].name).toBe('Greedy')
  })

  it('빈 배열은 빈 결과를 반환한다', () => {
    expect(getSeriesSummaries([])).toEqual([])
  })
})

describe('getSeriesThumbnail', () => {
  it('series MDX frontmatter의 thumbnail을 읽는다', () => {
    expect(getSeriesThumbnail('자바스크립트로-구현하는-자료구조')).toBe(
      '/images/series/js-data-structure.png',
    )
  })

  it('파일이 없으면 빈 문자열을 반환한다', () => {
    expect(getSeriesThumbnail('does-not-exist')).toBe('')
  })
})

// category 값은 실제 series MDX frontmatter에서 읽는다 (DFS/BFS·DP·정렬 알고리즘 → "Problem Solving")
describe('getSeriesBrowseItems', () => {
  it('같은 category 시리즈는 하나의 카드로 합치고 count를 합산한다', () => {
    const posts = [
      meta('a', '2026-01-01', 'DFS/BFS', 1),
      meta('b', '2026-01-02', 'DFS/BFS', 2),
      meta('c', '2026-02-01', 'DP', 1),
      meta('d', '2026-02-02', 'DP', 2),
      meta('e', '2026-03-01', 'SQLD', 1),
      meta('f', '2026-03-02', 'SQLD', 2),
    ]
    const items = getSeriesBrowseItems(posts)
    expect(items).toHaveLength(2)

    const category = items.find(i => i.name === 'Problem Solving')
    expect(category?.slug).toBe('problem-solving')
    expect(category?.count).toBe(4)
    expect(items.find(i => i.name === 'SQLD')?.count).toBe(2)
  })
})

describe('getSeriesCategory', () => {
  it('멤버를 categoryOrder 순 subtitle 섹션으로 반환한다', () => {
    const posts = [
      meta('a', '2026-01-01', 'DP', 1),
      meta('b', '2026-01-02', 'DP', 2),
      meta('c', '2026-02-01', '정렬 알고리즘', 1),
      meta('d', '2026-02-02', '정렬 알고리즘', 2),
    ]
    const category = getSeriesCategory('problem-solving', posts)
    expect(category?.name).toBe('Problem Solving')
    expect(category?.count).toBe(4)
    // 정렬 알고리즘(categoryOrder 1)이 DP(6)보다 앞
    expect(category?.sections.map(s => s.name)).toEqual(['정렬 알고리즘', 'DP'])
  })

  it('카테고리가 아닌 슬러그는 null', () => {
    const posts = [
      meta('a', '2026-01-01', 'SQLD', 1),
      meta('b', '2026-01-02', 'SQLD', 2),
    ]
    expect(getSeriesCategory('sqld', posts)).toBeNull()
  })
})
