import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import AboutAnime from "./components/AboutAnime/AboutAnime";
import "./scss/index.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ minHeight: "700px" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/aboutAnime" element={<AboutAnime />} />
      </Routes>
    </div>
  );
}

export default App;
