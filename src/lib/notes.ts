import fs from 'node:fs'
import path from 'node:path'
import { parseFrontmatterBlock } from '@/lib/mdx'
import type { NoteFrontmatter, NoteMeta } from '@/types/note'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/notes')

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

function normalizeFrontmatter(raw: Record<string, unknown>): NoteFrontmatter {
  return {
    date: typeof raw.date === 'string' ? raw.date : '',
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t): t is string => typeof t === 'string') : [],
    pinned: raw.pinned === true,
    draft: raw.draft === true,
  }
}

export function getAllNotes(): NoteMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const source = readSource(slug)
      if (source === null) return null
      const frontmatter = normalizeFrontmatter(parseFrontmatterBlock(source))
      return { ...frontmatter, slug } satisfies NoteMeta
    })
    .filter((meta): meta is NoteMeta => meta !== null && isVisible(meta.draft))
    .sort((a, b) => b.date.localeCompare(a.date))
}

/* frontmatter 블록을 제거한 본문 텍스트. 본문 없으면 빈 문자열. */
export function getNoteBody(slug: string): string {
  const source = readSource(slug)
  if (source === null) return ''
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
}
