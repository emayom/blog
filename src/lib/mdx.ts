import fs from 'node:fs'
import path from 'node:path'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { Post, PostFrontmatter, PostMeta } from '@/types/post'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { rehypePlugins } from '@/lib/mdx-options'
import { getReadingTime } from '@/lib/reading-time'
import { extractToc } from '@/lib/toc'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/writing')

const isDev = process.env.NODE_ENV !== 'production'

// dev에서는 draft 포함, prod에서는 draft 제외
function isVisible(draft: boolean): boolean {
  return isDev || !draft
}

// _ prefix 파일은 픽스처/임시 글로 간주하여 슬러그에서 제외
export function getAllSlugs(): string[] {
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

function normalizeFrontmatter(input: Record<string, unknown> | PostFrontmatter): PostFrontmatter {
  const raw = input as Record<string, unknown>
  return {
    title: typeof raw.title === 'string' ? raw.title : '',
    date: typeof raw.date === 'string' ? raw.date : '',
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t): t is string => typeof t === 'string') : [],
    draft: raw.draft === true,
    description: typeof raw.description === 'string' ? raw.description : '',
    thumbnail: typeof raw.thumbnail === 'string' ? raw.thumbnail : '',
  }
}

// frontmatter 블록을 제거한 raw 본문 (읽기 시간 추정용 — 컴파일 없이 길이만 측정)
function stripFrontmatter(source: string): string {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
}

// frontmatter 블록만 파싱 (목록 빌드 시 본문 컴파일 비용을 피하기 위한 경량 파서)
function parseFrontmatterBlock(source: string): Record<string, unknown> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}

  const result: Record<string, unknown> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const fieldMatch = line.match(/^(\w+):\s*(.*)$/)
    if (!fieldMatch) continue

    const key = fieldMatch[1]
    const rawValue = fieldMatch[2].trim()

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      result[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    }
    else if (rawValue === 'true' || rawValue === 'false') {
      result[key] = rawValue === 'true'
    }
    else {
      result[key] = rawValue.replace(/^["']|["']$/g, '')
    }
  }

  return result
}

// 발행 가능한 글의 메타데이터만 날짜 내림차순으로 반환
export function getPostMetaList(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const source = readSource(slug)
      if (source === null) return null
      const frontmatter = normalizeFrontmatter(parseFrontmatterBlock(source))
      const readingTime = getReadingTime(stripFrontmatter(source))
      return { ...frontmatter, slug, readingTime } satisfies PostMeta
    })
    .filter((meta): meta is PostMeta => meta !== null && isVisible(meta.draft))
    .sort((a, b) => b.date.localeCompare(a.date))
}

// prod에서 draft 글 접근 시 null 반환 (정적 페이지 미생성과 일관)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const source = readSource(slug)
  if (source === null) return null

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins },
    },
  })

  const meta = normalizeFrontmatter(frontmatter)
  if (!isVisible(meta.draft)) return null

  const body = stripFrontmatter(source)
  const readingTime = getReadingTime(body)
  const toc = extractToc(body)
  return { ...meta, slug, readingTime, content, toc }
}
