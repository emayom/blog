import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { Heading } from '@/components/ui/heading'

export function Hero() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Heading as="h1" size="hero">
        {`${siteConfig.name}의 작업 노트`}
      </Heading>
      <p className="mt-6 max-w-[42ch] text-[17px] sm:text-[21px] leading-[1.47] text-ink-muted-80 dark:text-body-muted">
        개발하며 배운 것, 읽고 생각한 것들을 차곡차곡 기록합니다. 어제보다 조금 더
        나은 코드를 위한 흔적들.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/writing"
          className="inline-flex items-center rounded-full bg-primary px-[22px] py-[11px] text-[17px] leading-none text-on-primary transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
        >
          글 보러가기
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center rounded-full border border-primary px-[22px] py-[11px] text-[17px] leading-none text-primary transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:border-primary-on-dark dark:text-primary-on-dark"
        >
          소개
        </Link>
      </div>
    </section>
  )
}
