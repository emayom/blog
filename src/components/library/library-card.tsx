import Image from 'next/image'
import type { LibraryItemMeta } from '@/types/library'

interface LibraryCardProps {
  item: LibraryItemMeta
}

export function LibraryCard({ item }: LibraryCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm bg-canvas-parchment dark:bg-surface-tile-3">
        {item.cover
          ? (
              <Image src={item.cover} alt={item.title} fill className="object-cover" />
            )
          : (
              <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-ink-muted-48 dark:text-body-muted">
                {item.title.charAt(0)}
              </span>
            )}
      </div>
      <p className="mt-1.5 line-clamp-2 text-center text-xs text-ink dark:text-body-on-dark">
        {item.title}
      </p>
    </div>
  )
}
