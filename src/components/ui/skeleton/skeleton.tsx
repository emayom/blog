import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

// shimmer 애니메이션·표면색·radius는 컴포넌트가 소유하고, 크기(h/w)는 호출부 className.
// skeleton-shimmer 규칙은 globals.css에 정의돼 있다.
export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn('skeleton-shimmer rounded-xs', className)} style={style} aria-hidden="true" />
}
