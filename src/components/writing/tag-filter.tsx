import { Tag } from '@/components/ui/tag'
import type { TagCount } from '@/types/tag'

interface TagFilterProps {
  tags: TagCount[]
  total: number
}

export function TagFilter({ tags, total }: TagFilterProps) {
  return (
    <nav aria-label="주제 필터" className="flex flex-wrap gap-2">
      <Tag href="/writing" label="전체" count={total} variant="outline" size="md" />

      {tags.map(({ tag, count }) => (
        <Tag key={tag} href={`/tag/${tag}`} label={tag} count={count} variant="outline" size="md" />
      ))}
    </nav>
  )
}
