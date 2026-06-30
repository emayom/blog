import type { ReactNode } from 'react'

interface FileTreeProps { children: ReactNode }
interface FolderProps { name: string, defaultOpen?: boolean, children?: ReactNode }
interface FileItemProps { name: string, comment?: string }

function FolderIcon() {
  return (
    <svg className="size-4 shrink-0 text-ink-muted-48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}
function FileIcon() {
  return (
    <svg className="size-4 shrink-0 text-ink-muted-48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

function Folder({ name, defaultOpen = false, children }: FolderProps) {
  return (
    <li>
      <details open={defaultOpen}>
        <summary className="flex cursor-pointer select-none list-none items-center gap-1.5 font-mono text-sm text-ink dark:text-body-on-dark [&::-webkit-details-marker]:hidden">
          <svg
            className="details-chevron size-3 shrink-0 text-ink-muted-48"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <FolderIcon />
          {name}
        </summary>
        {children && (
          <ul className="ml-[7px] mt-1 space-y-1 border-l border-hairline pl-4 dark:border-ink-muted-80">
            {children}
          </ul>
        )}
      </details>
    </li>
  )
}

function FileItem({ name, comment }: FileItemProps) {
  return (
    <li className="flex items-center gap-1.5 font-mono text-sm text-ink-muted-80 dark:text-body-muted">
      <FileIcon />
      {name}
      {comment && (
        <span className="text-ink-muted-48 dark:text-body-muted">{comment}</span>
      )}
    </li>
  )
}

function FileTreeRoot({ children }: FileTreeProps) {
  return (
    <div className="my-lg rounded-lg bg-canvas-parchment p-4 dark:bg-surface-tile-3">
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

export const FileTree = Object.assign(FileTreeRoot, {
  Folder,
  File: FileItem,
})
