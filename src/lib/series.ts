import fs from 'node:fs'
import path from 'node:path'
import type { PostMeta } from '@/types/post'
import type {
  SeriesBrowseItem,
  SeriesCategoryDetail,
  SeriesNavigation,
  SeriesPostItem,
  SeriesSummary,
} from '@/types/series-navigation'

const SERIES_DIR = path.join(process.cwd(), 'src/content/series')

// 시리즈명 → URL 슬러그: 소문자 + '/' → '-' + 공백 → '-'
export function toSeriesSlug(name: string): string {
  return name.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-')
}

interface SeriesFileMeta {
  thumbnail: string
  category: string
  categoryOrder: number
}

// series MDX(`src/content/series/{slug}.mdx`) frontmatter에서 메타를 경량 추출.
// 파일이나 필드가 없으면 기본값(빈 문자열 / categoryOrder는 +∞로 뒤로 정렬).
export function getSeriesMeta(slug: string): SeriesFileMeta {
  const empty: SeriesFileMeta = { thumbnail: '', category: '', categoryOrder: Number.POSITIVE_INFINITY }
  const filePath = path.join(SERIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return empty

  const source = fs.readFileSync(filePath, 'utf-8')
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!block) return empty

  const fm: Record<string, string> = {}
  for (const line of block[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }

  return {
    thumbnail: fm.thumbnail ?? '',
    category: fm.category ?? '',
    categoryOrder: fm.categoryOrder ? Number(fm.categoryOrder) : Number.POSITIVE_INFINITY,
  }
}

export function getSeriesThumbnail(slug: string): string {
  return getSeriesMeta(slug).thumbnail
}

// 시리즈별 집계. 2편 미만 시리즈는 제외하고 latestDate 내림차순(동점은 name 오름차순)으로 반환.
export function getSeriesSummaries(posts: PostMeta[]): SeriesSummary[] {
  const groups = new Map<string, PostMeta[]>()
  for (const post of posts) {
    if (typeof post.series !== 'string' || post.series === '') continue
    const group = groups.get(post.series)
    if (group) group.push(post)
    else groups.set(post.series, [post])
  }

  const summaries: SeriesSummary[] = []
  for (const [name, group] of groups) {
    if (group.length < 2) continue
    const latestDate = group.reduce(
      (latest, post) => (post.date.localeCompare(latest) > 0 ? post.date : latest),
      group[0].date,
    )
    const slug = toSeriesSlug(name)
    const meta = getSeriesMeta(slug)
    summaries.push({
      name,
      slug,
      count: group.length,
      latestDate,
      thumbnail: meta.thumbnail,
      category: meta.category,
      categoryOrder: meta.categoryOrder,
    })
  }

  return summaries.sort((a, b) => {
    const byDate = b.latestDate.localeCompare(a.latestDate)
    return byDate !== 0 ? byDate : a.name.localeCompare(b.name)
  })
}

// writing 페이지 카드 목록. category가 있는 시리즈는 카테고리 카드 하나로 합치고
// (최신 멤버 위치에 배치), category가 없는 시리즈는 그대로 카드가 된다.
export function getSeriesBrowseItems(posts: PostMeta[]): SeriesBrowseItem[] {
  const result: SeriesBrowseItem[] = []
  const categoryCard = new Map<string, SeriesBrowseItem>()

  for (const s of getSeriesSummaries(posts)) {
    if (!s.category) {
      result.push({ name: s.name, slug: s.slug, count: s.count, thumbnail: s.thumbnail })
      continue
    }

    const existing = categoryCard.get(s.category)
    if (existing) {
      existing.count += s.count
      if (!existing.thumbnail) existing.thumbnail = s.thumbnail
      continue
    }

    // getSeriesSummaries가 latestDate 내림차순이므로, 카테고리 카드는 최신 멤버 위치에 들어간다
    const card: SeriesBrowseItem = {
      name: s.category,
      slug: toSeriesSlug(s.category),
      count: s.count,
      thumbnail: s.thumbnail,
    }
    categoryCard.set(s.category, card)
    result.push(card)
  }

  return result
}

// 카테고리 상세: 소속 시리즈를 categoryOrder 오름차순으로 subtitle 섹션화하고,
// 각 섹션 안의 글은 sortSeriesPosts로 정렬한다. 해당 슬러그의 카테고리가 없으면 null.
export function getSeriesCategory(slug: string, posts: PostMeta[]): SeriesCategoryDetail | null {
  const members = getSeriesSummaries(posts).filter(
    s => s.category !== '' && toSeriesSlug(s.category) === slug,
  )
  if (members.length === 0) return null

  const ordered = [...members].sort(
    (a, b) => a.categoryOrder - b.categoryOrder || a.name.localeCompare(b.name),
  )

  const sections = ordered.map(s => ({
    name: s.name,
    slug: s.slug,
    posts: sortSeriesPosts(posts.filter(p => p.series === s.name)),
  }))

  return {
    name: members[0].category,
    slug,
    count: sections.reduce((sum, section) => sum + section.posts.length, 0),
    sections,
  }
}

// seriesOrder 오름차순 → date 오름차순 tie-break.
// seriesOrder 미존재(undefined)는 가장 뒤로 보내되 date로 정렬되게 한다.
export function sortSeriesPosts(posts: PostMeta[]): PostMeta[] {
  return [...posts].sort((a, b) => {
    const orderA = a.seriesOrder ?? Number.POSITIVE_INFINITY
    const orderB = b.seriesOrder ?? Number.POSITIVE_INFINITY
    if (orderA !== orderB) return orderA - orderB
    return a.date.localeCompare(b.date)
  })
}

// 현재 글과 같은 시리즈(대소문자 정확 일치) 글을 그룹핑·정렬해 네비게이션 정보를 만든다.
// 시리즈 미소속 / 같은 시리즈 글이 1개뿐이면 null.
export function getSeriesNavigation(
  posts: PostMeta[],
  slug: string,
): SeriesNavigation | null {
  const current = posts.find(post => post.slug === slug)
  if (!current) return null

  const seriesName = current.series
  if (typeof seriesName !== 'string' || seriesName === '') return null

  const grouped = posts.filter(post => post.series === seriesName)
  if (grouped.length < 2) return null

  const sorted = sortSeriesPosts(grouped)

  const items: SeriesPostItem[] = sorted.map((post, index) => ({
    post,
    order: index + 1,
    isCurrent: post.slug === slug,
  }))

  const currentItem = items.find(item => item.isCurrent)

  return {
    name: seriesName,
    total: items.length,
    currentPosition: currentItem?.order ?? 0,
    items,
  }
}
