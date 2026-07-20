'use client'

import { SearchIcon } from '@/components/icons'
import { useSearch } from '@/components/search/search-provider'

export function SearchTrigger() {
  const { setOpen } = useSearch()

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="검색 열기"
      aria-haspopup="dialog"
      title="검색"
      className="inline-flex h-9 items-center px-1 text-ink-muted-48 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:text-body-muted dark:hover:text-body-on-dark"
    >
      <SearchIcon size={18} />
    </button>
  )
}
