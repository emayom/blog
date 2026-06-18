import type { ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/mdx/code-block'

export const mdxComponents: MDXComponents = {
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a
      className="text-primary underline underline-offset-2 decoration-1 hover:decoration-2 dark:text-primary-on-dark"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="text-ink dark:text-body-on-dark font-semibold text-[34px] leading-[1.47] tracking-[-0.374px] mt-[48px] mb-[17px] scroll-mt-[80px]"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="text-ink dark:text-body-on-dark font-semibold text-[21px] leading-[1.19] tracking-[0.231px] mt-[32px] mb-[12px] scroll-mt-[80px]"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p
      className="text-body dark:text-body-on-dark text-[17px] leading-[1.47] tracking-[-0.374px] my-[17px]"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-primary dark:border-primary-on-dark bg-canvas-parchment dark:bg-surface-tile-2 pl-[24px] pr-[17px] py-[12px] my-[24px] text-ink-muted-80 dark:text-body-muted"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr
      className="border-0 border-t border-hairline dark:border-ink-muted-80 my-[48px]"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="list-disc pl-[24px] my-[17px] marker:text-ink-muted-48"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="list-decimal pl-[24px] my-[17px] marker:text-ink-muted-48"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li
      className="text-body dark:text-body-on-dark text-[17px] leading-[1.47] my-[8px]"
      {...props}
    />
  ),
  pre: CodeBlock,
}
