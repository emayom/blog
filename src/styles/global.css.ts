import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("#app", {
  width: "100vw",
  height: "100vh",
  maxWidth: "100%",
  boxSizing: "border-box",
  background: vars.background.primary,
  color: vars.color.primary,
});
