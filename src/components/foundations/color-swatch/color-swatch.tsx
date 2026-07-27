import type { PaletteGroup } from '@/lib/foundations'

interface ColorSwatchProps {
  name: string
  sourceRef: string
  light: string
  dark: string
}

// 라이트/다크 hex를 JSON에서 해석해 명시적으로 칠한다 — CSS 변수 cascade에 기대면
// 페이지 테마에 따라 Light 칩까지 다크로 물들어 비교가 무너진다.
export function ColorSwatch({ name, sourceRef, light, dark }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-hairline p-3">
      <div className="flex gap-2">
        <Chip label="Light" value={light} />
        <Chip label="Dark" value={dark} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-label-md font-semibold text-fg">{name}</span>
        <span className="text-label-sm text-fg-subtle">{sourceRef}</span>
        {light !== dark && <span className="text-label-sm text-fg-subtle">라이트·다크 다름</span>}
      </div>
    </div>
  )
}

function Chip({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <div
        className="h-12 w-full rounded-sm border border-hairline"
        style={{ backgroundColor: value }}
      />
      <span className="text-label-sm text-fg-subtle">{label}</span>
    </div>
  )
}

// Palette(base)는 원시 스케일 — 그룹당 분리된 블록을 가로로 나열하고
// step 번호를 각 블록 위에 헤더로 둔다. hex는 hover 툴팁으로. (seed-design 방식)
export function PaletteScale({ group }: { group: PaletteGroup }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-title-sm capitalize text-fg">{group.name}</h3>
      <div className="flex gap-2">
        {group.swatches.map(sw => (
          <div key={sw.step} className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-label-sm text-fg-subtle">{sw.step}</span>
            <div
              className="h-16 rounded-sm border border-hairline"
              style={{ backgroundColor: sw.value }}
              title={sw.value}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
