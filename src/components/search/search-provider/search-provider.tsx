'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { PostMeta } from '@/types/post'
import type { SearchContextValue } from '@/types/search'
import { SearchModal } from '@/components/search/search-modal'

export const SearchContext = createContext<SearchContextValue | null>(null)

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}

interface SearchProviderProps {
  posts: PostMeta[]
  children: React.ReactNode
}

export function SearchProvider({ posts, children }: SearchProviderProps) {
  const [open, setOpenState] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)

  const setOpen = useCallback((next: boolean) => {
    if (next) {
      triggerRef.current = document.activeElement as HTMLElement
    }
    setOpenState(next)
  }, [])

  // Cmd+K / Ctrl+K 전역 단축키
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [setOpen])

  // 닫힐 때 트리거 버튼 포커스 복원
  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [open])

  return (
    <SearchContext.Provider value={{ posts, open, setOpen }}>
      {children}
      {open && <SearchModal />}
    </SearchContext.Provider>
  )
}
