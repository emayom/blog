import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

const FONT_DIR = join(process.cwd(), 'src/assets/fonts')

type OgFonts = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts']

// satori는 woff2를 지원하지 않으므로 otf를 사용한다. Node 런타임 readFile 필수(edge 금지).
export async function loadOgFonts(): Promise<OgFonts> {
  const [regular, semiBold, bold] = await Promise.all([
    readFile(join(FONT_DIR, 'Pretendard-Regular.otf')),
    readFile(join(FONT_DIR, 'Pretendard-SemiBold.otf')),
    readFile(join(FONT_DIR, 'Pretendard-Bold.otf')),
  ])

  return [
    { name: 'Pretendard', data: regular, style: 'normal', weight: 400 },
    { name: 'Pretendard', data: semiBold, style: 'normal', weight: 600 },
    { name: 'Pretendard', data: bold, style: 'normal', weight: 700 },
  ]
}

// 3줄 클램프: satori는 -webkit-line-clamp 미지원 → 글자수 트렁케이트 + maxHeight/overflow 병행.
const TITLE_MAX_CHARS = 60

export function truncateTitle(title: string): string {
  if (title.length <= TITLE_MAX_CHARS) return title
  return `${title.slice(0, TITLE_MAX_CHARS).trimEnd()}…`
}

export interface OgCardInput {
  title?: string
  subtitle?: string
  meta?: string
}

// title 있음 → 글별 카드(parchment), 없음 → 사이트 기본 카드(white).
// 디자인 스펙(01_design.md) hex/px/weight를 inline style로 직접 반영한다.
export function renderOgCard({ title, subtitle, meta }: OgCardInput): React.ReactElement {
  if (title) {
    return renderArticleCard(truncateTitle(title), meta)
  }
  return renderDefaultCard(subtitle ?? siteConfig.description)
}

function renderArticleCard(title: string, meta?: string): React.ReactElement {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f7',
        padding: 80,
        fontFamily: 'Pretendard',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 80,
          bottom: 80,
          width: 6,
          backgroundColor: '#0066cc',
          borderRadius: 9999,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          paddingLeft: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            color: '#1d1d1f',
            maxHeight: 221,
            overflow: 'hidden',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          paddingLeft: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: -0.5,
            color: '#1d1d1f',
          }}
        >
          {siteConfig.name}
        </div>
        {meta
          ? (
              <div
                style={{
                  display: 'flex',
                  fontSize: 24,
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: -0.3,
                  color: '#7a7a7a',
                }}
              >
                {meta}
              </div>
            )
          : null}
      </div>
    </div>
  )
}

function renderDefaultCard(subtitle: string): React.ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        padding: 80,
        fontFamily: 'Pretendard',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 96,
          fontWeight: 700,
          lineHeight: 1.07,
          letterSpacing: -2,
          color: '#1d1d1f',
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: -0.5,
          color: '#7a7a7a',
          marginTop: 24,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          width: 64,
          height: 6,
          backgroundColor: '#0066cc',
          borderRadius: 9999,
          marginTop: 40,
        }}
      />
    </div>
  )
}
