import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  maxWidth: "760px",
  margin: "0 auto",
  boxSizing: "border-box",
  padding: "2rem",
  transition: "background, color .5s",
});
