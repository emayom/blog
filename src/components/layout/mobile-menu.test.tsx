import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/writing',
}))

import { MobileMenu } from './mobile-menu'

const items = [
  { label: '글', href: '/writing', enabled: true },
  { label: '소개', href: '/about', enabled: true },
]
const social = [
  { label: 'GitHub', href: 'https://github.com/x', enabled: true, external: true },
]

describe('MobileMenu', () => {
  it('트리거 클릭 시 메뉴가 열린다', async () => {
    const user = userEvent.setup()
    render(<MobileMenu items={items} social={social} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '메뉴 열기' }))
    expect(screen.getByRole('dialog', { name: '모바일 메뉴' })).toBeInTheDocument()
  })

  it('오버레이/트레이를 트리거 컨테이너 밖(portal)으로 렌더한다', async () => {
    // 회귀 가드(#48): header의 backdrop-filter가 containing block이 되어
    // 메뉴가 헤더 박스 안에 갇히는 것을 막기 위해 portal로 body에 렌더해야 한다.
    const user = userEvent.setup()
    const { container } = render(<MobileMenu items={items} social={social} />)

    await user.click(screen.getByRole('button', { name: '메뉴 열기' }))

    const dialog = screen.getByRole('dialog', { name: '모바일 메뉴' })
    expect(container.contains(dialog)).toBe(false)
    expect(document.body.contains(dialog)).toBe(true)
  })
})
