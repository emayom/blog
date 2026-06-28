import Link from 'next/link'

interface FolderCardProps {
  year: string
  count: number
}

export function FolderCard({ year, count }: FolderCardProps) {
  return (
    <Link
      href={`/archive/${year}`}
      className="flex flex-col items-center gap-2.5 rounded-[11px] px-3 pb-4 pt-5 transition-colors hover:bg-canvas-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:hover:bg-surface-tile-2"
    >
      <span aria-hidden="true" className="relative h-[68px] w-20 shrink-0">
        <span className="absolute inset-x-0 bottom-0 h-[58px] rounded-[3px_8px_8px_8px] bg-primary dark:bg-primary-on-dark" />
        <span className="absolute left-0 top-0 h-[14px] w-[34px] rounded-t-xs bg-primary dark:bg-primary-on-dark" />
        <span className="absolute inset-x-0 bottom-[46px] z-10 h-px bg-white/25" />
      </span>
      <span className="text-center">
        <span className="block text-[14px] font-semibold tracking-[-0.224px] text-ink dark:text-body-on-dark">
          {year}
        </span>
        <span className="mt-0.5 block text-[12px] text-ink-muted-48 dark:text-body-muted">
          {count}
          편
        </span>
      </span>
    </Link>
  )
}
