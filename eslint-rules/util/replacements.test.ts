import { describe, expect, it } from 'vitest'
import { COLOR_RENAMES, findReplacement, REPLACEMENTS } from './replacements.ts'

describe('토큰 원천 파생', () => {
  // 원천 경로·구조가 바뀌면 맵이 조용히 비고, 룰은 "위반 0건"처럼 보이며 아무것도 고치지 않는다.
  it('맵이 비어 있지 않다', () => {
    expect(REPLACEMENTS.size).toBeGreaterThan(0)
  })

  it('토큰 값을 임의값 클래스에 대응시킨다', () => {
    expect(REPLACEMENTS.get('rounded-[18px]')).toBe('rounded-lg')
    expect(REPLACEMENTS.get('rounded-[11px]')).toBe('rounded-md')
  })

  it('값이 겹치면 원천에 먼저 정의된 이름을 쓴다 (pill·full = 9999px)', () => {
    expect(REPLACEMENTS.get('rounded-[9999px]')).toBe('rounded-pill')
  })

  it('토큰에 없는 값은 치환 대상이 아니다', () => {
    expect(REPLACEMENTS.has('rounded-[14px]')).toBe(false)
  })
})

describe('findReplacement', () => {
  it('임의값을 토큰으로 바꾼다', () => {
    expect(findReplacement('rounded-[11px]')).toBe('rounded-md')
  })

  it('대응 토큰이 없으면 null', () => {
    expect(findReplacement('rounded-[14px]')).toBeNull()
    expect(findReplacement('max-w-[40ch]')).toBeNull()
    expect(findReplacement('bg-canvas')).toBeNull()
  })

  it('deprecated 토큰은 접두사를 유지한 채 색 부분만 바꾼다', () => {
    expect(findReplacement('text-ink')).toBe('text-fg')
    expect(findReplacement('border-ink-muted-80')).toBe('border-fg-muted')
    expect(findReplacement('divide-ink-muted-48')).toBe('divide-fg-subtle')
  })

  it('투명도 수식어를 보존한다', () => {
    expect(findReplacement('bg-ink-muted-48/50')).toBe('bg-fg-subtle/50')
  })

  // `ink`가 먼저 매칭되면 `ink-muted-80`이 `fg-muted-80`으로 잘려 나간다.
  it('긴 이름을 먼저 매칭한다', () => {
    expect(findReplacement('text-ink-muted-80')).toBe('text-fg-muted')
    expect(findReplacement('text-ink-muted-80')).not.toBe('text-fg-muted-80')
  })

  it('deprecated 이름이 부분 문자열로 들어간 클래스는 건드리지 않는다', () => {
    expect(findReplacement('bg-pink-alt')).toBeNull()
    expect(findReplacement('text-inkling')).toBeNull()
  })

  it('원천에서 제거된 이름을 계속 붙든다', () => {
    // 토큰이 사라진 뒤 이 맵을 지우면 `text-ink` 같은 클래스가 경고 없이 무효가 된다.
    expect([...COLOR_RENAMES.keys()]).toEqual(['ink-muted-80', 'ink-muted-48', 'ink'])
  })
})
