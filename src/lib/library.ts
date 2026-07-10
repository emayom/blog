import fs from 'node:fs'
import path from 'node:path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { parseFrontmatterBlock } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { rehypePlugins, remarkPlugins } from '@/lib/mdx-options'
import type { LibraryItem, LibraryItemFrontmatter, LibraryItemMeta, LibraryType } from '@/types/library'

export { collapseBySeries, groupByYear } from '@/lib/library-group'

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

// prod에서 draft 항목 접근 시 null 반환 (generateStaticParams 미생성과 일관)
export async function getLibraryItem(slug: string): Promise<LibraryItem | null> {
  const source = readSource(slug)
  if (source === null) return null

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins, rehypePlugins },
    },
  })

  const meta = { ...normalizeFrontmatter(parseFrontmatterBlock(source)), slug } satisfies LibraryItemMeta
  if (!isVisible(meta.draft)) return null

  return { ...meta, content }
}

/* frontmatter 블록을 제거한 본문 텍스트. 본문 없으면 빈 문자열. */
export function getLibraryBody(slug: string): string {
  const source = readSource(slug)
  if (source === null) return ''
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
}
