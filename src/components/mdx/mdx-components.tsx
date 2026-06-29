import type { ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/mdx/code-block'
import { HeadingAnchor } from '@/components/mdx/heading-anchor'

export const mdxComponents: MDXComponents = {
  a: ({ className, ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (className?.includes('heading-anchor')) {
      return <HeadingAnchor href={props.href} {...props} />
    }
    return (
      <a
        className="text-primary underline underline-offset-2 decoration-1 hover:decoration-2 dark:text-primary-on-dark"
        {...props}
      />
    )
  },
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="group relative text-ink dark:text-body-on-dark font-semibold text-[34px] leading-[1.47] tracking-[-0.374px] mt-xxl mb-md scroll-mt-[80px]"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="group relative text-ink dark:text-body-on-dark font-semibold text-[21px] leading-[1.19] tracking-[0.231px] mt-xl mb-sm scroll-mt-[80px]"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="group relative text-ink dark:text-body-on-dark font-semibold text-[19px] leading-[1.3] tracking-[-0.374px] mt-lg mb-xs scroll-mt-[80px]"
      {...props}
    />
  ),
  h5: (props: ComponentPropsWithoutRef<'h5'>) => (
    <h5
      className="group relative text-ink dark:text-body-on-dark font-semibold text-[17px] leading-[1.24] tracking-[-0.374px] mt-5 mb-xs scroll-mt-[80px]"
      {...props}
    />
  ),
  h6: (props: ComponentPropsWithoutRef<'h6'>) => (
    <h6
      className="group relative text-ink-muted-80 dark:text-body-muted font-semibold text-[15px] leading-[1.33] tracking-[-0.224px] mt-4 mb-xs scroll-mt-[80px]"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p
      className="text-body dark:text-body-on-dark text-[17px] leading-[1.47] tracking-[-0.374px] my-md"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-primary dark:border-primary-on-dark bg-canvas-parchment dark:bg-surface-tile-2 pl-lg pr-md py-sm my-lg text-ink-muted-80 dark:text-body-muted"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr
      className="border-0 border-t border-hairline dark:border-ink-muted-80 my-xxl"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="list-disc pl-lg my-md marker:text-ink-muted-48"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="list-decimal pl-lg my-md marker:text-ink-muted-48"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li
      className="text-body dark:text-body-on-dark text-[17px] leading-[1.47] my-xs"
      {...props}
    />
  ),
  pre: CodeBlock,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-lg overflow-x-auto">
      <table
        className="w-full border-collapse text-[15px]"
        {...props}
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead
      className="bg-canvas-parchment dark:bg-surface-tile-2"
      {...props}
    />
  ),
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => <tbody {...props} />,
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr
      className="border-b border-hairline dark:border-ink-muted-80 last:border-0"
      {...props}
    />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-sm py-[10px] text-left font-semibold text-ink dark:text-body-on-dark"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="px-sm py-[10px] text-body dark:text-body-on-dark"
      {...props}
    />
  ),
}
