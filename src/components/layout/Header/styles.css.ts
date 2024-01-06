import { style } from "@vanilla-extract/css";
import { reset } from "../../../styles/styles.css";

export const header = style({
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 1,
  padding: "1rem 2rem",
  // color: "#3c3c43",
});

export const title = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const anchor = style({
  display: "block",
  fill: "currentcolor",
  width: "24px",
  height: "24px",
  transition: "color .5s",
});

export const toggleBtn = style([
  reset,
  {
    color: "inherit",
    background: "none",
  },
]);
