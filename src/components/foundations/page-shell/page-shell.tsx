import type { TocItem } from '@/types/post'
import { TableOfContents } from '@/components/writing/table-of-contents'

// foundations 하위 페이지의 본문 + 우측 TOC 배치. 섹션 목차는 페이지마다 다르므로
// 각 페이지가 toc를 넘긴다. TOC 항목의 id는 페이지 h2의 id와 일치해야 한다.
export function PageShell({ toc, children }: { toc: TocItem[], children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_200px]">
      <div className="min-w-0">{children}</div>
      <aside className="hidden lg:block">
        <div className="sticky top-[70px]">
          <TableOfContents items={toc} />
        </div>
      </aside>
    </div>
  )
}
