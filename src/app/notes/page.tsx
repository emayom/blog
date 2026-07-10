import type { Metadata } from 'next'
import { getAllNotes } from '@/lib/notes'
import { buildMetadata } from '@/lib/seo'
import { NotesGrid } from '@/components/notes/notes-grid'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'

export const metadata: Metadata = buildMetadata({
  title: '메모',
  description: '한 줄 단상과 인용, 코드 스니펫 조각',
  path: '/notes',
})

export default function NotesPage() {
  const notes = getAllNotes()
  const pinned = notes.filter(n => n.pinned)
  const rest = notes.filter(n => !n.pinned)

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Heading as="h1" size="md" className="mb-7">메모</Heading>

      {notes.length === 0
        ? (
            <EmptyState variant="empty" title="아직 남긴 메모가 없어요" />
          )
        : (
            <div className="flex flex-col gap-7">
              {pinned.length > 0 && (
                <section className="flex flex-col gap-7">
                  <Heading size="sm">고정된 메모</Heading>
                  <NotesGrid notes={pinned} />
                </section>
              )}
              <section className="flex flex-col gap-7">
                {pinned.length > 0 && <Heading size="sm">모든 메모</Heading>}
                <NotesGrid notes={rest} />
              </section>
            </div>
          )}
    </main>
  )
}
