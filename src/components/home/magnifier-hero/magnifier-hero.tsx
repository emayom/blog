'use client'

/* 히어로 대표 타일 — 돋보기 문진(paper weight): 최근 읽은 책의 글귀가
   종이처럼 타일에 깔리고, 커서/터치를 따라오는 유리 반구가 그 아래 글씨를
   굴절·확대해 보여준다. 균일 확대가 아니라 구면 렌즈 굴절(스넬 근사)이라
   가장자리가 볼록하게 휜다. 3D 엔진 없이 Pretext(텍스트 레이아웃) + 2D 캔버스. */

import { useEffect, useRef } from 'react'
import {
  layoutNextLineRange,
  materializeLineRange,
  prepareWithSegments,
} from '@chenglou/pretext'

const PAD = 28
const GUTTER = 24
const BODY_FONT_SIZE = 13
const BODY_LINE_HEIGHT = 22
/* base 레이어 초과 샘플 — 굴절·확대해도 선명 */
const SUPERSAMPLE = 2.5
const BG_ALPHA = 0.82
const LENS_R = 52
const IOR = 1.5
/* 굴절 변위 배수 — 클수록 가장자리가 더 휜다 (1 = 물리 그대로) */
const DISTORT = 1.1
/* 반구 굴절에 더해 전체 배율을 키운다 (중심 배율 ≈ 1.5 × BASE_ZOOM) */
const BASE_ZOOM = 1.4
const LERP = 0.22

interface Cursor { segmentIndex: number, graphemeIndex: number }

/** "rgb(r, g, b)" / "rgba(...)" → [r, g, b], 파싱 실패 시 흰색 */
export function parseRgb(value: string): [number, number, number] {
  const m = value.match(/(\d+(?:\.\d+)?)/g)
  if (m && m.length >= 3)
    return [Number(m[0]), Number(m[1]), Number(m[2])]
  return [255, 255, 255]
}

const sameCursor = (a: Cursor, b: Cursor) =>
  a.segmentIndex === b.segmentIndex && a.graphemeIndex === b.graphemeIndex

interface MagnifierHeroProps {
  /** 종이처럼 깔리고 렌즈로 확대되는 글귀 */
  body: string
}

export function MagnifierHero({ body }: MagnifierHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const tile = canvas?.parentElement
    if (!canvas || !tile)
      return
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    const dpr = window.devicePixelRatio || 1
    const ss = SUPERSAMPLE

    /* 텍스트 폭 측정은 폰트에만 의존 — 리사이즈·테마와 무관하므로 1회 준비 */
    const prepared = prepareWithSegments(
      body,
      `400 ${BODY_FONT_SIZE}px ${getComputedStyle(tile).fontFamily}`,
      { wordBreak: 'keep-all' },
    )

    /* ── 현재 타일 크기·색·base 텍스트 레이어 (리사이즈/테마 시 재구성) ── */
    let W = 0
    let H = 0
    let bw = 0
    let bh = 0
    const base = document.createElement('canvas')
    const bctx = base.getContext('2d', { willReadFrequently: true })!
    let baseData = new Uint8ClampedArray(0)
    let color = '#000'
    let paper: [number, number, number] = [255, 255, 255]

    /* 현재 W/H로 2컬럼 텍스트를 base에 그리고 픽셀을 추출한다 */
    const buildBase = () => {
      const cs = getComputedStyle(tile)
      color = cs.color
      paper = parseRgb(cs.backgroundColor)
      bw = Math.round(W * ss)
      bh = Math.round(H * ss)
      base.width = bw
      base.height = bh
      bctx.setTransform(ss, 0, 0, ss, 0, 0)
      bctx.clearRect(0, 0, W, H)
      bctx.font = `400 ${BODY_FONT_SIZE}px ${cs.fontFamily}`
      bctx.fillStyle = color
      bctx.textAlign = 'left'
      bctx.textBaseline = 'alphabetic'
      const colW = (W - PAD * 2 - GUTTER) / 2
      const columns: Array<[number, number]> = [
        [PAD, PAD + colW],
        [PAD + colW + GUTTER, W - PAD],
      ]
      let cursor: Cursor = { segmentIndex: 0, graphemeIndex: 0 }
      for (const [x0, x1] of columns) {
        let y = PAD + BODY_FONT_SIZE
        while (y < H - PAD) {
          const range = layoutNextLineRange(prepared, cursor, x1 - x0)
          if (!range)
            break
          if (!sameCursor(range.end, cursor)) {
            bctx.fillText(materializeLineRange(prepared, range).text, x0, y)
            cursor = range.end
          }
          y += BODY_LINE_HEIGHT
        }
      }
      baseData = bctx.getImageData(0, 0, bw, bh).data
    }

    /* 타일 크기를 읽어 메인 캔버스·base를 맞춘다 (매 프레임 크기 변화 시 호출) */
    const applySize = () => {
      const r = tile.getBoundingClientRect()
      const w = Math.round(r.width)
      const h = Math.round(r.height)
      if (w <= 0 || h <= 0)
        return
      W = w
      H = h
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildBase()
    }
    applySize()

    let lensCX = W * 0.5
    let lensCY = H * 0.5
    let targetX = lensCX
    let targetY = lensCY
    let visible = false
    let appear = 0

    /* ── 렌즈 역매핑 버퍼 (LENS_R 고정 → 리사이즈해도 재생성 불필요) ── */
    const lensPx = Math.ceil(LENS_R * 2 * dpr)
    const lensCanvas = document.createElement('canvas')
    lensCanvas.width = lensPx
    lensCanvas.height = lensPx
    const lensCtx = lensCanvas.getContext('2d')!
    const lensImage = lensCtx.createImageData(lensPx, lensPx)
    const lensData = lensImage.data

    /* 목적지 픽셀 → 구면 굴절 → base 샘플. 반경 currentR(등장 애니메이션) */
    const renderLens = (currentR: number) => {
      const cDev = LENS_R * dpr
      const rDev = currentR * dpr
      for (let py = 0; py < lensPx; py++) {
        for (let px = 0; px < lensPx; px++) {
          const di = (py * lensPx + px) * 4
          const dx = px - cDev
          const dy = py - cDev
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d >= rDev) {
            lensData[di + 3] = 0
            continue
          }
          let srcDist: number
          if (d < 0.5) {
            srcDist = 0
          }
          else {
            const nd = d / rDev
            const a1 = Math.asin(nd)
            const a2 = Math.asin(nd / IOR)
            const z = Math.sqrt(1 - nd * nd) * rDev
            /* 반구 굴절로 소스를 중심으로 당김 → 확대 + 가장자리 압축(휨) */
            srcDist = (d - DISTORT * z * Math.tan(a1 - a2)) / BASE_ZOOM
          }
          const ux = d > 0 ? dx / d : 0
          const uy = d > 0 ? dy / d : 0
          const bx = Math.round((lensCX + (ux * srcDist) / dpr) * ss)
          const by = Math.round((lensCY + (uy * srcDist) / dpr) * ss)
          if (bx < 0 || bx >= bw || by < 0 || by >= bh) {
            lensData[di + 3] = 0
            continue
          }
          const si = (by * bw + bx) * 4
          /* 글씨를 종이색 위에 불투명 합성 — 배경 텍스트가 여백으로 비치지 않는다 */
          const a = baseData[si + 3]
          const inv = 255 - a
          lensData[di] = (paper[0] * inv + baseData[si] * a) / 255
          lensData[di + 1] = (paper[1] * inv + baseData[si + 1] * a) / 255
          lensData[di + 2] = (paper[2] * inv + baseData[si + 2] * a) / 255
          const edge = rDev - d
          lensData[di + 3] = edge < dpr ? Math.round(255 * (edge / dpr)) : 255
        }
      }
    }

    const drawGlass = (r: number) => {
      /* 등장·퇴장 초반 반경이 작으면 링(r-3 등)이 음수가 되어 arc가 던진다 */
      if (r < 4)
        return
      /* 볼록 비네트 — 가장자리로 갈수록 살짝 어두워져 유리 두께를 암시 */
      const vg = ctx.createRadialGradient(lensCX, lensCY, r * 0.55, lensCX, lensCY, r)
      vg.addColorStop(0, 'rgba(40,42,55,0)')
      vg.addColorStop(0.82, 'rgba(40,42,55,0)')
      vg.addColorStop(1, 'rgba(40,42,55,0.16)')
      ctx.fillStyle = vg
      ctx.beginPath()
      ctx.arc(lensCX, lensCY, r, 0, Math.PI * 2)
      ctx.fill()

      /* 좌상단 광원 반사 — 원 안쪽 클립 후 밝은 타원 하이라이트 */
      ctx.save()
      ctx.beginPath()
      ctx.arc(lensCX, lensCY, r, 0, Math.PI * 2)
      ctx.clip()
      const hl = ctx.createRadialGradient(
        lensCX - r * 0.28,
        lensCY - r * 0.42,
        0,
        lensCX - r * 0.28,
        lensCY - r * 0.42,
        r * 0.95,
      )
      hl.addColorStop(0, 'rgba(255,255,255,0.55)')
      hl.addColorStop(0.5, 'rgba(255,255,255,0.08)')
      hl.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hl
      ctx.fillRect(lensCX - r, lensCY - r, r * 2, r * 2)
      ctx.restore()

      /* 가장자리 굴절 링 — 바깥 밝은 테 + 안쪽 얇은 어두운 선(유리 두께감) */
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.beginPath()
      ctx.arc(lensCX, lensCY, r - 1, 0, Math.PI * 2)
      ctx.stroke()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(0,0,0,0.14)'
      ctx.beginPath()
      ctx.arc(lensCX, lensCY, r - 3, 0, Math.PI * 2)
      ctx.stroke()
    }

    let raf = 0
    const draw = () => {
      /* 리사이즈 실시간 반영 — 크기가 바뀌면 즉시 캔버스·base 재구성 */
      if (tile.clientWidth !== W || tile.clientHeight !== H)
        applySize()

      lensCX += (targetX - lensCX) * LERP
      lensCY += (targetY - lensCY) * LERP
      appear += ((visible ? 1 : 0) - appear) * 0.16

      ctx.clearRect(0, 0, W, H)
      /* 배경: 종이에 인쇄된 글씨처럼 진하게 */
      ctx.globalAlpha = BG_ALPHA
      ctx.drawImage(base, 0, 0, W, H)
      ctx.globalAlpha = 1

      if (appear > 0.02) {
        const r = LENS_R * appear
        renderLens(r)
        lensCtx.putImageData(lensImage, 0, 0)
        /* 드롭 섀도우 — 종이 위에 놓인 유리처럼 우하단으로 부드럽게 (광원 좌상단) */
        ctx.save()
        ctx.shadowColor = 'rgba(24,26,38,0.3)'
        ctx.shadowBlur = 16
        ctx.shadowOffsetX = 3
        ctx.shadowOffsetY = 9
        ctx.drawImage(lensCanvas, lensCX - LENS_R, lensCY - LENS_R, LENS_R * 2, LENS_R * 2)
        ctx.restore()
        drawGlass(r)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const moveTo = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      targetX = e.clientX - r.left
      targetY = e.clientY - r.top
      visible = true
    }
    /* 터치는 탭 지점에 즉시 문진을 놓고(순간이동) 드래그로 옮긴다 */
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      if (e.pointerType === 'touch') {
        lensCX = e.clientX - r.left
        lensCY = e.clientY - r.top
      }
      moveTo(e)
    }
    /* 마우스가 타일을 벗어나면 사라진다. 터치는 뗀 자리에 문진을 남긴다 */
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'touch')
        visible = false
    }
    tile.addEventListener('pointerdown', onDown)
    tile.addEventListener('pointermove', moveTo)
    tile.addEventListener('pointerleave', onLeave)

    /* 다크모드 — 테마 클래스가 바뀌면 종이색·글씨색이 달라지므로 base를 재렌더 */
    const themeObserver = new MutationObserver(() => buildBase())
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      tile.removeEventListener('pointerdown', onDown)
      tile.removeEventListener('pointermove', moveTo)
      tile.removeEventListener('pointerleave', onLeave)
    }
  }, [body])

  return (
    <>
      {/* 캔버스 글귀의 접근성 미러 — 스크린리더·JS 미실행 시 텍스트 제공.
          sr-only라 타일 높이에 영향 없음(시각 표현은 캔버스가 담당) */}
      <p className="sr-only">{body}</p>
      {/* touch-none: 타일 위 터치 제스처를 스크롤 대신 문진 이동에 쓴다 */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-none touch-none" aria-hidden />
    </>
  )
}
