import type { NoteMeta } from '@/types/note'
import type { TagCount } from '@/types/tag'

// 대표 태그 — frontmatter tags 배열의 첫 번째 태그. 없으면 undefined.
export function getPrimaryTag(note: NoteMeta): string | undefined {
  return note.tags[0]
}

export function getNotesByTag(notes: NoteMeta[], tag: string): NoteMeta[] {
  return notes.filter(note => getPrimaryTag(note) === tag)
}

// 각 메모의 대표 태그만 집계 → 카운트 합 = (태그 있는) 메모 수, 겹침 없음.
// 개수 내림차순, 동일 개수는 가나다순(localeCompare)으로 정렬한다.
export function getNoteTagCounts(notes: NoteMeta[]): TagCount[] {
  const counts = new Map<string, number>()

  for (const note of notes) {
    const tag = getPrimaryTag(note)
    if (tag === undefined) continue
    counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }

  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  )
}
