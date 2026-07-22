import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

// 텍스트 스타일의 단일 원천 — Text 밖에서 타이포만 합성할 때(Button 등) 재사용한다.
// variant 이름은 토큰 이름을 그대로 쓴다. 컴포넌트가 다른 어휘를 쓰면 토큰과의 대응이 끊긴다.
// 주의: Tailwind는 클래스를 정적 스캔하므로 이 문자열들은 리터럴로 유지해야 한다.
export const textStyles = {
  'body-lg': 'text-body-lg',
  'body-md': 'text-body-md',
  'label-md': 'text-label-md',
  'label-sm': 'text-label-sm',
  'title-md': 'text-title-md',
  'title-sm': 'text-title-sm',
} as const

const textVariants = cva('', {
  variants: {
    variant: {
      'body-lg': textStyles['body-lg'],
      'body-md': textStyles['body-md'],
      'label-md': textStyles['label-md'],
      'label-sm': textStyles['label-sm'],
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  compoundVariants: [
    // strong은 굵기만 바꾸는 게 아니라 행간이 조여진 별도 토큰이다.
    { variant: 'body-lg', weight: 'semibold', class: textStyles['title-md'] },
    { variant: 'label-md', weight: 'semibold', class: textStyles['title-sm'] },
  ],
  defaultVariants: { variant: 'body-lg' },
})

type TextProps<T extends ElementType = 'p'> = {
  as?: T
} & VariantProps<typeof textVariants>
& Omit<ComponentPropsWithoutRef<T>, 'as' | 'color'>

export function Text<T extends ElementType = 'p'>({ as, variant, weight, className, ...props }: TextProps<T>) {
  const Tag = (as ?? 'p') as ElementType
  return <Tag className={cn(textVariants({ variant, weight }), className)} {...props} />
}
