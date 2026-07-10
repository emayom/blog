import { NoteCard } from '@/components/notes/note-card'
import type { NoteMeta } from '@/types/note'

export function NotesGrid({ notes }: { notes: NoteMeta[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {notes.map(note => (
        <NoteCard key={note.slug} note={note} />
      ))}
    </div>
  )
}
