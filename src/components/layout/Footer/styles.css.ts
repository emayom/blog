import { style } from "@vanilla-extract/css";
import { border, text } from "../../../styles/styles.css";
import { vars } from "../../../styles/theme.css";

export const footer = style([
  border,
  text.sm,
  {
    userSelect: "none",
    padding: "1rem",
    marginTop: "2rem",
    color: vars.color.secondary,
    background: vars.background.secondary,
    borderTopWidth: "1px",
  },
]);
