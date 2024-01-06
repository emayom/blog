import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const THEME_PREF_KEY = "isdark";

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const themePrefer = localStorage.getItem(THEME_PREF_KEY);
  const initialTheme = themePrefer ? JSON.parse(themePrefer) : false;

  const [isDark, setIsDark] = useState(initialTheme);

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
