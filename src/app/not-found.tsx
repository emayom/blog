import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-32 text-center sm:px-6">
      <h1 className="text-[40px] font-semibold text-ink dark:text-body-on-dark">
        404
      </h1>
      <Text className="mt-4 text-fg-subtle dark:text-body-muted">
        요청하신 페이지를 찾을 수 없습니다.
      </Text>
      <Link
        href="/"
        className={buttonVariants({ variant: 'primary', className: 'mt-8' })}
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
