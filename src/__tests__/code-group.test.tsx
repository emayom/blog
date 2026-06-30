import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CodeGroup } from '@/components/mdx/code-group'

function setup() {
  return render(
    <CodeGroup labels={['npm', 'pnpm']}>
      <pre>npm install</pre>
      <pre>pnpm install</pre>
    </CodeGroup>,
  )
}

describe('CodeGroup', () => {
  it('초기에는 첫 번째 탭이 활성이다', () => {
    setup()
    expect(screen.getByRole('button', { name: 'npm' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'pnpm' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('비활성 패널은 hidden 클래스를 가진다', () => {
    setup()
    const second = screen.getByText('pnpm install')
    expect(second.parentElement).toHaveClass('hidden')
    expect(screen.getByText('npm install').parentElement).not.toHaveClass('hidden')
  })

  it('탭을 클릭하면 해당 패널로 전환된다', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByRole('button', { name: 'pnpm' }))

    expect(screen.getByRole('button', { name: 'pnpm' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('pnpm install').parentElement).not.toHaveClass('hidden')
    expect(screen.getByText('npm install').parentElement).toHaveClass('hidden')
  })
})
