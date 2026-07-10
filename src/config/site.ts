import type { MetaGroup, NavGroup, NavItem } from '@/types/nav'

export const siteConfig = {
  url: 'https://ayounglim.dev',
  name: 'Ayoung Lim',
  logoText: 'Ayoung Lim',
  description: '배우고 기록하는 것들',
  locale: 'ko_KR',
  location: 'Seoul, Korea',
  repoUrl: 'https://github.com/emayom/blog',
} as const

export const mainNav: NavItem[] = [
  { label: '글', href: '/writing', enabled: true },
  { label: '메모', href: '/notes', enabled: true },
  { label: '책장', href: '/library', enabled: true },
  { label: '소개', href: '/about', enabled: true },
]

export const social: NavItem[] = [
  {
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? '#',
    enabled: true,
    external: true,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? '#',
    enabled: true,
    external: true,
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: process.env.NEXT_PUBLIC_SOCIAL_EMAIL ?? '#',
    enabled: true,
    external: true,
    icon: 'mail',
  },
]

export const footerNav: NavGroup[] = [
  {
    title: '탐색',
    items: [
      { label: '글', href: '/writing', enabled: true },
      { label: '메모', href: '/notes', enabled: true },
      { label: '소개', href: '/about', enabled: true },
      { label: '아카이브', href: '/archive', enabled: true },
    ],
  },
  {
    title: '둘러보기',
    items: [
      { label: '책장', href: '/library', enabled: true },
    ],
  },
  {
    title: '연결',
    items: social,
  },
]

// 배포 메타데이터 — 커밋 해시는 빌드 시 next.config가 주입하는 NEXT_PUBLIC_ 값에서 읽는다
const commitSha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? ''

export const footerMeta: MetaGroup = {
  title: '메타데이터',
  items: [
    {
      label: '커밋',
      value: commitSha ? commitSha.slice(0, 7) : 'dev',
      href: commitSha ? `${siteConfig.repoUrl}/commit/${commitSha}` : siteConfig.repoUrl,
    },
    {
      label: '소스',
      value: 'blog',
      href: siteConfig.repoUrl,
    },
  ],
}
