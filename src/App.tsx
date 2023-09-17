// ---------------------------------------------------------
// Author: Neha Shaikh
// Description: Routing of different pages.
// Version: 1.0
// ---------------------------------------------------------

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pdfuploader from "./components/Pdfuploader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Pdfuploader" element={<Pdfuploader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
