'use client'

import type { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { NotesTagFilter } from '@/components/notes/notes-tag-filter'
import { getPrimaryTag } from '@/lib/note-tags'
import { EmptyState } from '@/components/ui/empty-state'
import type { NoteMeta } from '@/types/note'
import type { TagCount } from '@/types/tag'

export interface NoteCardEntry {
  note: NoteMeta
  card: ReactNode
}

interface NotesViewProps {
  entries: NoteCardEntry[]
  tags: TagCount[]
  total: number
}

function NotesGridFromEntries({ entries }: { entries: NoteCardEntry[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {entries.map(({ note, card }) => (
        <div key={note.slug}>{card}</div>
      ))}
    </div>
  )
}

function matchesTag(entry: NoteCardEntry, activeTag: string | null): boolean {
  return !activeTag || getPrimaryTag(entry.note) === activeTag
}

export function NotesView({ entries, tags, total }: NotesViewProps) {
  const activeTag = useSearchParams().get('tag')

  const visible = entries.filter(entry => matchesTag(entry, activeTag))
  const isEmpty = visible.length === 0

  return (
    <>
      <NotesTagFilter tags={tags} total={total} activeTag={activeTag ?? undefined} />

      {isEmpty
        ? (
            <EmptyState
              variant="empty"
              title={`'${activeTag}' 메모가 없어요`}
              action={{ label: '전체 메모 보기', href: '/notes' }}
            />
          )
        : (
            <NotesGridFromEntries entries={visible} />
          )}
    </>
  )
}
