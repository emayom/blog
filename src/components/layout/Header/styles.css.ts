import { style } from "@vanilla-extract/css";

export const header = style({
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 1,
  padding: 10,
  pointerEvents: "none",
});

export const title = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

export const container = style({
  display: "flex",
  justifyContent: "space-between",
});
