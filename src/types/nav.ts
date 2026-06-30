import type { IconName } from '@/components/icons'

export interface NavItem {
  label: string
  href: string
  enabled: boolean
  external?: boolean
  icon?: IconName
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface MetaItem {
  label: string
  value: string
  href?: string
}

export interface MetaGroup {
  title: string
  items: MetaItem[]
}
