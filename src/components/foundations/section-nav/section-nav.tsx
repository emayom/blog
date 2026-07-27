import Link from 'next/link'
import { foundationSections } from '@/lib/foundations'
import { NavLink } from '@/components/layout/nav-link'

// 좌측 섹션 네비. 개요(/foundations)는 정확 일치, 하위는 NavLink의 prefix 매칭 사용.
export function SectionNav() {
  return (
    <nav aria-label="Foundations" className="flex flex-col gap-1">
      <Link
        href="/foundations"
        className="text-label-md text-fg-subtle transition-colors hover:text-fg"
      >
        Overview
      </Link>
      {foundationSections.map(section => (
        <NavLink
          key={section.slug}
          href={`/foundations/${section.slug}`}
          className="text-label-md text-fg-subtle transition-colors hover:text-fg"
          activeClassName="font-semibold text-fg"
        >
          {section.title}
        </NavLink>
      ))}
    </nav>
  )
}
