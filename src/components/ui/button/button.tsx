import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { textStyles } from '@/components/ui/text'

const buttonCva = cva(
  'inline-flex items-center justify-center rounded transition disabled:opacity-40 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus',
  {
    variants: {
      variant: {
        // primary 타이포는 body-lg 텍스트 스타일을 합성한다 (단일 원천: textStyles)
        primary: `rounded-pill bg-primary text-on-primary ${textStyles['body-lg']}`,
        outline: 'border border-hairline bg-canvas text-fg hover:border-fg-subtle',
        ghost: 'text-fg hover:text-primary',
      },
      size: {
        sm: 'px-sm py-xxs text-label-md',
        md: 'px-md py-xs text-label-md',
      },
    },
    compoundVariants: [
      // size의 text-label-md·패딩이 primary의 body 타이포·pill 패딩과 같은 그룹에서 충돌한다.
      // tailwind-merge는 뒤에 오는 클래스를 남기므로 compound에서 pill 패딩과 body 축을 다시 이긴다.
      { variant: 'primary', size: 'sm', class: `px-lg py-sm ${textStyles['body-lg']}` },
      { variant: 'primary', size: 'md', class: `px-lg py-sm ${textStyles['body-lg']}` },
    ],
    defaultVariants: { variant: 'outline', size: 'sm' },
  },
)

type ButtonVariantProps = VariantProps<typeof buttonCva> & { className?: string }

// cva 원시 출력은 충돌 클래스(text-label-md↔body 축 등)를 그대로 담고 있어 승자가 CSS 선언 순서에
// 좌우된다. 호출부가 cn을 잊지 못하도록 여기서 병합까지 끝낸 문자열을 반환한다.
export function buttonVariants({ className, ...opts }: ButtonVariantProps = {}) {
  return cn(buttonCva(opts), className)
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonCva> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />
}
