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
