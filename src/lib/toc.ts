import GithubSlugger from 'github-slugger'
import type { TocItem } from '@/types/post'

// 인라인 마크다운(굵게/기울임/코드/링크 등)을 평문으로 환원한다.
// rehype-slug는 헤딩의 텍스트 노드만으로 슬러그를 만들므로, 마크업 기호를 제거해
// 동일한 평문을 슬러그 입력으로 사용한다.
function flattenInline(text: string): string {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // 링크/이미지 → 라벨
    .replace(/`([^`]+)`/g, '$1') // 인라인 코드
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // 굵게
    .replace(/(\*|_)(.*?)\1/g, '$2') // 기울임
    .replace(/~~(.*?)~~/g, '$1') // 취소선
    .trim()
}

// raw MDX 본문에서 h2/h3 헤딩을 추출한다.
// 슬러그는 rehype-slug와 100% 일치해야 하므로(ADR-017), 단일 GithubSlugger
// 인스턴스를 헤딩 출현 순서대로 사용해 중복 접미사(-1, -2) 규칙을 동일하게 재현한다.
export function extractToc(rawMdxBody: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []

  let inFence = false
  let fenceMarker = ''

  for (const line of rawMdxBody.split(/\r?\n/)) {
    const fenceMatch = line.match(/^(\s*)(```+|~~~+)/)
    if (fenceMatch) {
      const marker = fenceMatch[2][0]
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      }
      else if (marker === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }
      continue
    }
    if (inFence) continue

    const headingMatch = line.match(/^(#{2,3})\s+(.*\S)\s*$/)
    if (!headingMatch) continue

    const depth = headingMatch[1].length as 2 | 3
    const text = flattenInline(headingMatch[2])
    if (text.length === 0) continue

    items.push({ id: slugger.slug(text), text, depth })
  }

  return items
}
