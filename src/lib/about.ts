interface YearMonth {
  year: number
  month: number
}

const PRESENT = /현재|now|present/i

function parseYearMonth(value: string): YearMonth | null {
  const matched = value.trim().match(/(\d{4})\D+(\d{1,2})/)
  if (!matched)
    return null
  return { year: Number(matched[1]), month: Number(matched[2]) }
}

// 개월 수를 "N년 M개월" 형태로. 0인 단위는 생략한다.
export function formatTenure(months: number): string {
  const safe = Math.max(months, 1)
  const years = Math.floor(safe / 12)
  const rest = safe % 12
  const parts: string[] = []
  if (years)
    parts.push(`${years}년`)
  if (rest)
    parts.push(`${rest}개월`)
  return parts.join(' ')
}

// "2021. 10 ~ 2023. 11" → "2021년 10월 – 2023년 11월 · 2년 2개월"
// 종료가 "현재"면 now를 기준으로 재직기간을 계산한다.
export function formatExperiencePeriod(period: string, now: YearMonth, showTenure = true): string {
  const [rawStart, rawEnd = ''] = period.split('~').map(part => part.trim())
  const start = parseYearMonth(rawStart)
  if (!start)
    return period

  // 종료가 비어 있거나("2025.06 ~") "현재"면 재직중으로 보고 now 기준 계산
  const isPresent = rawEnd === '' || PRESENT.test(rawEnd)
  const end = isPresent ? now : parseYearMonth(rawEnd)
  if (!end)
    return period

  const startLabel = `${start.year}년 ${start.month}월`
  const endLabel = isPresent ? '현재' : `${end.year}년 ${end.month}월`
  const range = `${startLabel} - ${endLabel}`

  if (!showTenure)
    return range

  const months = (end.year * 12 + end.month) - (start.year * 12 + start.month) + 1
  return `${range} · ${formatTenure(months)}`
}
