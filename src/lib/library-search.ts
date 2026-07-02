import Fuse from 'fuse.js'
import type { LibraryItemMeta } from '@/types/library'

const FUSE_OPTIONS = {
  keys: ['title'],
  threshold: 0.4,
  minMatchCharLength: 2,
}

export function filterLibraryItemsByTitle(
  items: LibraryItemMeta[],
  query: string,
): LibraryItemMeta[] {
  const trimmed = query.trim()
  if (!trimmed) return items
  return new Fuse(items, FUSE_OPTIONS).search(trimmed).map(r => r.item)
}
