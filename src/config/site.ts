import type { NavGroup, NavItem } from '@/types/nav'

export const siteConfig = {
  url: 'https://ayounglim.dev',
  name: 'Ayoung Lim',
  description: '배우고 기록하는 것들',
  locale: 'ko_KR',
  location: 'Seoul, Korea',
} as const

export const mainNav: NavItem[] = [
  { label: '글', href: '/writing', enabled: true },
  { label: '소개', href: '/about', enabled: true },
  { label: '메모', href: '/notes', enabled: false },
  { label: '책장', href: '/library', enabled: false },
]

export const footerNav: NavGroup[] = [
  {
    title: '탐색',
    items: [
      { label: '글', href: '/writing', enabled: true },
      { label: '소개', href: '/about', enabled: true },
    ],
  },
  {
    title: '둘러보기',
    items: [
      { label: '메모', href: '/notes', enabled: false },
      { label: '책장', href: '/library', enabled: false },
    ],
  },
  {
    title: '연결',
    items: [
      { label: 'GitHub', href: '#', enabled: true, external: true },
      { label: 'LinkedIn', href: '#', enabled: true, external: true },
      { label: 'Email', href: '#', enabled: true, external: true },
    ],
  },
]

export const social: NavItem[] = [
  { label: 'GitHub', href: '#', enabled: true, external: true },
  { label: 'LinkedIn', href: '#', enabled: true, external: true },
  { label: 'Email', href: '#', enabled: true, external: true },
]
