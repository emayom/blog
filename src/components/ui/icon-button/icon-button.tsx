import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

// ponytail: base는 Button과 상당수 겹치지만(inline-flex·press·focus ring) 의도적 중복이다 —
// IconButton은 정사각 레이아웃·aria-label 강제·shape/variant 축이 독립이라 Button을 재사용하면
// 오히려 두 컴포넌트의 계약이 얽힌다. 공유 상수로 뽑는 건 세 번째 소비자가 생기면.
// [&_svg]:size-4 — 아이콘 기본 16px 통일. 다른 크기는 호출부 className `[&_svg]:size-5`로 오버라이드.
const iconButtonCva = cva(
  'inline-flex shrink-0 items-center justify-center transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus [&_svg]:size-4',
  {
    variants: {
      size: {
        sm: 'size-7',
        md: 'size-9',
        lg: 'size-11',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-sm',
      },
      variant: {
        // ink→fg 값-동일 재작성 (fg #1d1d1f = ink, fg-subtle #7a7a7a = ink-muted-48, fg-muted #333333 = ink-muted-80)
        bare: 'text-fg dark:text-body-on-dark',
        outline: 'border border-hairline bg-canvas text-fg-subtle dark:border-fg-muted dark:bg-surface-tile-1 dark:text-body-muted',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle', variant: 'bare' },
  },
)

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>,
  VariantProps<typeof iconButtonCva> {
  // 필수 — 아이콘 전용 버튼은 접근 가능한 이름이 없으면 안 된다. 타입 레벨로 강제한다.
  label: string
}

export function IconButton({ size, shape, variant, label, className, type, ...props }: IconButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      aria-label={label}
      className={cn(iconButtonCva({ size, shape, variant }), className)}
      {...props}
    />
  )
}
