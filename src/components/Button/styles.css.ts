import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/vars.css";
import { reset } from "../../styles/styles.css";
import { themeVars } from "../../styles/theme.css";

export const button = style([
  reset,
  {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space["050"],
    cursor: "pointer",
    fontStyle: "normal",
    textAlign: "center",
    outline: "unset",
    color: themeVars.color.tertiary,
    border: "none",
    borderRadius: vars.border.radius.l,
    background: "none",
    padding: `${vars.space[100]} ${vars.space[300]}`,
    transition: "color, border, background 0.3s ease",
    userSelect: "none",
    selectors: {
      "&:disabled": {
        cursor: "default",
        pointerEvents: "none",
      },
    },
  },
]);
