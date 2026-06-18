import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TableOfContents } from '@/components/writing/table-of-contents'
import type { TocItem } from '@/types/post'

const items: TocItem[] = [
  { id: 'intro', text: '소개', depth: 2 },
  { id: 'detail', text: '세부', depth: 3 },
  { id: 'end', text: '마무리', depth: 2 },
]

let observerCallback: IntersectionObserverCallback | null = null

beforeEach(() => {
  observerCallback = null
  class MockIntersectionObserver {
    constructor(cb: IntersectionObserverCallback) {
      observerCallback = cb
    }

    observe = vi.fn()
    disconnect = vi.fn()
    unobserve = vi.fn()
    takeRecords = vi.fn()
    root = null
    rootMargin = ''
    thresholds = []
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('TableOfContents', () => {
  it('items가 비면 null을 렌더한다', () => {
    const { container } = render(<TableOfContents items={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('목차 nav와 모든 항목을 렌더한다', () => {
    render(<TableOfContents items={items} />)
    expect(screen.getByRole('navigation', { name: '목차' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '소개' })).toHaveAttribute('href', '#intro')
    expect(screen.getByRole('link', { name: '세부' })).toHaveAttribute('href', '#detail')
  })

  it('h3 항목에 들여쓰기 클래스를 적용한다', () => {
    render(<TableOfContents items={items} />)
    const detailLi = screen.getByRole('link', { name: '세부' }).closest('li')
    expect(detailLi?.className).toContain('pl-3')
  })

  it('교차된 헤딩에 aria-current를 표시한다', () => {
    // 헤딩 요소를 DOM에 추가해 observer가 관찰할 대상을 만든다
    for (const item of items) {
      const el = document.createElement('h2')
      el.id = item.id
      document.body.appendChild(el)
    }

    render(<TableOfContents items={items} />)
    expect(observerCallback).not.toBeNull()

    const target = document.getElementById('detail') as HTMLElement
    act(() => {
      observerCallback?.(
        [{ isIntersecting: true, target, boundingClientRect: { top: 10 } } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(screen.getByRole('link', { name: '세부' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: '소개' })).not.toHaveAttribute('aria-current')

    for (const item of items) document.getElementById(item.id)?.remove()
  })
})
