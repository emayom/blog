import type { ReactNode } from 'react'
import { MdxContent } from '@/components/mdx/mdx-content'
import { Tag } from '@/components/writing/tag'
import { getNoteBody } from '@/lib/notes'
import type { NoteMeta } from '@/types/note'

function shortDate(date: string): string {
  const parts = date.split('-')
  if (parts.length < 3) return date
  return `${parts[1]}.${parts[2]}`
}

// 프레젠테이션 셸 — 본문 노드를 주입받아 sync로 렌더(유닛 테스트 대상)
export function NoteCardShell({ note, children }: { note: NoteMeta, children: ReactNode }) {
  return (
    <article className="break-inside-avoid mb-4 rounded-lg border border-hairline bg-canvas p-lg dark:border-ink-muted-80 dark:bg-surface-tile-2">
      <div className="min-w-0 max-h-80 overflow-y-auto break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>

      <div className="mt-md flex items-center gap-2">
        {note.tags.map(tag => (
          <Tag key={tag} as="span" variant="soft" size="sm" label={tag} />
        ))}
        <span className="text-xs tracking-[-0.12px] text-ink-muted-48 dark:text-body-muted ml-auto">
          {shortDate(note.date)}
        </span>
      </div>
    </article>
  )
}

export async function NoteCard({ note }: { note: NoteMeta }) {
  const body = getNoteBody(note.slug)
  return (
    <NoteCardShell note={note}>
      <MdxContent source={body} />
    </NoteCardShell>
  )
}
