import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./screen/Homescreen";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Homescreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
