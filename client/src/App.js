import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import "./scss/index.scss"


function App() {
  return (
    <div className="App" style={{minHeight:"700px"}}>
     <Navbar/>
     <Main/>
    </div>
  );
}

export default App;
