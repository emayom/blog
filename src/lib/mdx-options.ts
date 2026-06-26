import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { PluggableList } from 'unified'

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark' },
  // 토큰 색만 shiki 변수로 받고, 코드 블록 배경/보더는 globals.css 디자인 토큰으로 제어
  keepBackground: false,
}

export const remarkPlugins: PluggableList = [remarkGfm]

export const rehypePlugins: PluggableList = [
  // slug는 헤딩 id 부여를 위해 pretty-code(코드 변환) 앞에서 실행
  rehypeSlug,
  [rehypePrettyCode, rehypePrettyCodeOptions],
]
