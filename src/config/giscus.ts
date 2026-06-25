import type { GiscusConfig } from '@/types/giscus'

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO ?? ''
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? ''
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? ''
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? ''

// 4종 env가 모두 설정된 경우에만 위젯을 렌더한다. 미설정 시 댓글 섹션은 그려지지 않는다.
export const isGiscusEnabled = Boolean(repo && repoId && category && categoryId)

export const giscusConfig: GiscusConfig = {
  repo,
  repoId,
  category,
  categoryId,
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'ko',
}
