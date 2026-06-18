import { describe, expect, it } from 'vitest'
import { getReadingTime } from '@/lib/reading-time'

describe('getReadingTime (ADR-016)', () => {
  it('빈 문자열은 최소 1분을 반환한다', () => {
    expect(getReadingTime('')).toBe(1)
  })

  it('공백만 있는 문자열도 최소 1분을 반환한다', () => {
    expect(getReadingTime('   \n\n  ')).toBe(1)
  })

  it('짧은 글도 최소 1분을 보장한다', () => {
    expect(getReadingTime('짧은 글입니다.')).toBe(1)
  })

  it('펜스 코드 블록은 카운트에서 제외된다 (코드만 있는 입력 → 1분)', () => {
    const codeOnly = '```js\n' + 'const foo = bar; '.repeat(300) + '\n```'
    expect(getReadingTime(codeOnly)).toBe(1)
  })

  it('인라인 코드는 카운트에서 제외된다', () => {
    const inlineOnly = '`code` '.repeat(300)
    expect(getReadingTime(inlineOnly)).toBe(1)
  })

  it('펜스 코드 블록이 산문 분량을 부풀리지 않는다', () => {
    const prose = '한국어 어절 단어 입니다 그리고 또 '.repeat(80) // 480 어절 → 2분
    const code = '\n\n```ts\n' + 'const x = computeSomething(value); '.repeat(400) + '\n```'
    expect(getReadingTime(prose)).toBe(getReadingTime(prose + code))
  })

  it('한국어 어절 기반으로 분을 계산한다 (480 어절 → 2분)', () => {
    const text = '한국어 어절 단어 입니다 그리고 또 '.repeat(80) // 6어절 * 80 = 480
    expect(getReadingTime(text)).toBe(2)
  })

  it('영어 단어 기반으로 분을 계산한다 (600 단어 → 3분)', () => {
    const text = 'word '.repeat(600)
    expect(getReadingTime(text)).toBe(3)
  })

  it('한/영 혼합 콘텐츠를 단일 단위로 합산한다', () => {
    const text = '한국어 본문 입니다 ' + 'word '.repeat(400) + '그리고 또 한국어 '.repeat(50)
    // 약 4 + 400 + 150 = 554 토큰 → 3분
    expect(getReadingTime(text)).toBe(3)
  })

  it('분량이 늘면 읽기 시간도 단조 증가한다', () => {
    const unit = '읽기 시간 테스트 문장 입니다 '
    const short = getReadingTime(unit.repeat(50))
    const long = getReadingTime(unit.repeat(500))
    expect(long).toBeGreaterThan(short)
  })
})
