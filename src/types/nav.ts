export interface NavItem {
  label: string
  href: string
  enabled: boolean
  external?: boolean
}

export interface NavGroup {
  title: string
  items: NavItem[]
}
