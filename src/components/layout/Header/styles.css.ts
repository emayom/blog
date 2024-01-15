import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../styles/theme.css";
import { vars } from "../../../styles/vars.css";

export const header = style({
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 1,
  padding: vars.space[200],
  backgroundColor: themeVars.background.primary,
  "@media": {
    "screen and (min-width: 768px)": {
      width: "100%",
      maxWidth: 768,
      margin: "0 auto",
    },
  },
});

export const title = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
