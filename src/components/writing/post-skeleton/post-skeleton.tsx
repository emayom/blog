export function PostSkeleton() {
  return (
    <div className="mx-auto max-w-[680px] px-6 py-12" aria-hidden="true">
      <div className="skeleton-shimmer h-10 w-full rounded-[5px]" />
      <div className="skeleton-shimmer mt-3 h-10 w-2/3 rounded-[5px]" />
      <div className="skeleton-shimmer mt-8 h-3 w-1/4 rounded-[5px]" />
      <div className="mt-12 flex flex-col gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="skeleton-shimmer h-3 rounded-[5px]"
            style={{ width: i % 3 === 2 ? '70%' : '100%' }}
          />
        ))}
      </div>
    </div>
  )
}
