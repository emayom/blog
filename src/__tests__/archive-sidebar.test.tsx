import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ArchiveSidebar } from '@/components/home/archive-sidebar'

describe('ArchiveSidebar', () => {
  it('연도와 글 수를 렌더한다', () => {
    render(<ArchiveSidebar years={[{ year: '2026', count: 3 }]} />)
    expect(screen.getByText('2026')).toBeInTheDocument()
    expect(screen.getByText('3편')).toBeInTheDocument()
  })

  it('연도 항목은 비링크다 (a 태그 없음)', () => {
    const { container } = render(
      <ArchiveSidebar years={[{ year: '2026', count: 3 }]} />,
    )
    expect(container.querySelector('a')).toBeNull()
  })

  it('연도가 없으면 아무것도 렌더하지 않는다', () => {
    const { container } = render(<ArchiveSidebar years={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
