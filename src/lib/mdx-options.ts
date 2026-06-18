import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import type { PluggableList } from 'unified'

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark' },
  // 토큰 색만 shiki 변수로 받고, 코드 블록 배경/보더는 globals.css 디자인 토큰으로 제어
  keepBackground: false,
}

export const rehypePlugins: PluggableList = [
  [rehypePrettyCode, rehypePrettyCodeOptions],
]
