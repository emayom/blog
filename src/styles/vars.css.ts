import { createGlobalTheme, createGlobalThemeContract } from "@vanilla-extract/css";
import { tokens } from "../tokens";

export const vars = createGlobalThemeContract(
  tokens,
  (_value, path) => `${path.join('-')}` //mapFn
);

/**
 * 실제 토큰 값과 매핑된 전역 CSS 변수 생성 
 */
createGlobalTheme(":root", vars, tokens);