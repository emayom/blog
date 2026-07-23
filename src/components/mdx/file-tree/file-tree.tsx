import type { ReactNode } from 'react'
import { FileIcon, FolderIcon } from '@/components/icons'

interface FileTreeProps { children: ReactNode }
interface FolderProps { name: string, defaultOpen?: boolean, children?: ReactNode }
interface FileItemProps { name: string, comment?: string }

function Folder({ name, defaultOpen = false, children }: FolderProps) {
  return (
    <li>
      <details open={defaultOpen}>
        <summary className="flex cursor-pointer select-none list-none items-center gap-1.5 font-mono text-label-md text-fg [&::-webkit-details-marker]:hidden">
          <svg
            className="details-chevron size-3 shrink-0 text-fg-subtle"
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
          <FolderIcon className="size-4 shrink-0 text-fg-subtle" />
          {name}
        </summary>
        {children && (
          <ul className="ml-[7px] mt-1 space-y-1 border-l border-hairline pl-4">
            {children}
          </ul>
        )}
      </details>
    </li>
  )
}

function FileItem({ name, comment }: FileItemProps) {
  return (
    <li className="flex items-center gap-1.5 font-mono text-label-md text-fg-muted">
      <FileIcon className="size-4 shrink-0 text-fg-subtle" />
      {name}
      {comment && (
        <span className="text-fg-subtle">{comment}</span>
      )}
    </li>
  )
}

function FileTreeRoot({ children }: FileTreeProps) {
  return (
    <div className="my-lg rounded-lg bg-canvas-parchment p-4">
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

export const FileTree = Object.assign(FileTreeRoot, {
  Folder,
  File: FileItem,
})
