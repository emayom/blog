import { describe, expect, it } from 'vitest'
import { extractToc } from '@/lib/toc'

describe('extractToc', () => {
  it('h2/h3를 depth와 함께 추출한다', () => {
    const body = `## 섹션 A

본문

### 하위 1

## 섹션 B`
    expect(extractToc(body)).toEqual([
      { id: '섹션-a', text: '섹션 A', depth: 2 },
      { id: '하위-1', text: '하위 1', depth: 3 },
      { id: '섹션-b', text: '섹션 B', depth: 2 },
    ])
  })

  it('h1/h4는 제외한다', () => {
    const body = `# 제목

## 본문 섹션

#### 너무 깊은 헤딩`
    expect(extractToc(body)).toEqual([
      { id: '본문-섹션', text: '본문 섹션', depth: 2 },
    ])
  })

  it('한글 헤딩을 슬러그화한다', () => {
    const body = '## 한글 제목'
    expect(extractToc(body)[0]).toEqual({ id: '한글-제목', text: '한글 제목', depth: 2 })
  })

  it('중복 헤딩에 접미사를 붙인다', () => {
    const body = `## Hello World

## Hello World`
    expect(extractToc(body).map(i => i.id)).toEqual(['hello-world', 'hello-world-1'])
  })

  it('코드펜스 안의 # 라인은 헤딩으로 보지 않는다', () => {
    const body = `## 실제 헤딩

\`\`\`md
## 코드 안 헤딩
\`\`\`

## 진짜 헤딩`
    expect(extractToc(body).map(i => i.text)).toEqual(['실제 헤딩', '진짜 헤딩'])
  })

  it('~~~ 펜스도 처리한다', () => {
    const body = `## 헤딩

~~~
## 펜스 내부
~~~`
    expect(extractToc(body).map(i => i.text)).toEqual(['헤딩'])
  })

  it('인라인 마크다운을 평문화한 텍스트와 슬러그를 만든다', () => {
    const body = '## **굵은** `코드` 와 [링크](https://example.com)'
    expect(extractToc(body)[0]).toEqual({
      id: '굵은-코드-와-링크',
      text: '굵은 코드 와 링크',
      depth: 2,
    })
  })

  it('헤딩이 없으면 빈 배열을 반환한다', () => {
    expect(extractToc('그냥 본문\n\n문단만 있음')).toEqual([])
  })

  it('빈 문자열에 빈 배열을 반환한다', () => {
    expect(extractToc('')).toEqual([])
  })

  // ADR-017 핵심: toc 슬러그가 rehype-slug 출력과 100% 일치해야 한다.
  it('rehype-slug가 부여하는 헤딩 id와 일치한다', async () => {
    const { unified } = await import('unified')
    const remarkParse = (await import('remark-parse')).default
    const remarkRehype = (await import('remark-rehype')).default
    const rehypeSlug = (await import('rehype-slug')).default
    const { visit } = await import('unist-util-visit')

    const body = `## 한글 제목

### Hello World

## Hello World

## **굵은** 텍스트`

    const tree = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSlug)
      .runSync(unified().use(remarkParse).parse(body))

    const rehypeIds: string[] = []
    visit(tree, 'element', (node: { tagName?: string, properties?: { id?: string } }) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        rehypeIds.push(node.properties?.id ?? '')
      }
    })

    expect(extractToc(body).map(i => i.id)).toEqual(rehypeIds)
  })
})
