import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setElementVars } from "@vanilla-extract/dynamic";

import { useThemeContext } from "./context/ThemeContext";

import { Header, Footer } from "./components/layout";
import { Home, About, Article } from "./components/pages";

import { themeVars } from "./styles/theme.css";
import { darkTheme, lightTheme } from "./theme/index";
import "./App.css";

function App() {
  const { isDark } = useThemeContext();

  useEffect(() => {
    setElementVars(document.body, themeVars, isDark ? darkTheme : lightTheme);
  }, [isDark]);

  return (
    <div id="app">
      <Header />
      <main
        style={{
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
          boxSizing: "border-box",
          padding: "2rem",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/article/:title" element={<Article />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
