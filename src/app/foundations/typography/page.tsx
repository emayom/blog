import type { AxisValue } from '@/lib/foundations'
import type { TocItem } from '@/types/post'
import { getTypeAxes, getTypeStyles } from '@/lib/foundations'
import { TypeSpecimen } from '@/components/foundations/type-specimen'
import { PageShell } from '@/components/foundations/page-shell'

const toc: TocItem[] = [
  { id: 'styles', text: 'Styles', depth: 2 },
  { id: 'axes', text: 'Axes', depth: 2 },
]

export default function TypographyFoundations() {
  const styles = getTypeStyles()
  const axes = getTypeAxes()

  return (
    <PageShell toc={toc}>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-display-md text-fg">Typography</h1>
          <p className="text-body-lg text-fg-muted">
            텍스트 스타일은 DTCG typography composite 토큰이다. 크기·굵기·행간·자간 4축을
            하나로 묶어, 컴포넌트는 스타일 하나(`text-body-lg`)만 쓴다. 폰트 패밀리는
            next/font 런타임 변수라 composite에 넣지 않는다.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 id="styles" className="scroll-mt-[70px] text-title-lg text-fg">Styles</h2>
          <p className="text-body-md text-fg-subtle">
            실제 코드에서 쓰는 단위. 각 스타일의 렌더 견본과 4축 값.
          </p>
          <div className="flex flex-col">
            {styles.map(style => (
              <TypeSpecimen key={style.name} style={style} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 id="axes" className="scroll-mt-[70px] text-title-lg text-fg">Axes</h2>
          <p className="text-body-md text-fg-subtle">
            축은 별도 토큰이 아니라 composite 안에 정의된다. 시스템이 실제로 쓰는 값과 그 값을 쓰는 스타일.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <AxisTable title="Font Size" values={axes.fontSize} />
            <AxisTable title="Line Height" values={axes.lineHeight} />
            <AxisTable title="Font Weight" values={axes.fontWeight} />
            <AxisTable title="Letter Spacing" values={axes.letterSpacing} />
          </div>
        </section>
      </div>
    </PageShell>
  )
}

function AxisTable({ title, values }: { title: string, values: AxisValue[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-title-sm text-fg-muted">{title}</h3>
      <dl className="flex flex-col divide-y divide-hairline border-t border-hairline">
        {values.map(v => (
          <div key={v.value} className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-label-md font-semibold text-fg">{v.value}</dt>
            <dd className="text-label-sm text-fg-subtle text-right">{v.usedBy.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
