import type { TocItem } from '@/types/post'
import { getPaletteGroups, getRoleColors } from '@/lib/foundations'
import { ColorSwatch, PaletteScale } from '@/components/foundations/color-swatch'
import { PageShell } from '@/components/foundations/page-shell'

const toc: TocItem[] = [
  { id: 'role', text: 'Role', depth: 2 },
  { id: 'palette', text: 'Palette', depth: 2 },
]

export default function ColorFoundations() {
  const roles = getRoleColors()
  const palettes = getPaletteGroups()

  return (
    <PageShell toc={toc}>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-display-md text-fg">Color</h1>
          <p className="text-body-lg text-fg-muted">
            Role은 역할별 semantic 토큰(테마에 따라 값이 바뀜), Palette는 원시 스케일이다.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 id="role" className="scroll-mt-[70px] text-title-lg text-fg">Role</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map(role => (
              <ColorSwatch key={role.name} name={role.name} sourceRef={role.sourceRef} light={role.light} dark={role.dark} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 id="palette" className="scroll-mt-[70px] text-title-lg text-fg">Palette</h2>
          <div className="flex flex-col gap-6">
            {palettes.map(group => (
              <PaletteScale key={group.name} group={group} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
