import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/vars.css";

import { themeVars } from "../../../styles/theme.css";
import { flutter } from "../../../styles/animation.css";

export const layout = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  gap: vars.space[200],
});

export const prefix = style({
  selectors: {},
});

export const badge = style([
  flutter,
  {
    selectors: {
      [`${layout} &`]: {
        display: "inline-block",
        padding: "4px 6px",
        background: themeVars.background.secondary,
        borderRadius: 6,
        margin: "0 8px",
      },
    },
  },
]);

export const badgeText = style([
  flutter,
  {
    selectors: {
      [`${layout} &`]: {
        color: "transparent",
        fontWeight: "bold",
        backgroundClip: "text",
        backgroundImage: "linear-gradient(120deg,#b047ff 16%,#8294f7, #a3c1ff)",
        WebkitTextFillColor: "transparent",
      },
    },
  },
]);
