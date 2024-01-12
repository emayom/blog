const relativeSize = {
  xxs: "12px",
  xs: "14px",
  s: "16px",
  m: "18px",
  l: "20px",
  xl: "22px",
  xxl: "26px",
};

const headingLevel = {
  h1: "48px",
  h2: "30px",
  h3: "24px",
  h4: "20px",
  h5: "17px",
  h6: "14px",
  h7: "12px",
};

const weight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

export const font = {
  family: {
    heading: "Poppins",
    body: "Inter",
  },
  size: {
    ...relativeSize,
    ...headingLevel,
  },
  weight,
};

export const lineHeight = {
  xxs: "20px",
  xs: "22px",
  s: "26px",
  m: "30px",
  l: "32px",
  xl: "34px",
  xxl: "40px",
  // heading level
  h1: "1.25",
  h2: "1.55",
  h3: "1.6",
  h4: "1.6",
  h5: "1.6",
  h6: "1.6",
  h7: "1.8",
};

export const letterSpacing = {
  tighter: "-3px",
  tight: "-2px",
  normal: "-1px",
  wide: "-0.6",
  wider: "-0.4",
};
