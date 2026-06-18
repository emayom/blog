import { readingTime } from 'reading-time-estimator'

// 코드는 산문 읽기 속도로 읽히지 않아 카운트에서 제외한다 (ADR-016).
// 라이브러리가 코드 텍스트를 빼주지 않으므로 우리가 strip한다.
// 펜스를 먼저 제거한 뒤 인라인을 제거한다 — 펜스가 백틱을 포함하기 때문.
function stripCode(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
}

// 토큰화·분 계산은 reading-time-estimator에 위임한다 (ADR-016).
// 한국어=어절, 영어=단어를 같은 단위로 토큰화하므로 단일 200 WPM이 한/영 혼합에 적합하다.
// 입력은 frontmatter가 제거된 raw MDX 문자열이며, 코드 strip만 추가로 수행한다.
export function getReadingTime(content: string): number {
  const text = stripCode(content)
  const { minutes } = readingTime(text, { wordsPerMinute: 200 })
  return Math.max(1, minutes)
}
