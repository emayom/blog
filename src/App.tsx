import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setElementVars } from "@vanilla-extract/dynamic";

import { useThemeContext } from "./context/ThemeContext";

import { Header, Footer, Container } from "./components/layout";
import { Home, Resume, Article, Post } from "./components/pages";

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
      <Container component="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/article/:slug" element={<Article />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
