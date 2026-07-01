import type { ReactNode } from 'react'
import { ShelfSidebar } from '@/components/library/shelf-sidebar'
import { CategoryTabs } from '@/components/library/category-tabs'
import type { LibraryType } from '@/types/library'

interface ShelfWrapperProps {
  type: LibraryType
  children: ReactNode
}

const LABEL: Record<LibraryType, string> = { anime: 'anime', book: 'books' }

export function ShelfWrapper({ type, children }: ShelfWrapperProps) {
  return (
    <>
      {/* PC: 배경 + 콘텐츠 카드(사이드바 | 메인) */}
      <div className="hidden bg-canvas-parchment p-8 md:block dark:bg-surface-tile-2">
        <div className="grid grid-cols-[200px_1fr] overflow-hidden rounded-lg border border-hairline bg-canvas dark:border-ink-muted-80 dark:bg-surface-tile-1">
          <ShelfSidebar active={type} />
          <main className="p-6">
            <h1 className="mb-6 text-base font-semibold text-ink dark:text-body-on-dark">
              {LABEL[type]}
            </h1>
            {children}
          </main>
        </div>
      </div>

      {/* 모바일: 상단 탭 + 메인 */}
      <div className="px-6 py-8 md:hidden">
        <CategoryTabs active={type} />
        <main className="mt-4">
          <h1 className="mb-5 text-[13px] font-semibold text-ink dark:text-body-on-dark">
            {LABEL[type]}
          </h1>
          {children}
        </main>
      </div>
    </>
  )
}
