import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 한국어·영문 고유명사(ESLint, MIT 등) 혼용으로 subject-case 강제 불가
    'subject-case': [0],
  },
}

export default config
