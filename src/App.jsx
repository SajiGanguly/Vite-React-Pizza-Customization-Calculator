import MainPage from "./pages/Mainpage";
import "./App.css";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<MainPage />} />
        </Routes>
      </BrowserRouter>

    
    </>
  );
}

export default App;
