import { style } from "@vanilla-extract/css";
import { border, text } from "../../../styles/styles.css";

export const footer = style([
  border,
  text.sm,
  {
    userSelect: "none",
    padding: "1rem",
    marginTop: "2rem",
    color: "#6B7280",
    background: "#f5f6f8",
    borderTopWidth: "1px",
  },
]);
