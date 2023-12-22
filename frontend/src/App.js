import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
            <Route index element={<Welcome />}/>
            <Route path="/registration" element={<Registration />}/>
        </Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
