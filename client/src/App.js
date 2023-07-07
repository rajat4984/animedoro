import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import "./scss/index.scss"


function App() {
  function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }
  
  function generateRandomString() {
    let array = new Uint32Array(56/2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
  }
  
  let verifier = generateRandomString();
  let code_challenge = generateRandomString();

  console.log(code_challenge);

  return (
    <div className="App" style={{minHeight:"700px"}}>
     <Navbar/>
     <Main/>
    </div>
  );
}

export default App;
