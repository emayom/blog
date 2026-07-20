import { compileMDX } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { rehypePlugins } from '@/lib/mdx-options'

interface MdxContentProps {
  source: string
}

// 원본 MDX 문자열을 공유 컴포넌트 맵/플러그인으로 컴파일해 렌더하는 Server Component 래퍼
export async function MdxContent({ source }: MdxContentProps) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins },
    },
  })

  return content
}
