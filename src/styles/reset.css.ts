import { globalStyle, GlobalStyleRule } from "@vanilla-extract/css";
import { reset } from "./layers.css.ts";

/**
 * h1, h2, h3, h4, h5, h6, p, blockquote, strong, sub, sup, b 제외
 */
export const globalReset: {
  selector: string;
  rule: GlobalStyleRule;
}[] = [
  {
    selector:
      "html, body, div, span, applet, object, iframe, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, tt, var, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed,  figure, figcaption, footer, header, hgroup,  menu, nav, output, ruby, section, summary, time, mark, audio, video",
    rule: {
      margin: 0,
      padding: 0,
      border: 0,
      fontSize: "100%",
      font: "inherit",
      verticalAlign: "baseline",
    },
  },
  {
    selector:
      "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section",
    rule: {
      display: "block",
    },
  },
  {
    selector: "body",
    rule: {
      lineHeight: 1,
    },
  },
  {
    selector: "ol, ul",
    rule: {
      paddingLeft: "2rem",
    },
  },
  {
    selector: "blockquote, q",
    rule: {
      quotes: "none",
    },
  },
  {
    selector: "blockquote:before, blockquote:after,q:before, q:after",
    rule: {
      content: ["", "none"] /** fallback */,
    },
  },
  {
    selector: "table",
    rule: {
      borderSpacing: 0,
      borderCollapse: "collapse",
    },
  },
  {
    selector: "a, button",
    rule: {
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    },
  },
];

globalReset.forEach(({ selector, rule }) =>
  globalStyle(selector, {
    "@layer": {
      [reset]: rule,
    },
  })
);
