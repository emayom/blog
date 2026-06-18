import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const files: Record<string, string> = {}

function setFiles(map: Record<string, string>) {
  for (const key of Object.keys(files)) delete files[key]
  Object.assign(files, map)
}

vi.mock('node:fs', () => ({
  default: {
    existsSync: (p: string) =>
      p.endsWith('writing') || Object.keys(files).some(name => p.endsWith(name)),
    readdirSync: () => Object.keys(files),
    readFileSync: (p: string) => {
      const name = Object.keys(files).find(file => p.endsWith(file))
      if (!name) throw new Error(`no such file: ${p}`)
      return files[name]
    },
  },
}))

function frontmatter(opts: {
  title?: string
  date: string
  tags?: string
  draft?: boolean
  body?: string
}) {
  return `---
title: "${opts.title ?? 'Title'}"
date: "${opts.date}"
tags: [${opts.tags ?? '"a"'}]
draft: ${opts.draft ?? false}
description: "desc"
thumbnail: ""
---

${opts.body ?? '본문'}
`
}

async function loadMdx() {
  vi.resetModules()
  return import('@/lib/mdx')
}

beforeEach(() => {
  setFiles({})
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('getAllSlugs', () => {
  it('.mdx 파일만 반환하고 _ prefix와 비-mdx는 제외한다', async () => {
    setFiles({
      'a.mdx': frontmatter({ date: '2026-01-01' }),
      '_draft.mdx': frontmatter({ date: '2026-01-01', draft: true }),
      'readme.md': 'noop',
    })
    const { getAllSlugs } = await loadMdx()
    expect(getAllSlugs()).toEqual(['a'])
  })

  it('빈 디렉토리에서 빈 배열을 반환한다', async () => {
    setFiles({})
    const { getAllSlugs } = await loadMdx()
    expect(getAllSlugs()).toEqual([])
  })
})

describe('getPostMetaList — 정렬 및 정규화', () => {
  it('날짜 내림차순으로 정렬한다', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    setFiles({
      'old.mdx': frontmatter({ date: '2025-01-01' }),
      'new.mdx': frontmatter({ date: '2026-06-01' }),
      'mid.mdx': frontmatter({ date: '2025-12-31' }),
    })
    const { getPostMetaList } = await loadMdx()
    expect(getPostMetaList().map(p => p.slug)).toEqual(['new', 'mid', 'old'])
  })

  it('tags 배열과 boolean draft를 정규화한다', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    setFiles({
      'a.mdx': frontmatter({ date: '2026-01-01', tags: '"Next.js", "MDX"' }),
    })
    const { getPostMetaList } = await loadMdx()
    const [meta] = getPostMetaList()
    expect(meta.tags).toEqual(['Next.js', 'MDX'])
    expect(meta.draft).toBe(false)
  })
})

describe('getPostMetaList — draft 필터', () => {
  it('prod에서 draft 글을 제외한다', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    setFiles({
      'pub.mdx': frontmatter({ date: '2026-01-02' }),
      'draft.mdx': frontmatter({ date: '2026-01-01', draft: true }),
    })
    const { getPostMetaList } = await loadMdx()
    expect(getPostMetaList().map(p => p.slug)).toEqual(['pub'])
  })

  it('dev에서 draft 글을 포함한다', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    setFiles({
      'pub.mdx': frontmatter({ date: '2026-01-02' }),
      'draft.mdx': frontmatter({ date: '2026-01-01', draft: true }),
    })
    const { getPostMetaList } = await loadMdx()
    expect(getPostMetaList().map(p => p.slug).sort()).toEqual(['draft', 'pub'])
  })
})

describe('getPostBySlug', () => {
  it('존재하지 않는 slug에 null을 반환한다', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    setFiles({ 'a.mdx': frontmatter({ date: '2026-01-01' }) })
    const { getPostBySlug } = await loadMdx()
    expect(await getPostBySlug('nope')).toBeNull()
  })

  it('prod에서 draft slug에 null을 반환한다', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    setFiles({ 'draft.mdx': frontmatter({ date: '2026-01-01', draft: true }) })
    const { getPostBySlug } = await loadMdx()
    expect(await getPostBySlug('draft')).toBeNull()
  })

  it('발행된 글의 메타와 content를 반환한다', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    setFiles({ 'pub.mdx': frontmatter({ title: '발행글', date: '2026-01-01' }) })
    const { getPostBySlug } = await loadMdx()
    const post = await getPostBySlug('pub')
    expect(post).not.toBeNull()
    expect(post?.title).toBe('발행글')
    expect(post?.slug).toBe('pub')
    expect(post?.content).toBeDefined()
  })

  it('본문 헤딩에서 toc를 추출한다', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    setFiles({
      'pub.mdx': frontmatter({
        date: '2026-01-01',
        body: '## 첫 섹션\n\n본문\n\n### 하위\n\n## 둘째 섹션',
      }),
    })
    const { getPostBySlug } = await loadMdx()
    const post = await getPostBySlug('pub')
    expect(post?.toc).toEqual([
      { id: '첫-섹션', text: '첫 섹션', depth: 2 },
      { id: '하위', text: '하위', depth: 3 },
      { id: '둘째-섹션', text: '둘째 섹션', depth: 2 },
    ])
  })
})
