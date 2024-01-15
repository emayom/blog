import { style } from "@vanilla-extract/css";

import { themeVars } from "../../styles/theme.css";
import { typography } from "src/styles/typograyphy.css";
import { vars } from "src/styles/vars.css";

export const author = style({
  display: "block",
  color: themeVars.color.secondary,
});

export const introduction = style([
  typography.s,
  {
    listStyle: "none",
    whiteSpace: "pre-line",
    padding: "0",
    selectors: {
      [`${author} &`]: {
        fontSize: ".875rem",
        textAlign: "left",
        marginTop: "8px",
      },
    },
  },
]);

export const profileContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontFamily: "'Arita'",
  textAlign: "left",
});

export const self = style([
  typography.h5,
  {
    fontFamily: "'Arita buri'",
    fontWeight: vars.font.weight.semibold,
    margin: 0,
  },
]);
