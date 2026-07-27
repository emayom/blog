import type { Metadata } from 'next'
import { SectionNav } from '@/components/foundations/section-nav'

// 디자인 시스템 참조 문서. 공개 라우트지만 콘텐츠(글·검색·RSS)와 분리된 문서 표면이다.
export const metadata: Metadata = {
  title: 'Foundations',
}

export default function FoundationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:flex-row">
      <aside className="shrink-0 sm:sticky sm:top-20 sm:w-40 sm:self-start">
        <SectionNav />
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
