'use client'

import { EmptyState } from '@/components/ui/empty-state'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-12">
      <EmptyState
        variant="error"
        title="글을 불러오지 못했습니다."
        action={{ label: '다시 시도', onClick: reset }}
      />
    </main>
  )
}
