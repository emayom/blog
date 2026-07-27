import type { TocItem } from '@/types/post'
import { getSpacingTokens } from '@/lib/foundations'
import { ScaleBar } from '@/components/foundations/scale-bar'
import { PageShell } from '@/components/foundations/page-shell'

const toc: TocItem[] = [{ id: 'scale', text: 'Scale', depth: 2 }]

export default function SpacingFoundations() {
  const tokens = getSpacingTokens()

  return (
    <PageShell toc={toc}>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-display-md text-fg">Spacing</h1>
          <p className="text-body-lg text-fg-muted">간격 스케일. 막대 길이가 실제 값이다.</p>
        </header>

        <section className="flex flex-col gap-2">
          <h2 id="scale" className="scroll-mt-[70px] text-title-lg text-fg">Scale</h2>
          <div className="flex flex-col">
            {tokens.map(token => (
              <ScaleBar key={token.name} token={token} kind="spacing" />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
