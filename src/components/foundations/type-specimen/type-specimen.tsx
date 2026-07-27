import type { TypeStyle } from '@/lib/foundations'

// 각 타입 스타일을 실제 렌더 견본 + 4축 속성으로 보여준다.
// 견본은 토큰 값을 인라인 style로 직접 적용한다 — `text-${name}` 동적 클래스는
// Tailwind 정적 스캔에 안 걸려 생성되지 않을 수 있고, 인라인이 원천 값과 정확히 일치한다.
export function TypeSpecimen({ style }: { style: TypeStyle }) {
  return (
    <div className="flex flex-col gap-2 border-b border-hairline py-4">
      <p
        className="text-fg"
        style={{
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
        }}
      >
        {style.name}
        {' '}
        — 다람쥐 헌 쳇바퀴에 타고파
      </p>
      <dl className="flex flex-wrap gap-x-4 gap-y-1 text-label-sm text-fg-subtle">
        <Prop label="size" value={style.fontSize} />
        <Prop label="weight" value={String(style.fontWeight)} />
        <Prop label="line-height" value={String(style.lineHeight)} />
        <Prop label="letter-spacing" value={style.letterSpacing} />
      </dl>
    </div>
  )
}

function Prop({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex gap-1">
      <dt>{label}</dt>
      <dd className="font-semibold text-fg-muted">{value}</dd>
    </div>
  )
}
