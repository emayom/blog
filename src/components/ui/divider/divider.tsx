import { cn } from '@/lib/cn'

interface DividerProps {
  className?: string
}

// 세로 여백은 맥락마다 달라(my-8·my-12) 호출부 className 소관.
export function Divider({ className }: DividerProps) {
  return <hr className={cn('border-0 border-t border-hairline dark:border-fg-muted', className)} />
}
