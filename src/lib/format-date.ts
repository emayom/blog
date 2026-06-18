// YYYY-MM-DD → YYYY.MM.DD. 형식이 맞지 않으면 원본을 그대로 둔다.
export function formatDate(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return date
  return `${match[1]}.${match[2]}.${match[3]}`
}
