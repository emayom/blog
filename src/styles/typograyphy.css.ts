import { styleVariants } from "@vanilla-extract/css";
import { vars } from "./vars.css";
import { themeVars } from "./theme.css";

type FontSizeType = keyof typeof vars.font.size;
type LineHeightType = keyof (typeof vars)["line-height"];
type LetterSpacingType = keyof (typeof vars)["letter-spacing"];

function fontMappingFn(
  keys: Partial<
    Record<
      FontSizeType | "caption1" | "caption2" | "body1" | "body2",
      | [FontSizeType, LineHeightType]
      | [FontSizeType, LineHeightType, LetterSpacingType]
    >
  >
) {
  return Object.fromEntries(
    Object.entries(keys).map(([name, [k1, k2, k3]]) => [
      name,
      {
        fontSize: vars.font.size[k1],
        lineHeight: vars["line-height"][k2],
        ...(k3 && { letterSpacing: vars["letter-spacing"][k3] }),
      },
    ])
  );
}

const base = styleVariants({
  heading: {
    color: themeVars.color.primary,
    fontWeight: vars.font.weight.medium,
    // fontFamily: "",
  },
  body: {
    color: themeVars.color.secondary,
    fontWeight: vars.font.weight.normal,
    // fontFamily: "",
  },
});

const headings = fontMappingFn({
  h1: ["h1", "h1", "tighter"],
  h2: ["h2", "h2", "tight"],
  h3: ["h3", "h3", "normal"],
  h4: ["h4", "h4", "wider"],
  h5: ["h5", "h5", "wide"],
  h6: ["h6", "h6", "wide"],
  h7: ["h7", "h7"],
});

const bodies = fontMappingFn({
  caption1: ["xs", "xs"],
  caption2: ["xxs", "xxs"],
  body1: ["l", "l"],
  body2: ["s", "s"],
});

const texts = fontMappingFn({
  xxl: ["xxl", "xxl"] /** 26px */,
  xl: ["xl", "xl"] /** 22px */,
  l: ["l", "l"] /** 20px */,
  m: ["m", "m"] /** 18px */,
  s: ["s", "s"] /** 16px */,
  xs: ["xs", "xs"] /** 14px */,
  xxs: ["xxs", "xxs"] /** 12px */,
});

export const typography:
  | {
      [x in FontSizeType | "caption1" | "caption2" | "body1" | "body2"]: string;
    }
  | { [x: string]: string; [x: number]: string } = {
  ...styleVariants(headings, (props) => [base.heading, props]),
  ...styleVariants(bodies, (props) => [base.body, props]),
  ...styleVariants(texts, (props) => [base.body, props]),
};
