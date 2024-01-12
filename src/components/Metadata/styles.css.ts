import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/vars.css";
import { themeVars } from "../../styles/theme.css";
import { typography } from "../../styles/typograyphy.css";

export const metadata = style({
  color: themeVars.color.secondary,
});

export const title = style([
  typography.h2,
  {
    selectors: {
      [`${metadata} &`]: {
        color: themeVars.color.primary,
        fontWeight: vars.font.weight.bold,
        wordBreak: "keep-all",
        overflowWrap: "break-word",
      },
    },
  },
]);

export const publishedDate = style([
  typography.s,
  {
    color: themeVars.color.tertiary,
    selectors: {
      [`${metadata} &`]: {},
    },
  },
]);

export const readingTime = style([
  typography.caption1,
  {
    color: themeVars.color.tertiary,
    "::before": {
      content: "",
      display: "inline-block",
      width: 3,
      height: 3,
      margin: vars.space[100],
      borderRadius: vars.border.radius.circle,
      backgroundColor: themeVars.color.tertiary,
      verticalAlign: "middle",
    },
    selectors: {
      [`${metadata} &`]: {},
    },
  },
]);

export const category = style([
  typography.xs,
  {
    selectors: {
      [`${metadata} &`]: {
        display: "inline-block",
        color: themeVars.color.tertiary,
        borderRadius: vars.border.radius.pill,
        background: themeVars.background.secondary,
        padding: `${vars.space["050"]} ${vars.space[150]}`,
        fontWeight: vars.font.weight.bold,
        margin: `0 ${vars.space["100"]} ${vars.space["100"]} 0`,
      },
      [`${metadata} &:hover`]: {
        background: "none",
      },
    },
  },
]);

export const description = style([
  typography.s,
  {
    selectors: {
      [`${metadata} &`]: {
        margin: `${vars.space[400]} 0`,
      },
    },
  },
]);
