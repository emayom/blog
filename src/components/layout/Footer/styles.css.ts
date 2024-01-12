import { style } from "@vanilla-extract/css";
import { border, text } from "../../../styles/styles.css";
import { themeVars } from "../../../styles/theme.css";

export const footer = style([
  border,
  text.sm,
  {
    userSelect: "none",
    padding: "1rem",
    color: themeVars.color.secondary,
    background: themeVars.background.secondary,
    borderTopWidth: "1px",
  },
]);
