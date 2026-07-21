// 룰의 목적·감지 범위·예외 처리는 no-untokenized-classname.md 참조.

import type { Rule } from 'eslint'
import type { CallExpression, Literal, TemplateElement, VariableDeclarator } from 'estree'
import { COLOR_PROP, findReplacement } from '../util/replacements.ts'

const PALETTE = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'

/** 치환 대상이 아니어서 수동 판단이 필요한 금지 패턴. */
const FORBIDDEN = [
  {
    test: new RegExp(`^(${COLOR_PROP})-(${PALETTE})-(50|[1-9]00|950)$`),
    message: 'Use a semantic color token (--color-*) instead of the default Tailwind palette "{{cls}}".',
  },
  {
    // 대응 토큰이 없는 color-mix()·calc() 등은 제외하고 순수 치수값만 잡는다.
    test: /^text-\[[\d.]+(px|rem|em)\]$/,
    message: 'Use a typography token (e.g. text-body) instead of the arbitrary font-size "{{cls}}". If no token fits, define one first.',
  },
  {
    test: /^(tracking|leading)-\[/,
    message: '"{{cls}}" is an axis the composite typography tokens (text-*) already cover. Replace it with a single token.',
  },
  {
    test: /^rounded-\[/,
    message: 'Use a radius token (rounded-sm/md/lg/pill) instead of the arbitrary radius "{{cls}}".',
  },
]

// toHaveClass는 테스트가 클래스명을 단언하는 자리 — 여기를 빼면 개명 autofix가 테스트를 조용히 깨뜨린다.
const WRAPPERS = new Set(['cn', 'clsx', 'twMerge', 'cva', 'toHaveClass'])

/** className · activeClassName 등 클래스를 받는 prop. */
const CLASS_ATTR = /[Cc]lassName$/

/** linkClass · labelClass 등 클래스 문자열을 담는 변수 — 상수로 뽑은 클래스가 사각지대가 되지 않도록. */
const CLASS_VAR = /[Cc]lass(Name)?$/

/** ESTree는 range를 optional로 두지만 ESLint 파서는 항상 채워준다. */
type ClassNode = (Literal | TemplateElement) & { range: [number, number] }

/** JSX 노드는 ESTree 표준이 아닌 파서 확장이라, 실제로 읽는 만큼만 선언한다. */
interface JSXAttributeNode {
  name: { name?: string }
  value: unknown
}

/** variant 접두사(dark:, hover:, focus-visible: …)와 important 접두사를 벗겨 기본 클래스만 남긴다. */
function baseClass(token: string): string {
  const withoutVariants = token.slice(token.lastIndexOf(':') + 1)
  return withoutVariants.startsWith('!') ? withoutVariants.slice(1) : withoutVariants
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow utility classes that bypass design tokens',
      url: 'https://github.com/emayom/blog/blob/main/eslint-rules/rules/no-untokenized-classname.md',
    },
    fixable: 'code',
    schema: [],
    messages: {
      forbidden: '{{detail}}',
      replaceable: 'Replace "{{cls}}" with the "{{replacement}}" token.',
    },
  },

  create(context) {
    const seen = new Set<object>()
    const source = context.sourceCode.getText()

    function checkString(node: ClassNode, value: string) {
      // 치환은 range 내 오프셋으로 한다. Literal은 이스케이프가 없을 때만 오프셋이 정확하고,
      // TemplateElement의 raw는 소스 원문 그대로라 항상 정확하다.
      // 두 노드 모두 시작 구분자가 1글자(따옴표 · ` · })라 시작 오프셋 계산식이 같다.
      const isTemplate = node.type === 'TemplateElement'
      const fixable = isTemplate || (node.type === 'Literal' && node.raw?.slice(1, -1) === value)

      for (const match of value.matchAll(/\S+/g)) {
        const token = match[0]
        const cls = baseClass(token)

        // 보간(`${…}`)에 맞닿은 토큰은 클래스의 일부만 보고 있는 것일 수 있다 — 건드리지 않는다.
        if (node.type === 'TemplateElement') {
          const abutsEnd = !node.tail && match.index + token.length === value.length
          const abutsStart = source[node.range[0]] === '}' && match.index === 0
          if (abutsEnd || abutsStart) continue
        }
        const replacement = findReplacement(cls)

        if (replacement) {
          const start = node.range[0] + 1 + match.index + (token.length - cls.length)
          context.report({
            node: node as unknown as Rule.Node,
            messageId: 'replaceable',
            data: { cls, replacement },
            fix: fixable
              ? fixer => fixer.replaceTextRange([start, start + cls.length], replacement)
              : null,
          })
          continue
        }

        const hit = FORBIDDEN.find(f => f.test.test(cls))
        if (hit) {
          context.report({
            node: node as unknown as Rule.Node,
            messageId: 'forbidden',
            data: { detail: hit.message.replace('{{cls}}', cls) },
          })
        }
      }
    }

    /** 노드 타입을 열거하는 대신 자식 노드를 통째로 훑는다 — 중첩 객체·배열·조건식을 전부 덮는다. */
    function walk(value: unknown): void {
      if (!value || typeof value !== 'object') return

      const node = value as Record<string, unknown>
      if (typeof node.type !== 'string' || seen.has(node)) return
      seen.add(node)

      if (node.type === 'Literal' && typeof node.value === 'string') {
        checkString(node as unknown as ClassNode, node.value)
        return
      }
      if (node.type === 'TemplateElement') {
        const { raw } = node.value as { raw: string }
        checkString(node as unknown as ClassNode, raw)
        return
      }

      for (const [key, child] of Object.entries(node)) {
        if (key === 'parent' || key === 'key') continue
        if (Array.isArray(child)) child.forEach(walk)
        else walk(child)
      }
    }

    return {
      JSXAttribute(node: unknown) {
        const attr = node as JSXAttributeNode
        if (!attr.name.name || !CLASS_ATTR.test(attr.name.name) || !attr.value) return
        walk(attr.value)
      },
      VariableDeclarator(node: VariableDeclarator) {
        if (node.id.type !== 'Identifier' || !CLASS_VAR.test(node.id.name)) return
        walk(node.init)
      },
      CallExpression(node: CallExpression) {
        const { callee } = node
        // cn(…) 같은 직접 호출과 expect(el).toHaveClass(…) 같은 메서드 호출을 모두 받는다.
        // property가 Identifier인지 직접 확인한다 — computed 여부만으로는 이름이 있다고 보장되지 않는다.
        const name = callee.type === 'Identifier'
          ? callee.name
          : callee.type === 'MemberExpression' && callee.property.type === 'Identifier'
            ? callee.property.name
            : null

        if (!name || !WRAPPERS.has(name)) return
        node.arguments.forEach(walk)
      },
    }
  },
}

export default rule
