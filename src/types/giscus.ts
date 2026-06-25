export type GiscusTheme = 'light' | 'dark'

export interface GiscusConfig {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping: string
  reactionsEnabled: string
  emitMetadata: string
  inputPosition: string
  lang: string
}

export interface ISetConfigMessage {
  giscus: {
    setConfig: {
      theme: GiscusTheme
    }
  }
}
