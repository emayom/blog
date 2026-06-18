import { describe, expect, it } from 'vitest'
import { getReadingTime } from '@/lib/reading-time'

describe('getReadingTime', () => {
  it('빈 문자열은 최소 1분을 반환한다', () => {
    expect(getReadingTime('')).toBe(1)
  })

  it('공백만 있는 문자열도 최소 1분을 반환한다', () => {
    expect(getReadingTime('   \n\n  ')).toBe(1)
  })

  it('짧은 글은 1분으로 올림한다', () => {
    expect(getReadingTime('짧은 글입니다.')).toBe(1)
  })

  it('500자 기준 분당 글자수로 분을 계산한다', () => {
    // 1000자 → 2분
    const text = '가'.repeat(1000)
    expect(getReadingTime(text)).toBe(2)
  })

  it('경계값(501자)은 올림하여 2분을 반환한다', () => {
    const text = '가'.repeat(501)
    expect(getReadingTime(text)).toBe(2)
  })

  it('영문 단어도 글자수에 포함하여 계산한다', () => {
    const text = 'word '.repeat(200) // 1000자
    expect(getReadingTime(text)).toBe(2)
  })
})
