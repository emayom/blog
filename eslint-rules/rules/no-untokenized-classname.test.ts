import { RuleTester } from 'eslint'
import rule from './no-untokenized-classname.ts'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

ruleTester.run('no-untokenized-classname', rule, {
  valid: [
    // 토큰을 쓰면 통과
    '<div className="bg-canvas text-fg rounded-lg" />',
    // 대응 토큰이 없는 임의값은 정당 — 건드리지 않는다
    '<div className="max-w-[40ch] rotate-[9deg] min-h-[150px]" />',
    '<div className="text-[color-mix(in_srgb,var(--color-primary),white_22%)]" />',
    '<div className="translate-x-[calc(-50%_-_var(--spacing)*2.4)]" />',
    // 클래스 문자열이 아닌 곳은 무시
    'const msg = "text-[13px]"',
    'other("bg-neutral-200")',
    // ink가 부분 문자열로 들어간 클래스는 오탐 금지
    '<div className="bg-pink-alt text-inkling" />',
  ],

  invalid: [
    {
      code: '<div className="bg-neutral-200 dark:bg-neutral-700" />',
      errors: 2,
    },
    {
      code: '<div className="text-[13px] tracking-[-0.374px] leading-[1.47]" />',
      errors: 3,
    },
    {
      // radius 임의값은 토큰으로 autofix
      code: '<div className="rounded-[18px] rounded-[11px]" />',
      output: '<div className="rounded-lg rounded-md" />',
      errors: 2,
    },
    {
      // 색 구명칭 개명 — 접두사·variant·투명도 보존
      code: '<div className="text-ink dark:border-ink-muted-80 bg-ink-muted-48/50" />',
      output: '<div className="text-fg dark:border-fg-muted bg-fg-subtle/50" />',
      errors: 3,
    },
    {
      // cn() 인자
      code: 'cn("text-ink", cond && "rounded-[18px]")',
      output: 'cn("text-fg", cond && "rounded-lg")',
      errors: 2,
    },
    {
      // cva() variants 중첩 객체 — className 속성도 cn() 인자도 아닌 사각지대
      code: 'cva("base", { variants: { v: { a: "text-ink", b: ["bg-neutral-200"] } } })',
      output: 'cva("base", { variants: { v: { a: "text-fg", b: ["bg-neutral-200"] } } })',
      errors: 2,
    },
    {
      // 템플릿 리터럴 quasi도 치환한다 (구분자 1글자라 오프셋 계산식이 리터럴과 같다)
      code: 'cn(`rounded-[18px] text-ink ${tileLift} border-ink-muted-80`)',
      output: 'cn(`rounded-lg text-fg ${tileLift} border-fg-muted`)',
      errors: 3,
    },
    {
      // 보간에 맞닿은 토큰은 클래스 일부만 보는 것일 수 있어 건드리지 않는다
      code: 'cn(`text-ink rounded-[18px]${suffix}`)',
      output: 'cn(`text-fg rounded-[18px]${suffix}`)',
      errors: 1,
    },
    {
      // 테스트의 클래스 단언도 따라가야 개명이 테스트를 깨뜨리지 않는다
      code: 'expect(el).toHaveClass("border-hairline", "text-ink")',
      output: 'expect(el).toHaveClass("border-hairline", "text-fg")',
      errors: 1,
    },
    {
      // 모듈 상수로 뽑은 클래스 — cn()으로 감싸지 않아도 보인다
      code: 'const labelClass = "text-ink-muted-48 rounded-[18px]"',
      output: 'const labelClass = "text-fg-subtle rounded-lg"',
      errors: 2,
    },
    {
      // className 외의 클래스 prop
      code: '<NavLink activeClassName="text-ink" />',
      output: '<NavLink activeClassName="text-fg" />',
      errors: 1,
    },
  ],
})
