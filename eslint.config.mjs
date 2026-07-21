// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import stylistic from '@stylistic/eslint-plugin'
import designGuardrails from './eslint-rules/index.ts'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  stylistic.configs.recommended,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Build artifacts (ESLint flat config does not read .gitignore):
    'storybook-static/**',
    'coverage/**',
  ]),
  ...storybook.configs['flat/recommended'],
  {
    files: ['src/components/mdx/mdx-components/mdx-components.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  {
    // 토큰 가드레일 — 정리 완료 전까지 warn, 잔여 0이 되면 error로 승격한다.
    // 테스트도 포함한다 — toHaveClass가 클래스명을 단언하므로 개명이 여기까지 따라가야 한다.
    files: ['src/**/*.tsx'],
    ignores: ['src/app/wireframe/**', 'src/stories/**'],
    plugins: { design: designGuardrails },
    rules: {
      'design/no-untokenized-classname': 'warn',
    },
  },
])

export default eslintConfig
