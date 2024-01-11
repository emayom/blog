import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const metadata = style({});

export const title = style({
  selectors: {
    [`${metadata} &`]: {
      fontSize: "48px",
      fontWeight: "bold",
      lineHeight: 1.25,
      wordBreak: "keep-all",
      overflowWrap: "break-word",
    },
  },
});

export const publishedDate = style({
  selectors: {
    [`${metadata} &`]: {
      color: vars.color.secondary,
    },
  },
});

export const category = style({
  selectors: {
    [`${metadata} &`]: {
      display: "inline-block",
      background: vars.background.secondary,
      padding: 8,
    },
  },
});
