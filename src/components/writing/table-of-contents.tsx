'use client'

import { useEffect, useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import type { TocItem } from '@/types/post'

const linkVariants = cva('block text-sm tracking-[-0.224px] transition-colors', {
  variants: {
    active: {
      true: 'font-semibold text-primary dark:text-primary-on-dark',
      false:
        'text-ink-muted-48 hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark',
    },
  },
  defaultVariants: { active: false },
})

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const headings = items
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      // 헤더 높이(70px)를 빼고 화면 상단 부근에 들어온 헤딩을 활성으로 본다
      { rootMargin: '-70px 0px -70% 0px' },
    )

    for (const heading of headings) observer.observe(heading)
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="목차" className="space-y-2.5">
      <p className="text-sm font-semibold tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted">
        목차
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className={cn(item.depth === 3 && 'pl-3')}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={linkVariants({ active: isActive })}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
