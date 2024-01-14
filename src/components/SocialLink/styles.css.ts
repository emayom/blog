import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "src/styles/theme.css";

const linkContainerBase = style({
  display: "flex",
  padding: 0,
  gap: "1rem",
});

const linkBase = style({
  display: "block",
  fill: "currentcolor",
});

export const linkContainer = styleVariants(
  {
    primary: {
      color: themeVars.color.primary,
    },
    secondary: {
      color: themeVars.color.secondary,
    },
    tertiary: {
      color: themeVars.color.tertiary,
    },
  },
  (color) => [linkContainerBase, { ...color }]
);

export const link = styleVariants(
  {
    s: {
      width: 18,
      height: 18,
    },
    m: {
      width: 22,
      height: 22,
    },
    l: {
      width: 24,
      height: 24,
    },
  },
  (size) => [linkBase, { ...size }]
);
