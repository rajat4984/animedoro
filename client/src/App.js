import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import "./scss/index.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ minHeight: "700px" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
