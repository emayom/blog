'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import type { PostMeta } from '@/types/post'
import { useSearch } from '@/components/search/search-provider'
import { SearchResultItem } from '@/components/search/search-result-item'
import { Kbd } from '@/components/ui/kbd'
import { ModalEmptyState } from '@/components/search/modal-empty-state'
import { SearchIcon } from '@/components/icons'

const MAX_RESULTS = 8

export function SearchModal() {
  const router = useRouter()
  const { posts, setOpen } = useSearch()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const labelId = useId()
  const resultsId = useId()

  const fuse = useMemo(
    () =>
      new Fuse<PostMeta>(posts, {
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.1 },
        ],
        threshold: 0.4,
        minMatchCharLength: 2,
      }),
    [posts],
  )

  const trimmed = query.trim()
  const results: PostMeta[] = useMemo(() => {
    if (trimmed.length === 0) return []
    return fuse.search(trimmed).slice(0, MAX_RESULTS).map(r => r.item)
  }, [fuse, trimmed])

  const isInitial = trimmed.length === 0
  const isEmpty = trimmed.length > 0 && results.length === 0

  const scopeLabel = trimmed
    ? `글에서 검색 · 결과 ${results.length}`
    : '글에서 검색'

  function goToPost(post: PostMeta) {
    setOpen(false)
    router.push(`/writing/${post.slug}`)
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (i + 1) % results.length)
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (i - 1 + results.length) % results.length)
    }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const post = results[activeIndex]
      if (post) goToPost(post)
    }
  }

  // 선택된 결과가 보이도록 스크롤
  useEffect(() => {
    const active = resultsRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView?.({ block: 'nearest' })
  }, [activeIndex])

  useEffect(() => {
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [setOpen])

  // focus trap
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      }
      else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[rgba(20,20,20,0.4)] px-4 pt-16"
      onClick={() => setOpen(false)}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        aria-label="검색"
        className="relative z-10 flex w-full max-w-145 flex-col overflow-hidden rounded-[14px] border border-hairline bg-canvas shadow-[0_24px_60px_rgba(0,0,0,0.3)] max-h-[70vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* 검색 입력 행 */}
        <div className="flex items-center gap-3 border-b border-hairline px-4.5 py-4">
          <SearchIcon size={16} className="shrink-0 text-fg-subtle" />
          <label id={labelId} htmlFor="search-input" className="sr-only">검색</label>
          <input
            ref={inputRef}
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={onInputKeyDown}
            placeholder="검색어를 입력하세요"
            aria-label="검색"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-body-md text-fg placeholder:text-fg-subtle outline-none dark:placeholder:text-body-muted [&::-webkit-search-cancel-button]:hidden"
          />
        </div>

        {/* 스코프 라인 */}
        <div className="border-b border-hairline px-4.5 py-2.25 text-label-sm text-fg-subtle">
          {scopeLabel}
        </div>

        {/* 결과 영역 */}
        <div
          ref={resultsRef}
          id={resultsId}
          aria-live="polite"
          aria-label="검색 결과"
          className="flex-1 overflow-y-auto"
        >
          {isInitial && (
            <ModalEmptyState message="검색어를 입력해 글을 찾아보세요" />
          )}
          {isEmpty && (
            <ModalEmptyState
              message="검색 결과가 없습니다"
              action={{ label: '전체 글 보기', href: '/writing', onClick: () => setOpen(false) }}
            />
          )}
          {!isInitial && !isEmpty && (
            <ul className="divide-y divide-hairline">
              {results.map((post, i) => (
                <li key={post.slug}>
                  <SearchResultItem
                    post={post}
                    active={i === activeIndex}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setActiveIndex(i)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 키보드 단축키 footer */}
        {!isInitial && !isEmpty && (
          <div className="flex items-center gap-4 border-t border-hairline bg-canvas-parchment px-4.5 py-2.5 text-label-sm text-fg-subtle">
            <span>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              {' '}
              이동
            </span>
            <span>
              <Kbd>↵</Kbd>
              {' '}
              열기
            </span>
            <span>
              <Kbd>esc</Kbd>
              {' '}
              닫기
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
