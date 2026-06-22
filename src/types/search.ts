import type { PostMeta } from '@/types/post'

export interface SearchContextValue {
  posts: PostMeta[]
  open: boolean
  setOpen: (open: boolean) => void
}
