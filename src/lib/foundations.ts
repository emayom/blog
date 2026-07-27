import baseColors from '@/styles/tokens/color/base.json'
import semanticColors from '@/styles/tokens/color/semantic.json'
import radiusTokens from '@/styles/tokens/size/radius.json'
import spacingTokens from '@/styles/tokens/size/spacing.json'
import textStyles from '@/styles/tokens/typography/text-styles.json'

// Foundations는 개발 전용 문서 라우트다. 토큰 원천(JSON)을 직접 읽어 렌더하므로
// 파이프라인 생성물과 별개로 항상 원천과 일치한다.

export interface FoundationSection {
  slug: string
  title: string
  description: string
}

export const foundationSections: FoundationSection[] = [
  { slug: 'color', title: 'Color', description: 'Role·Palette 색 토큰' },
  { slug: 'typography', title: 'Typography', description: '타입 스타일 스케일' },
  { slug: 'spacing', title: 'Spacing', description: '간격 스케일' },
  { slug: 'radius', title: 'Radius', description: '모서리 반경' },
  { slug: 'elevation', title: 'Elevation', description: '표면 계층 (라이트·다크)' },
  { slug: 'writing', title: 'Writing', description: '보이스·문체 원칙' },
]

/**
 * `{color.gray.900}` 같은 참조를 실제 hex로 해석한다.
 * semantic → semantic → base 체인을 따라간다. CSS 변수 cascade에 의존하지 않고
 * 라이트/다크 값을 명시적으로 얻어, 갤러리가 페이지 테마와 무관하게 정확히 렌더한다.
 */
function resolveRef(ref: string): string {
  const path = ref.replace(/^\{color\./, '').replace(/\}$/, '').split('.')
  // base 팔레트 조회 (gray.900, blue.400, near-black.1, white, black)
  let node: unknown = (baseColors.color as Record<string, unknown>)[path[0]]
  for (let i = 1; i < path.length && node; i++)
    node = (node as Record<string, unknown>)[path[i]]
  if (node && typeof (node as { $value?: string }).$value === 'string')
    return (node as { $value: string }).$value
  // base에 없으면 semantic 참조 → 재귀
  const sem = (semanticColors.color as Record<string, { $value: string }>)[path.join('-')]
  if (sem)
    return resolveRef(sem.$value)
  return ref
}

/** semantic 색 토큰 — 역할명 + 해석된 라이트/다크 hex. */
export interface RoleColor {
  name: string
  sourceRef: string
  light: string
  dark: string
}

export function getRoleColors(): RoleColor[] {
  return Object.entries(semanticColors.color).map(([name, def]) => {
    const light = resolveRef(def.$value)
    const darkRef = ('$extensions' in def && def.$extensions?.dark) || def.$value
    return { name, sourceRef: def.$value, light, dark: resolveRef(darkRef) }
  })
}

/** surface 토큰의 라이트/다크 hex — elevation 시각화용. */
export function resolveColorToken(name: string): { light: string, dark: string } {
  const def = (semanticColors.color as Record<string, { $value: string, $extensions?: { dark?: string } }>)[name]
  if (!def)
    return { light: '#000', dark: '#000' }
  return { light: resolveRef(def.$value), dark: resolveRef(def.$extensions?.dark ?? def.$value) }
}

/** base 팔레트 — 원시 hex. 스케일 그룹으로 묶는다. */
export interface PaletteGroup {
  name: string
  swatches: { step: string, value: string }[]
}

export function getPaletteGroups(): PaletteGroup[] {
  const groups: PaletteGroup[] = []
  for (const [name, def] of Object.entries(baseColors.color)) {
    if (typeof (def as { $value?: string }).$value === 'string') {
      groups.push({ name, swatches: [{ step: name, value: (def as { $value: string }).$value }] })
      continue
    }
    const swatches = Object.entries(def as Record<string, { $value: string }>)
      .map(([step, token]) => ({ step, value: token.$value }))
    groups.push({ name, swatches })
  }
  return groups
}

export interface TypeStyle {
  name: string
  fontSize: string
  fontWeight: number
  lineHeight: number
  letterSpacing: string
}

export function getTypeStyles(): TypeStyle[] {
  return Object.entries(textStyles.text).map(([name, def]) => ({
    name,
    fontSize: def.$value.fontSize,
    fontWeight: def.$value.fontWeight,
    lineHeight: def.$value.lineHeight,
    letterSpacing: def.$value.letterSpacing,
  }))
}

/**
 * 타이포 축(크기·행간·굵기·자간)의 distinct 값을 composite에서 도출한다.
 * 이 시스템은 축을 별도 토큰으로 두지 않고 DTCG composite에 묶으므로(AGENTS.md 6),
 * "실제로 쓰이는 값 + 그 값을 쓰는 스타일"을 원천에서 뽑아 보여준다.
 */
export interface AxisValue {
  value: string
  usedBy: string[]
}

function deriveAxis(pick: (v: TypeStyle) => string): AxisValue[] {
  const map = new Map<string, string[]>()
  for (const style of getTypeStyles()) {
    const v = pick(style)
    map.set(v, [...(map.get(v) ?? []), style.name])
  }
  return [...map.entries()].map(([value, usedBy]) => ({ value, usedBy }))
}

export interface TypeAxes {
  fontSize: AxisValue[]
  lineHeight: AxisValue[]
  fontWeight: AxisValue[]
  letterSpacing: AxisValue[]
}

export function getTypeAxes(): TypeAxes {
  const byPx = (a: AxisValue, b: AxisValue) => Number.parseFloat(a.value) - Number.parseFloat(b.value)
  return {
    fontSize: deriveAxis(s => s.fontSize).sort(byPx),
    lineHeight: deriveAxis(s => String(s.lineHeight)).sort(byPx),
    fontWeight: deriveAxis(s => String(s.fontWeight)).sort(byPx),
    letterSpacing: deriveAxis(s => s.letterSpacing).sort(byPx),
  }
}

export interface DimensionToken {
  name: string
  value: string
}

export function getSpacingTokens(): DimensionToken[] {
  return Object.entries(spacingTokens.spacing).map(([name, def]) => ({ name, value: def.$value }))
}

export function getRadiusTokens(): DimensionToken[] {
  return Object.entries(radiusTokens.radius).map(([name, def]) => ({ name, value: def.$value }))
}
