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
  h1: "80px",
  h2: "72px",
  h3: "54px",
  h4: "40px",
  h5: "34px",
  h6: "28px",
  h7: "20px",
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
  h1: "84px",
  h2: "76px",
  h3: "58px",
  h4: "44px",
  h5: "38px",
  h6: "34px",
  h7: "28px",
};

export const letterSpacing = {
  tighter: "-3px",
  tight: "-2px",
  normal: "-1px",
  wide: "-0.6",
  wider: "-0.4",
};
