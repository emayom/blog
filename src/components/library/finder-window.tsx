'use client'

import { useRef, useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from 'react'
import { SearchIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

interface FinderWindowProps {
  sidebar: ReactNode
  title?: ReactNode
  children: ReactNode
  className?: string
  onSearch?: (query: string) => void
  searchPlaceholder?: string
}

export function FinderWindow({
  sidebar,
  title,
  children,
  className,
  onSearch,
  searchPlaceholder = '검색',
}: FinderWindowProps) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  const handleExpand = () => {
    setExpanded(true)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const handleBlur = () => {
    if (query === '') setExpanded(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('')
      onSearch?.('')
      setExpanded(false)
      inputRef.current?.blur()
    }
  }

  const showHeader = Boolean(title || onSearch)

  return (
    <div
      className={cn(
        'flex min-h-0 flex-col overflow-hidden rounded-lg border border-hairline bg-canvas shadow-xl dark:border-ink-muted-80 dark:bg-surface-tile-2',
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col md:flex-row md:items-stretch">
        <div className="flex flex-row border-b border-hairline bg-canvas-parchment md:w-36 md:shrink-0 md:flex-col md:justify-between md:border-b-0 md:border-r dark:border-ink-muted-80 dark:bg-surface-tile-2">
          <div className="hidden h-9 shrink-0 items-center gap-1.5 p-4 md:flex">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-[#febc2e]" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 p-2 md:min-h-48">{sidebar}</div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {showHeader && (
            <div className="hidden h-10 shrink-0 items-center gap-2 pl-4 pr-2 text-sm font-semibold text-ink-muted-48 md:flex dark:text-body-muted">
              {title && <span className="ml-1">{title}</span>}
              {onSearch && (
                <div
                  className={cn(
                    'ml-auto flex items-center rounded-full transition-[width,background-color,padding] duration-200',
                    expanded
                      ? 'w-44 gap-1.5 bg-canvas-parchment px-2 py-1 focus-within:ring-1 focus-within:ring-ink-muted-48/30 dark:bg-surface-tile-3'
                      : 'h-7 w-7 cursor-pointer justify-center hover:bg-canvas-parchment dark:hover:bg-surface-tile-3',
                  )}
                  onClick={!expanded ? handleExpand : undefined}
                  role={!expanded ? 'button' : undefined}
                  aria-label={!expanded ? '검색 열기' : undefined}
                  tabIndex={!expanded ? 0 : undefined}
                  onKeyDown={
                    !expanded
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleExpand()
                          }
                        }
                      : undefined
                  }
                >
                  <SearchIcon
                    size={14}
                    className="shrink-0 text-ink-muted-48 dark:text-body-muted"
                  />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={handleSearchChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={searchPlaceholder}
                    aria-label="검색"
                    className={cn(
                      'min-w-0 border-0 bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted-48 dark:text-body-on-dark dark:placeholder:text-body-muted',
                      expanded ? 'flex-1 opacity-100' : 'pointer-events-none w-0 opacity-0',
                    )}
                    tabIndex={expanded ? 0 : -1}
                  />
                </div>
              )}
            </div>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}
