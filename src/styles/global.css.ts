import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("#app", {
  display: "grid",
  gridTemplateRows: "max-content auto max-content",
  width: "100vw",
  height: "100vh",
  maxWidth: "100%",
  overflow: "scroll",
  boxSizing: "border-box",
  background: vars.background.primary,
  color: vars.color.primary,
});
