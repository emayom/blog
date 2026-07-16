import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

// 텍스트 스타일의 단일 원천 — Text 밖에서 타이포만 합성할 때(Button 등) 재사용한다.
// body 계열은 색 토큰 --color-body와 text-* 네임스페이스가 충돌해 text-body 유틸이 색으로
// 해석되므로 CSS 변수를 직접 참조한다 (색 토큰 마이그레이션 후 단순화 예정).
// 주의: Tailwind는 클래스를 정적 스캔하므로 이 문자열들은 리터럴로 유지해야 한다.
export const textStyles = {
  'body': 'text-(length:--text-body) leading-(--text-body--line-height) tracking-(--text-body--letter-spacing) font-(--text-body--font-weight)',
  'body-strong': 'text-(length:--text-body-strong) leading-(--text-body-strong--line-height) tracking-(--text-body-strong--letter-spacing) font-(--text-body-strong--font-weight)',
  'caption': 'text-caption',
  'caption-strong': 'text-(length:--text-caption-strong) leading-(--text-caption-strong--line-height) tracking-(--text-caption-strong--letter-spacing) font-(--text-caption-strong--font-weight)',
  'fine-print': 'text-fine-print',
} as const

const textVariants = cva('', {
  variants: {
    variant: {
      'body': textStyles.body,
      'caption': textStyles.caption,
      'fine-print': textStyles['fine-print'],
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  compoundVariants: [
    { variant: 'body', weight: 'semibold', class: textStyles['body-strong'] },
    { variant: 'caption', weight: 'semibold', class: textStyles['caption-strong'] },
  ],
  defaultVariants: { variant: 'body' },
})

type TextProps<T extends ElementType = 'p'> = {
  as?: T
} & VariantProps<typeof textVariants>
& Omit<ComponentPropsWithoutRef<T>, 'as' | 'color'>

export function Text<T extends ElementType = 'p'>({ as, variant, weight, className, ...props }: TextProps<T>) {
  const Tag = (as ?? 'p') as ElementType
  return <Tag className={cn(textVariants({ variant, weight }), className)} {...props} />
}
