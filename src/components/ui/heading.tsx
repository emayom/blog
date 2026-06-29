import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const headingVariants = cva('font-semibold text-ink dark:text-body-on-dark', {
  variants: {
    size: {
      hero: 'font-display text-[34px] sm:text-[40px] lg:text-[56px] leading-[1.07] tracking-[-0.28px] text-balance',
      xl: 'font-display text-[40px] leading-[1.1] tracking-[-0.374px]',
      lg: 'font-display text-[34px] leading-[1.47] tracking-[-0.374px]',
      md: 'text-[28px] leading-[1.1] tracking-[-0.2px]',
      sm: 'font-display text-[21px] leading-[1.19] tracking-[0.231px]',
    },
  },
  defaultVariants: { size: 'md' },
})

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: HeadingTag
}

export function Heading({ as: Tag = 'h2', size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}
