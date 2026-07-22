import Link from 'next/link'

interface FolderCardProps {
  year: string
  count: number
}

export function FolderCard({ year, count }: FolderCardProps) {
  return (
    <Link
      href={`/archive/${year}`}
      className="group flex flex-col items-center gap-2.5 rounded-md pt-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
    >
      <span aria-hidden="true" className="relative h-[51px] w-16 shrink-0">
        {/* 뒷판 — macOS 폴더 실루엣(탭 포함) */}
        <svg
          viewBox="0 0 242.514 193.914"
          className="absolute inset-0 h-full w-full overflow-visible text-[color-mix(in_srgb,var(--color-primary-on-dark),white_22%)]"
        >
          <path
            d="M 96.856 0 L 121.156 24.3 L 218.457 24.3 C 225.074 24.3 230.735 26.655 235.453 31.373 C 240.171 36.091 242.522 41.748 242.514 48.357 L 242.514 169.857 C 242.514 176.475 240.162 182.136 235.453 186.853 C 230.744 191.571 225.083 193.922 218.457 193.914 L 24.057 193.914 C 17.439 193.914 11.783 191.563 7.073 186.853 C 2.437 182.217 0.082 176.659 0.002 170.167 L 0 169.857 L 0 24.057 C 0 17.44 2.355 11.783 7.073 7.073 C 11.717 2.437 17.271 0.082 23.748 0.002 L 24.057 0 Z"
            fill="currentColor"
            stroke="white"
            strokeWidth="0.5"
            strokeMiterlimit="10"
          />
        </svg>

        {/* 종이 시트 3장 — hover 시 솟아 부채처럼 펼쳐짐 */}
        <span className="absolute bottom-[6px] left-1/2 z-10 h-[35px] w-[38px] origin-bottom -translate-x-1/2 rounded-sm border border-hairline bg-white shadow-sm transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-4" />
        <span className="absolute bottom-[6px] left-1/2 z-10 h-8 w-[35px] origin-bottom -translate-x-1/2 rounded-sm border border-hairline bg-white shadow-sm transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-[13px] motion-safe:group-hover:-rotate-[9deg] motion-safe:group-hover:translate-x-[calc(-50%_-_var(--spacing)*2.4)]" />
        <span className="absolute bottom-[6px] left-1/2 z-10 h-8 w-[35px] origin-bottom -translate-x-1/2 rounded-sm border border-hairline bg-white shadow-sm transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-[13px] motion-safe:group-hover:rotate-[9deg] motion-safe:group-hover:translate-x-[calc(-50%_+_var(--spacing)*2.4)]" />

        {/* 앞 덮개 — hover 시 아래 기준점으로 앞으로 기울어짐 */}
        <span className="absolute inset-x-0 bottom-0 z-20 aspect-[243/170] origin-bottom border-[0.5px] border-white bg-primary-on-dark dark:border-[color-mix(in_srgb,var(--color-primary-on-dark),white_50%)] [background-image:linear-gradient(color-mix(in_srgb,var(--color-primary-on-dark),white_26%)_0%,var(--color-primary-on-dark)_100%)] [border-radius:9.87654%_/_14.1176%] [box-shadow:rgba(0,0,0,0.12)_0px_-1px_4px_0px] [transform:perspective(1200px)] transition-transform duration-300 ease-out will-change-transform motion-safe:group-hover:[transform:perspective(1200px)_rotateX(-30deg)]" />
      </span>

      <span className="text-center">
        <span className="block text-label-sm font-semibold text-fg dark:text-body-on-dark">
          {year}
        </span>
        <span className="mt-0.5 block text-xs text-fg-subtle dark:text-body-muted">
          {count}
          편
        </span>
      </span>
    </Link>
  )
}
