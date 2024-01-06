import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setElementVars } from "@vanilla-extract/dynamic";

import { useThemeContext } from "./context/ThemeContext";

import { Header, Footer } from "./components/layout";
import { Home, About } from "./components/pages";

import { vars } from "./styles/theme.css";
import { darkTheme, lightTheme } from "./theme";
import "./App.css";

function App() {
  const { isDark } = useThemeContext();

  useEffect(() => {
    setElementVars(
      document.body,
      vars,
      isDark ? darkTheme : lightTheme
    );
  }, [isDark]);

  return (
    <div id="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
