/**
 * 클래스명 치환 규칙 — "이 클래스는 무엇이 되어야 하는가"만 안다.
 * 무엇을 금지할지·어떻게 보고할지는 룰의 몫이다.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const COLOR_PROP = 'bg|text|border|ring|divide|fill|stroke|from|via|to|outline|decoration|shadow|accent|caret|placeholder'

/**
 * 임의값 → 토큰 치환 맵. 토큰 원천에서 파생시킨다 —
 * 여기에 값을 베껴 쓰면 원천이 바뀌었을 때 조용히 낡아 잘못된 치환을 하게 된다.
 */
/** Style Dictionary 원천의 최소 형태 — 값을 읽는 데 필요한 만큼만 선언한다. */
interface TokenGroup {
  [name: string]: { $value: string }
}

function replacementsFrom(...sources: [file: string, prefix: string][]) {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../src/styles/tokens/size')
  const map = new Map<string, string>()

  for (const [file, prefix] of sources) {
    const source: Record<string, TokenGroup> = JSON.parse(readFileSync(path.join(dir, file), 'utf8'))
    const [group] = Object.values(source)
    for (const [name, token] of Object.entries(group)) {
      // 값이 겹치면(pill·full = 9999px) 원천에 먼저 정의된 이름을 남긴다.
      const key = `${prefix}-[${token.$value}]`
      if (!map.has(key)) map.set(key, `${prefix}-${name}`)
    }
  }
  return map
}

export const REPLACEMENTS = replacementsFrom(['radius.json', 'rounded'], ['text.json', 'text'])

/**
 * deprecated 색 토큰 → 새 이름. 값이 아니라 이름 변경 이력이라 원천에서 파생시킬 수 없다.
 *
 * 원천에서 제거된 뒤에도 유지한다 — 없는 토큰을 참조하는 클래스는 팔레트도 임의값도 아니라
 * 이 맵이 없으면 아무 경고 없이 스타일만 사라진다. 여기가 유일한 방어선이다.
 */
export const COLOR_RENAMES = new Map<string, string>([
  ['ink-muted-80', 'fg-muted'],
  ['ink-muted-48', 'fg-subtle'],
  ['ink', 'fg'],
])

// 긴 이름부터 매칭해야 `ink`가 `ink-muted-80`을 삼키지 않는다.
const COLOR_RENAME_RE = new RegExp(
  `^(${COLOR_PROP})-(${[...COLOR_RENAMES.keys()].sort((a, b) => b.length - a.length).join('|')})(/\\d+)?$`,
)

/** 치환 후보를 찾는다. 없으면 null. 접두사(text-·border-…)와 투명도(/50)는 유지한다. */
export function findReplacement(cls: string): string | null {
  const exact = REPLACEMENTS.get(cls)
  if (exact) return exact

  const renamed = cls.match(COLOR_RENAME_RE)
  if (renamed) {
    const [, prop, oldName, opacity = ''] = renamed
    return `${prop}-${COLOR_RENAMES.get(oldName)}${opacity}`
  }
  return null
}
