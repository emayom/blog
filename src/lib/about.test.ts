import { describe, expect, it } from 'vitest'
import { formatExperiencePeriod, formatTenure } from './about'

describe('formatTenure', () => {
  it('년·개월을 함께 표기한다', () => {
    expect(formatTenure(26)).toBe('2년 2개월')
  })

  it('개월이 0이면 년만 표기한다', () => {
    expect(formatTenure(48)).toBe('4년')
  })

  it('1년 미만은 개월만 표기한다', () => {
    expect(formatTenure(11)).toBe('11개월')
  })

  it('0 이하는 최소 1개월로 본다', () => {
    expect(formatTenure(0)).toBe('1개월')
  })
})

describe('formatExperiencePeriod', () => {
  const now = { year: 2026, month: 7 }

  it('종료가 명시된 기간을 한글 + 재직기간으로 변환한다', () => {
    expect(formatExperiencePeriod('2021. 10 ~ 2023. 11', now)).toBe(
      '2021년 10월 - 2023년 11월 · 2년 2개월',
    )
  })

  it('종료가 현재면 now 기준으로 계산한다', () => {
    expect(formatExperiencePeriod('2020. 06 ~ 현재', now)).toBe(
      '2020년 6월 - 현재 · 6년 2개월',
    )
  })

  it('종료가 비어 있으면 재직중으로 보고 now 기준으로 계산한다', () => {
    expect(formatExperiencePeriod('2025.06 ~', now)).toBe(
      '2025년 6월 - 현재 · 1년 2개월',
    )
  })

  it('showTenure가 false면 재직기간을 생략한다', () => {
    expect(formatExperiencePeriod('2016. 03 ~ 2021. 02', now, false)).toBe(
      '2016년 3월 - 2021년 2월',
    )
  })

  it('파싱할 수 없으면 원본을 반환한다', () => {
    expect(formatExperiencePeriod('상시', now)).toBe('상시')
  })
})
