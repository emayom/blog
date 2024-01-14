import { style } from "@vanilla-extract/css";

export const layout = style({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});
