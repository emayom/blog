import { describe, expect, it } from 'vitest'
import { truncateTitle } from '@/lib/og'

describe('truncateTitle', () => {
  it('60자 이하 제목은 그대로 둔다', () => {
    const title = '짧은 제목'
    expect(truncateTitle(title)).toBe(title)
  })

  it('60자 경계값은 트렁케이트하지 않는다', () => {
    const title = 'a'.repeat(60)
    expect(truncateTitle(title)).toBe(title)
  })

  it('60자 초과 제목은 60자로 자르고 …를 붙인다', () => {
    const title = 'a'.repeat(70)
    const result = truncateTitle(title)
    expect(result.endsWith('…')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(61)
  })

  it('빈 문자열은 그대로 반환한다', () => {
    expect(truncateTitle('')).toBe('')
  })
})
