import type { TocItem } from '@/types/post'
import { DoDont } from '@/components/foundations/do-dont'
import { PageShell } from '@/components/foundations/page-shell'

// 원칙과 예시는 docs/editorial-guide.md의 보이스·문체 규칙에서 옮겼다.
// 문서가 원천이고, 이 페이지는 그 규칙을 예시로 보여준다.
const principles = [
  {
    principle: '존댓말·1인칭',
    detail: '"~합니다 / ~했습니다"를 일관되게. 반말·구어체를 섞지 않는다.',
    do: 'useState로 상태를 관리했습니다.',
    dont: 'useState로 상태 관리함. 이게 편하더라고~',
  },
  {
    principle: '능동태·단문',
    detail: '능동태를 우선하고, 한 문장에 한 메시지만 담는다. 긴 문장은 끊는다.',
    do: 'React가 컴포넌트를 다시 렌더한다.',
    dont: '컴포넌트는 React에 의해 다시 렌더링되게 되어지는 것이다.',
  },
  {
    principle: '용어 통일',
    detail: '한 글 안에서 한 표기로. 한글↔원어를 섞지 않고, 코드 개념은 원어+백틱.',
    do: '컴포넌트 · 렌더링 · `props`',
    dont: '콤포넌트 · 랜더링 · 프롭스',
  },
  {
    principle: '담백하고 정확하게',
    detail: '과장·낚시·단정을 피한다. 모르는 건 모른다고, 미검증은 미검증이라고 쓴다.',
    do: '아직 확인하지 못했지만, 원인은 리렌더로 추정됩니다.',
    dont: '이것이 모든 성능 문제의 확실한 해결책입니다.',
  },
  {
    principle: '링크 텍스트는 목적이 드러나게',
    detail: '"여기" 같은 지시어 대신 링크가 향하는 곳을 밝힌다.',
    do: '설정은 [Next.js 캐싱 문서](#)를 참고하세요.',
    dont: '자세한 내용은 [여기](#)를 클릭하세요.',
  },
]

const toc: TocItem[] = [{ id: 'principles', text: 'Principles', depth: 2 }]

export default function WritingFoundations() {
  return (
    <PageShell toc={toc}>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-display-md text-fg">Writing</h1>
          <p className="text-body-lg text-fg-muted">
            글의 보이스·문체 원칙. 친근하지만 정확하게 —
            {' '}
            <code className="text-body-md">docs/editorial-guide.md</code>
            가 원천이다.
          </p>
        </header>

        <section className="flex flex-col">
          <h2 id="principles" className="scroll-mt-[70px] text-title-lg text-fg">Principles</h2>
          {principles.map(p => (
            <DoDont key={p.principle} {...p} />
          ))}
        </section>
      </div>
    </PageShell>
  )
}
