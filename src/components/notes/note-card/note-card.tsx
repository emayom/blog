import type { ReactNode } from 'react'
import { MdxContent } from '@/components/mdx/mdx-content'
import { PinIcon } from '@/components/icons'
import { Tag } from '@/components/ui/tag'
import { Text } from '@/components/ui/text'
import { formatNoteDate } from '@/lib/format-date'
import { getNoteBody } from '@/lib/notes'
import type { NoteMeta } from '@/types/note'

// 프레젠테이션 셸 — 본문 노드를 주입받아 sync로 렌더(유닛 테스트 대상)
export function NoteCardShell({ note, children }: { note: NoteMeta, children: ReactNode }) {
  return (
    <article className="break-inside-avoid mb-4 rounded-md border border-hairline bg-canvas p-lg">
      {note.pinned && (
        <div className="mb-2 flex items-center gap-1 text-fg-subtle">
          <PinIcon />
          <Text as="span" variant="label-sm">고정</Text>
        </div>
      )}
      <div className="min-w-0 max-h-80 overflow-y-auto break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>

      <div className="mt-md flex items-center gap-2">
        {note.tags[0] !== undefined && (
          <Tag href={`/notes?tag=${encodeURIComponent(note.tags[0])}`} variant="soft" size="sm" label={note.tags[0]} />
        )}
        <Text as="span" variant="label-sm" className="text-fg-subtle ml-auto">
          {formatNoteDate(note.date)}
        </Text>
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
