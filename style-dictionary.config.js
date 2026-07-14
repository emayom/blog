import StyleDictionary from 'style-dictionary'
import { fileHeader, formattedVariables, outputReferencesFilter } from 'style-dictionary/utils'
import { propertyFormatNames } from 'style-dictionary/enums'

// Warning comment prepended to the top of generated tokens.css.
// Glob notation (**/*) is avoided here — it contains "*/" which closes the CSS comment early.
const HEADER_LINES = [
  'Generated file — do not edit directly, regenerate with npm run tokens:build',
  'Source: JSON files under src/styles/tokens/',
]

// base 팔레트(원시 hex)는 CSS 변수로 내보내지 않는다.
// 유틸리티 클래스명은 semantic 이름에서만 나와야 하므로, 팔레트를 노출하면 이름 공간이 오염된다.
const PALETTE_GROUPS = ['blue', 'gray', 'near-black']
const isBasePalette = (token) => {
  const [group, sub] = token.path
  if (group !== 'color') return false
  return PALETTE_GROUPS.includes(sub) || ['black', 'white'].includes(sub)
}

// {color.foo-bar} 참조 문자열 → --color-foo-bar CSS 변수명
const refToVar = ref => `--${ref.replace(/[{}]/g, '').replace(/\./g, '-')}`

const isTypography = t => (t.$type ?? t.original?.$type) === 'typography'

// DTCG typography composite → Tailwind v4 text 유틸리티 변수 세트.
// --text-x가 있어야 text-x 유틸리티가 생기고, --text-x--* 수식 변수가 함께 붙는다.
// fontFamily는 --font-* 네임스페이스 소관이라 여기서 다루지 않는다.
const typographyLines = (token) => {
  // css transformGroup이 composite을 font shorthand 문자열로 바꾸므로 원본 객체에서 읽는다
  const { fontSize, fontWeight, lineHeight, letterSpacing } = token.original.$value
  return [
    `  --${token.name}: ${fontSize};`,
    `  --${token.name}--font-weight: ${fontWeight};`,
    `  --${token.name}--line-height: ${lineHeight};`,
    `  --${token.name}--letter-spacing: ${letterSpacing};`,
  ]
}

// @theme { } 래퍼 + .dark { } callout 재지정 블록.
// :root가 아니라 @theme 이어야 Tailwind v4가 유틸리티(bg-canvas 등)를 생성한다.
StyleDictionary.registerFormat({
  name: 'css/tailwind-theme',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file })

    const themeVars = formattedVariables({
      format: propertyFormatNames.css,
      dictionary: { ...dictionary, allTokens: dictionary.allTokens.filter(t => !isTypography(t)) },
      outputReferences: options.outputReferences,
      usesDtcg: true,
    })

    const typographyVars = dictionary.allTokens
      .filter(isTypography)
      .flatMap(typographyLines)
      .join('\n')

    // $extensions.dark를 가진 토큰만 .dark 블록에서 재지정한다.
    // original 쪽의 미해석 참조({color.primary-on-dark})를 읽어 var()로 낮춘다.
    const darkLines = dictionary.allTokens
      .filter(t => t.original?.$extensions?.dark)
      .map(t => `  --${t.name}: var(${refToVar(t.original.$extensions.dark)});`)

    const darkBlock = darkLines.length
      ? `\n.dark {\n${darkLines.join('\n')}\n}\n`
      : ''

    const typographyBlock = typographyVars ? `\n${typographyVars}` : ''
    return `${header}@theme {\n${themeVars}${typographyBlock}\n}\n${darkBlock}`
  },
})

const config = {
  source: ['src/styles/tokens/**/*.json'],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      options: {
        // base 팔레트는 filter로 제외 → 그 참조는 값으로 낮추고,
        // 살아있는 semantic 간 참조(callout→primary)만 var()로 유지
        outputReferences: outputReferencesFilter,
        fileHeader: () => HEADER_LINES,
      },
      files: [
        {
          destination: 'tokens.css',
          format: 'css/tailwind-theme',
          filter: token => !isBasePalette(token),
        },
      ],
    },
  },
}

export default config
