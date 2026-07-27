import type { DimensionToken } from '@/lib/foundations'

// spacing: 값만큼 너비 막대. radius: 값만큼 둥근 사각형. 값이 토큰마다 달라 인라인 style.
export function ScaleBar({ token, kind }: { token: DimensionToken, kind: 'spacing' | 'radius' }) {
  return (
    <div className="flex items-center gap-4 border-b border-hairline py-3">
      <div className="w-24 shrink-0">
        <span className="text-label-md font-semibold text-fg">{token.name}</span>
        <span className="ml-2 text-label-sm text-fg-subtle">{token.value}</span>
      </div>
      {kind === 'spacing'
        ? (
            <div
              className="h-4 rounded-xs bg-primary"
              style={{ width: token.value }}
            />
          )
        : (
            <div
              className="size-14 border border-hairline bg-canvas-parchment"
              style={{ borderRadius: token.value }}
            />
          )}
    </div>
  )
}
