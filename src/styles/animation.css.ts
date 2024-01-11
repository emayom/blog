import { keyframes, style } from "@vanilla-extract/css";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "35%": { transform: "rotate(0deg)" },
  "40%": { transform: "rotate(-5deg)" },
  "60%": { transform: "rotate(5deg)" },
  "65%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(0deg)" },
});

export const flutter = style({
  animationName: rotate,
  animationDuration: "2s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
});
