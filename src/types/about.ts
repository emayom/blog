export interface ExperienceEntry {
  period: string
  role: string
  org: string
  image?: string
  href?: string
  description?: string
}

export interface ActivityEntry {
  period: string
  title: string
  role?: string
  org?: string
  image?: string
  href?: string
  description?: string
}

export interface EducationEntry {
  period: string
  school: string
  degree: string
  image?: string
  note?: string
}
