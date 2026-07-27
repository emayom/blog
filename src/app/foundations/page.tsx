import Link from 'next/link'
import { foundationSections } from '@/lib/foundations'

export default function FoundationsOverview() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-display-md text-fg">Foundations</h1>
        <p className="text-body-lg text-fg-muted">
          디자인 토큰을 시각화한 개발용 참조 문서. 토큰 원천에서 직접 읽어 항상 최신 상태를 반영한다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {foundationSections.map(section => (
          <Link
            key={section.slug}
            href={`/foundations/${section.slug}`}
            className="flex flex-col gap-1 rounded-lg border border-hairline bg-canvas p-5 transition-colors hover:border-fg-subtle"
          >
            <span className="text-title-md text-fg">{section.title}</span>
            <span className="text-label-md text-fg-subtle">{section.description}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
