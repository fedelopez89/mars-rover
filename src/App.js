import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import HomePage from "./components/HomePage/HomePage";
import RoverPhotos from "./components/RoverPhotos/RoverPhotos";
// Styles
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/mars-rover-photos" element={<RoverPhotos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
