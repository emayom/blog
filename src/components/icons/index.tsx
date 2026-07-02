import type { ReactElement } from 'react'
import { GithubIcon } from './github'
import { LinkedInIcon } from './linkedin'
import { LinkIcon } from './link'
import { MailIcon } from './mail'

export { GithubIcon } from './github'
export { LinkedInIcon } from './linkedin'
export { LinkIcon } from './link'
export { MailIcon } from './mail'
export { MoonIcon } from './moon'
export { SunIcon } from './sun'
export { ArrowUpRightIcon } from './arrow-up-right'

// config(데이터)는 표시 라벨이 아니라 이 키로 아이콘을 가리켜, 라벨이 바뀌어도
// 아이콘이 깨지지 않는다. 토글 등 직접 쓰는 UI 아이콘(Sun/Moon)은 registry 대상이
// 아니므로 컴포넌트로만 export한다.
export type IconName = 'github' | 'linkedin' | 'mail' | 'link'

const REGISTRY: Record<IconName, (props: { className?: string }) => ReactElement> = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  link: LinkIcon,
  mail: MailIcon,
}

export function Icon({ name, className }: { name?: string, className?: string }) {
  if (!name)
    return null
  const Component = REGISTRY[name as IconName]
  return Component ? <Component className={className} /> : null
}
