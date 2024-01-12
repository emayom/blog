import { createThemeContract } from "@vanilla-extract/css";

export const themeVars = createThemeContract({
  border: null,
  background: {
    primary: null,
    secondary: null,
  },
  color: {
    primary: null,
    secondary: null,
    tertiary: null,
    reversed: null,
  },
});
