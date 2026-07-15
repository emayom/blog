import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

// body는 색 토큰 --color-body와 text-* 네임스페이스가 충돌해 text-body 유틸이 색으로 해석된다.
// body 계열만 CSS 변수를 직접 참조한다 (색 토큰 마이그레이션 후 text-body 한 줄로 단순화 예정).
const textVariants = cva('', {
  variants: {
    variant: {
      'body': 'text-(length:--text-body) leading-(--text-body--line-height) tracking-(--text-body--letter-spacing) font-(--text-body--font-weight)',
      'caption': 'text-caption',
      'fine-print': 'text-fine-print',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  compoundVariants: [
    { variant: 'body', weight: 'semibold', class: 'text-(length:--text-body-strong) leading-(--text-body-strong--line-height) tracking-(--text-body-strong--letter-spacing) font-(--text-body-strong--font-weight)' },
    { variant: 'caption', weight: 'semibold', class: 'text-(length:--text-caption-strong) leading-(--text-caption-strong--line-height) tracking-(--text-caption-strong--letter-spacing) font-(--text-caption-strong--font-weight)' },
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
