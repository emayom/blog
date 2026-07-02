import type { LibraryItemMeta } from '@/types/library'

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
