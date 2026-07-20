function CardSkeleton() {
  return (
    <div className="rounded-lg border border-hairline px-5 py-md dark:border-ink-muted-80">
      <div className="skeleton-shimmer h-3 w-1/3 rounded-[5px]" />
      <div className="skeleton-shimmer mt-3 h-5 w-4/5 rounded-[5px]" />
      <div className="skeleton-shimmer mt-3 h-3 w-full rounded-[5px]" />
      <div className="skeleton-shimmer mt-2 h-3 w-5/6 rounded-[5px]" />
    </div>
  )
}

export function PostListSkeleton() {
  return (
    <div className="flex flex-col gap-3.5" aria-hidden="true">
      {Array.from({ length: 4 }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
