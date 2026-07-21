import { Skeleton } from '@/components/ui/skeleton'
import { PostListSkeleton } from '@/components/writing/post-list-skeleton'

export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Skeleton className="mb-7 h-10 w-24" />
      <PostListSkeleton />
    </main>
  )
}
