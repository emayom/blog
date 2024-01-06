import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components/layout";
import { Home, About } from "./components/pages";
import "./App.css";

function App() {
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
