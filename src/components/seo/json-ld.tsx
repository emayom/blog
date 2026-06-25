import type { JsonLdData } from '@/types/json-ld'

// '<'를 이스케이프해 script 종료 태그 주입(XSS)을 차단한다.
export function serialize(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  )
}
