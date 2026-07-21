import noUntokenizedClassname from './rules/no-untokenized-classname.ts'

/**
 * 디자인 시스템 가드레일 플러그인.
 *
 * ESLint 플러그인 규약(`{ meta, rules }`)을 그대로 따른다
 */
const plugin = {
  meta: { name: 'eslint-plugin-design-guardrails', version: '0.1.0' },
  rules: {
    'no-untokenized-classname': noUntokenizedClassname,
  },
}

export default plugin
