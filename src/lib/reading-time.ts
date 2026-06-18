// 한국어 본문 기준 분당 글자수. getPostMetaList는 본문을 컴파일하지 않으므로
// raw 문자열 길이로 읽기 시간을 추정한다.
const CHARS_PER_MINUTE = 500

export function getReadingTime(content: string): number {
  const length = content.trim().length
  if (length === 0) return 1
  return Math.max(1, Math.ceil(length / CHARS_PER_MINUTE))
}
