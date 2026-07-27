import type { TocItem } from '@/types/post'
import { resolveColorToken } from '@/lib/foundations'
import { PageShell } from '@/components/foundations/page-shell'

// surface 계층을 라이트/다크로 나란히. JSON에서 해석한 hex를 명시적으로 칠해
// 페이지 테마와 무관하게 두 테마를 정확히 보여준다.
const SURFACES = [
  { name: 'surface-base', role: '페이지 배경' },
  { name: 'canvas', role: '카드 (raised)' },
  { name: 'canvas-parchment', role: '채움 (sunken)' },
  { name: 'surface-pearl', role: 'ghost 표면' },
]

const toc: TocItem[] = [{ id: 'surfaces', text: 'Surfaces', depth: 2 }]

export default function ElevationFoundations() {
  return (
    <PageShell toc={toc}>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-display-md text-fg">Elevation</h1>
          <p className="text-body-lg text-fg-muted">
            표면 계층. 라이트는 흰/회색, 다크는 tile 단계로 elevation을 표현한다.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 id="surfaces" className="scroll-mt-[70px] text-title-lg text-fg">Surfaces</h2>
          {SURFACES.map((surface) => {
            const { light, dark } = resolveColorToken(surface.name)
            return (
              <div key={surface.name} className="flex items-center gap-4">
                <div className="w-40 shrink-0">
                  <span className="text-label-md font-semibold text-fg">{surface.name}</span>
                  <span className="block text-label-sm text-fg-subtle">{surface.role}</span>
                </div>
                <SurfaceChip label="Light" value={light} />
                <SurfaceChip label="Dark" value={dark} />
              </div>
            )
          })}
        </section>
      </div>
    </PageShell>
  )
}

function SurfaceChip({ label, value }: { label: string, value: string }) {
  return (
    <div
      className="flex h-16 flex-1 items-center justify-center rounded-md border border-hairline"
      style={{ backgroundColor: value }}
    >
      <span className="rounded-xs bg-canvas/70 px-1.5 py-0.5 text-label-sm text-fg">
        {label}
        {' '}
        {value}
      </span>
    </div>
  )
}
