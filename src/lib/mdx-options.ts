import rehypeAutolinkHeadings from 'rehype-autolink-headings'
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
  // slug → autolink → pretty-code 순서 고정 (id 부여 후 앵커 삽입, 코드 변환은 마지막)
  rehypeSlug,
  [rehypeAutolinkHeadings, {
    behavior: 'append',
    properties: { 'className': ['heading-anchor'], 'aria-hidden': 'true', 'tabIndex': -1 },
    content: {
      type: 'element',
      tagName: 'svg',
      properties: {
        'xmlns': 'http://www.w3.org/2000/svg',
        'width': 16,
        'height': 16,
        'viewBox': '0 0 24 24',
        'fill': 'none',
        'stroke': 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      children: [
        {
          type: 'element',
          tagName: 'path',
          properties: { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' },
          children: [],
        },
        {
          type: 'element',
          tagName: 'path',
          properties: { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' },
          children: [],
        },
      ],
    },
  }],
  [rehypePrettyCode, rehypePrettyCodeOptions],
]
