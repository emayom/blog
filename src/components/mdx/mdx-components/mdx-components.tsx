import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactElement } from 'react'
import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/mdx/code-block'
import { HeadingAnchor } from '@/components/mdx/heading-anchor'
import { Callout } from '@/components/mdx/callout'
import { CodeGroup } from '@/components/mdx/code-group'
import { Collapse } from '@/components/mdx/collapse'
import { FileTree } from '@/components/mdx/file-tree'
import { MdxImage } from '@/components/mdx/image'
import { Step, Steps } from '@/components/mdx/steps'
import { Kbd } from '@/components/ui/kbd'
import { Heading } from '@/components/ui/heading'

export const mdxComponents: MDXComponents = {
  a: ({ className, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (className?.includes('heading-anchor')) {
      return <HeadingAnchor href={props.href} {...props}>{children}</HeadingAnchor>
    }
    const isExternal = typeof props.href === 'string' && props.href.startsWith('http')
    return (
      <a
        className="text-primary underline underline-offset-2 decoration-1 hover:decoration-2"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mb-0.5 ml-0.5 inline opacity-60"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        )}
      </a>
    )
  },
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <Heading as="h2" size="md" className="group relative mt-xxl mb-md scroll-mt-[80px]" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <Heading as="h3" size="sm" className="group relative mt-xl mb-sm scroll-mt-[80px]" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="group relative text-fg text-title-md mt-lg mb-xs scroll-mt-[80px]"
      {...props}
    />
  ),
  h5: (props: ComponentPropsWithoutRef<'h5'>) => (
    <h5
      className="group relative text-fg text-title-sm mt-5 mb-xs scroll-mt-[80px]"
      {...props}
    />
  ),
  h6: (props: ComponentPropsWithoutRef<'h6'>) => (
    <h6
      className="group relative text-fg-muted text-title-sm mt-4 mb-xs scroll-mt-[80px]"
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => {
    // rehype-pretty-code는 펜스드 블록 code에 data-language를 항상 주입
    if ('data-language' in props) return <code className={className} {...props} />
    return (
      <code
        className="rounded-xs border border-hairline bg-canvas-parchment px-0.5 py-0.5 font-mono"
        {...props}
      />
    )
  },
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => {
    // MDX는 standalone 이미지를 <p>로 감싸는데, img 컴포넌트가 <figure>를 반환하면
    // <p><figure> 구조가 되어 hydration 에러 발생 → figure 단독 자식이면 <p> 제거
    const arr = Children.toArray(children)
    if (arr.length === 1 && isValidElement(arr[0]) && (arr[0] as ReactElement).type === MdxImage) {
      return <>{children}</>
    }
    return (
      <p
        className="text-fg text-prose-md sm:text-prose-lg my-md"
        {...props}
      >
        {children}
      </p>
    )
  },
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-primary dark:border-primary-on-dark bg-canvas-parchment pl-lg pr-md py-sm my-lg text-fg-muted [&>p]:my-0"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr
      className="border-0 border-t border-hairline my-xxl"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="list-disc pl-lg my-md marker:text-fg-subtle"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="list-decimal pl-lg my-md marker:text-fg-subtle"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li
      className="text-fg text-prose-md sm:text-prose-lg my-xs"
      {...props}
    />
  ),
  img: MdxImage,
  pre: CodeBlock,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-lg overflow-x-auto">
      <table
        className="w-full border-collapse text-body-md sm:text-body-lg"
        {...props}
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead
      className="bg-canvas-parchment"
      {...props}
    />
  ),
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => <tbody {...props} />,
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr
      className="border-b border-hairline last:border-0"
      {...props}
    />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-sm py-2.5 text-left font-semibold text-fg"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="px-sm py-2.5 text-fg"
      {...props}
    />
  ),
  Callout,
  CodeGroup,
  Collapse,
  FileTree,
  Steps,
  Step,
  Kbd,
}
