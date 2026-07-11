// YYYY-MM-DD → YYYY.MM.DD. 형식이 맞지 않으면 원본을 그대로 둔다.
export function formatDate(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return date
  return `${match[1]}.${match[2]}.${match[3]}`
}

// 올해 날짜는 월.일만, 지난 해 날짜는 연도까지 표기해 연도를 구분한다.
// 현재 연도는 렌더(빌드) 시점 기준.
export function formatNoteDate(date: string): string {
  const parts = date.split('-')
  if (parts.length < 3) return date
  const [year, month, day] = parts
  const currentYear = String(new Date().getFullYear())
  return year === currentYear ? `${month}.${day}` : `${year}.${month}.${day}`
}
