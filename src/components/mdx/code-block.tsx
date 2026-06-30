import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { CopyButton } from '@/components/mdx/copy-button'

// React 트리에서 평문 텍스트만 재귀 추출 (rehype-pretty-code의 span 중첩 구조 대응)
function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children)
  }
  return ''
}

export function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const codeText = Children.toArray(children).map(extractText).join('')

  return (
    <div className="relative">
      <CopyButton code={codeText} />
      <pre {...props}>{children}</pre>
    </div>
  )
}
