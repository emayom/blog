import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

/**
 * TODO: localStorage 추상화 (prefix, version ...)
 */
const THEME_PREF_KEY = "isdark";

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const mediaPrefer = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const themePrefer = localStorage.getItem(THEME_PREF_KEY);

  /**
   * 테마 설정 값이 없다면 시스템 설정에 따른다.
   */
  const initialValue: boolean = themePrefer
    ? JSON.parse(themePrefer)
    : mediaPrefer;

  const [isDark, setIsDark] = useState(initialValue);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(
    () => localStorage.setItem(THEME_PREF_KEY, JSON.stringify(isDark)),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
