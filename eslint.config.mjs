// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import stylistic from '@stylistic/eslint-plugin'

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
    files: ['src/components/mdx/mdx-components.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
])

export default eslintConfig
