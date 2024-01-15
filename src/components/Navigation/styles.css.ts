import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/vars.css";

export const topNav = style({
  display: "flex",
  listStyle: "none",
  padding: 0,
  gap: vars.space[250],
  margin: `0 ${vars.space[250]}`,
});

export const link = style({
  fontSize: vars.font.size.xs,
});
