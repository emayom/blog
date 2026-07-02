import fs from 'node:fs'
import path from 'node:path'
import { parseFrontmatterBlock } from '@/lib/mdx'
import type { LibraryItemFrontmatter, LibraryItemMeta, LibraryType } from '@/types/library'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/library')

const isDev = process.env.NODE_ENV !== 'production'

function isVisible(draft: boolean): boolean {
  return isDev || !draft
}

function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  return fs
    .readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.mdx') && !file.startsWith('_'))
    .map(file => file.replace(/\.mdx$/, ''))
}

function readSource(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

function normalizeFrontmatter(raw: Record<string, unknown>): LibraryItemFrontmatter {
  return {
    title: typeof raw.title === 'string' ? raw.title : '',
    type: raw.type === 'anime' ? 'anime' : 'book',
    date: typeof raw.date === 'string' && raw.date !== '' ? raw.date : undefined,
    rating: typeof raw.rating === 'number' && Number.isFinite(raw.rating) ? raw.rating : undefined,
    cover: typeof raw.cover === 'string' && raw.cover !== '' ? raw.cover : undefined,
    author: typeof raw.author === 'string' && raw.author !== '' ? raw.author : undefined,
    genres: Array.isArray(raw.genres)
      ? raw.genres.filter((g): g is string => typeof g === 'string')
      : undefined,
    status: typeof raw.status === 'string' && raw.status !== '' ? raw.status : undefined,
    // id는 항상 string으로 흡수 — ISBN이 number로 파싱돼도 정밀도 손실 방지
    id: raw.id != null ? String(raw.id) : undefined,
    series: typeof raw.series === 'string' && raw.series !== '' ? raw.series : undefined,
    width: typeof raw.width === 'number' ? raw.width : undefined,
    height: typeof raw.height === 'number' ? raw.height : undefined,
    featured: raw.featured === true,
    draft: raw.draft === true,
  }
}

export function getAllLibraryItems(): LibraryItemMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const source = readSource(slug)
      if (source === null) return null
      const frontmatter = normalizeFrontmatter(parseFrontmatterBlock(source))
      return { ...frontmatter, slug } satisfies LibraryItemMeta
    })
    .filter((meta): meta is LibraryItemMeta => meta !== null && isVisible(meta.draft))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

export function getLibraryItemsByType(type: LibraryType): LibraryItemMeta[] {
  return getAllLibraryItems().filter(item => item.type === type)
}

// 같은 series 항목을 가장 최신 항목(대표) 하나로 collapse. seriesCount에 총 편수 기록.
export function collapseBySeries(items: LibraryItemMeta[]): LibraryItemMeta[] {
  const seriesMap = new Map<string, LibraryItemMeta[]>()
  const result: LibraryItemMeta[] = []

  for (const item of items) {
    if (!item.series) {
      result.push(item)
      continue
    }
    const group = seriesMap.get(item.series) ?? []
    group.push(item)
    seriesMap.set(item.series, group)
  }

  for (const group of seriesMap.values()) {
    const byDateDesc = [...group].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    const byDateAsc = [...group].sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))
    result.push({ ...byDateDesc[0], seriesCount: group.length, seriesItems: byDateAsc })
  }

  return result.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

// date 앞 4자리를 연도로, 없으면 '' 그룹. 연도 내림차순, '' 그룹은 맨 뒤.
export function groupByYear(items: LibraryItemMeta[]): [string, LibraryItemMeta[]][] {
  const groups: Record<string, LibraryItemMeta[]> = {}
  for (const item of items) {
    const year = item.date?.slice(0, 4) ?? ''
    ;(groups[year] ??= []).push(item)
  }
  return Object.entries(groups).sort(([a], [b]) => {
    if (a === '') return 1
    if (b === '') return -1
    return b.localeCompare(a)
  })
}
