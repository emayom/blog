// Do/Don't 비교. 팔레트에 초록·빨강이 없어(단일 블루 원칙) 색 대신 권장/지양 라벨로 구분한다.
interface DoDontProps {
  principle: string
  detail: string
  do: string
  dont: string
}

export function DoDont({ principle, detail, do: doText, dont }: DoDontProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-hairline py-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-title-md text-fg">{principle}</h3>
        <p className="text-body-md text-fg-muted">{detail}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Example label="권장" text={doText} strong />
        <Example label="지양" text={dont} />
      </div>
    </div>
  )
}

function Example({ label, text, strong = false }: { label: string, text: string, strong?: boolean }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-hairline p-3">
      <span className={`text-label-sm font-semibold ${strong ? 'text-primary' : 'text-fg-subtle'}`}>
        {label}
      </span>
      <p className="text-body-md text-fg">{text}</p>
    </div>
  )
}
