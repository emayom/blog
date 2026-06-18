import { describe, expect, it } from 'vitest'
import { formatDate } from '@/lib/format-date'

describe('formatDate', () => {
  it('YYYY-MM-DD를 YYYY.MM.DD로 변환한다', () => {
    expect(formatDate('2026-06-18')).toBe('2026.06.18')
  })

  it('이미 점 구분 형식이면 그대로 반환한다', () => {
    expect(formatDate('2026.06.18')).toBe('2026.06.18')
  })

  it('빈 문자열은 빈 문자열을 반환한다', () => {
    expect(formatDate('')).toBe('')
  })

  it('형식에 맞지 않는 값은 원본을 반환한다', () => {
    expect(formatDate('invalid')).toBe('invalid')
  })
})
