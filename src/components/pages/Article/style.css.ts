import { style } from "@vanilla-extract/css";

import { themeVars } from "../../../styles/theme.css";
import { typography } from "../../../styles/typograyphy.css";
import { vars } from "../../../styles/vars.css";

const headingBase = style({
  fontWeight: "bold",
  "::before": {
    display: "inline-block",
    width: 20,
    content: "#",
    color: themeVars.color.tertiary,
    fontWeight: "normal",
    marginLeft: -20,
    opacity: 0,
    visibility: "hidden",
    textDecoration: "none",
    transition: "color, opacity .25s",
  },
  selectors: {
    "&:hover::before": {
      opacity: 1,
      visibility: "visible",
    },
  },
});

export const content = style({
  textAlign: "left",
  margin: `${vars.space[400]} 0`,
});

export const h1 = style([headingBase, typography.h1]);
export const h2 = style([headingBase, typography.h2]);
export const h3 = style([headingBase, typography.h3]);
export const h4 = style([headingBase, typography.h4]);
export const h5 = style([headingBase, typography.h5]);
export const h6 = style([headingBase, typography.h6]);

export const blockquote = style({
  position: "relative",
  margin: "1rem 0",
  padding: "8px 1rem",
  backgroundColor: themeVars.background.secondary,
  "::before": {
    content: "",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: 2,
    height: "100%",
    padding: "4px 0",
    background: themeVars.color.tertiary,
    boxSizing: "border-box",
  },
});

export const p = style([
  typography.body2,
  {
    selectors: {
      [`${blockquote} &`]: {
        color: themeVars.color.tertiary,
        margin: 0,
      },

      [`li &`]: {
        margin: `${vars.space["050"]} 0`,
      },
    },
  },
]);
