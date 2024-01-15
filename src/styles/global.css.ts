import { globalStyle } from "@vanilla-extract/css";

import { themeVars } from "./theme.css";

globalStyle("#app", {
  display: "grid",
  gridTemplateRows: "max-content auto max-content",
  width: "100vw",
  height: "100vh",
  maxWidth: "100%",
  overflow: "auto",
  boxSizing: "border-box",
  background: themeVars.background.primary,
  color: themeVars.color.primary,
});
