import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllNotes } from '@/lib/notes'
import { getNoteTagCounts } from '@/lib/note-tags'
import { buildMetadata } from '@/lib/seo'
import { NoteCard } from '@/components/notes/note-card'
import { NotesView, type NoteCardEntry } from '@/components/notes/notes-view'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'

export const metadata: Metadata = buildMetadata({
  title: '메모',
  description: '한 줄 단상과 인용, 코드 스니펫 조각',
  path: '/notes',
})

export default function NotesPage() {
  const notes = getAllNotes()
  // 고정 메모를 최상단으로 — 각 그룹은 getAllNotes의 최신순을 유지한다.
  const ordered = [...notes.filter(n => n.pinned), ...notes.filter(n => !n.pinned)]
  const entries: NoteCardEntry[] = ordered.map(note => ({ note, card: <NoteCard note={note} /> }))

  const tags = getNoteTagCounts(notes)

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Heading as="h1" size="md" className="mb-7">메모</Heading>

      {notes.length === 0
        ? (
            <EmptyState variant="empty" title="아직 남긴 메모가 없어요" />
          )
        : (
            <Suspense>
              <NotesView entries={entries} tags={tags} total={notes.length} />
            </Suspense>
          )}
    </main>
  )
}
