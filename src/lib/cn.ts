import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { radiusTokenKeys, spacingTokenKeys, textTokenKeys } from '@/styles/tokens.groups'

// @theme 커스텀 토큰 유틸리티(px-lg, rounded-pill, text-caption 등)는 기본 tailwind-merge가
// 같은 속성 그룹으로 인식하지 못해 충돌 클래스가 둘 다 남고, 승자가 CSS 선언 순서로 갈린다.
// 토큰 원천에서 생성된 키 목록(tokens.groups.ts)을 그룹에 등록해 병합을 정상화한다 —
// 토큰을 추가·삭제하면 tokens:build가 목록을 갱신하므로 여기는 손댈 필요가 없다.
const spacing = [...spacingTokenKeys]
const radius = [...radiusTokenKeys]
const text = [...textTokenKeys]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'p': [{ p: spacing }],
      'px': [{ px: spacing }],
      'py': [{ py: spacing }],
      'pt': [{ pt: spacing }],
      'pr': [{ pr: spacing }],
      'pb': [{ pb: spacing }],
      'pl': [{ pl: spacing }],
      'm': [{ m: spacing }],
      'mx': [{ mx: spacing }],
      'my': [{ my: spacing }],
      'mt': [{ mt: spacing }],
      'mr': [{ mr: spacing }],
      'mb': [{ mb: spacing }],
      'ml': [{ ml: spacing }],
      'gap': [{ gap: spacing }],
      'gap-x': [{ 'gap-x': spacing }],
      'gap-y': [{ 'gap-y': spacing }],
      'rounded': [{ rounded: radius }],
      'font-size': [{ text }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
