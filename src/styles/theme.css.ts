import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  border: null,
  background: {
    primary: null,
    secondary: null,
  },
  color: {
    primary: null,
    secondary: null,
  },
});
