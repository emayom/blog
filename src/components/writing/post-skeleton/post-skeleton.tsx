import { Skeleton } from '@/components/ui/skeleton'

export function PostSkeleton() {
  return (
    <div className="mx-auto max-w-[680px] px-6 py-12" aria-hidden="true">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="mt-3 h-10 w-2/3" />
      <Skeleton className="mt-8 h-3 w-1/4" />
      <div className="mt-12 flex flex-col gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-3" style={{ width: i % 3 === 2 ? '70%' : '100%' }} />
        ))}
      </div>
    </div>
  )
}
