import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import HomePage from "./components/HomePage/HomePage";
import RoverPhotos from "./components/RoverPhotos/RoverPhotos";
import FavoritePhotos from "./components/FavoritePhotos/FavoritePhotos";
// Styles
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/mars-rover-photos" element={<RoverPhotos />} />
          <Route
            exact
            path="/mars-rover-photos/favorites"
            element={<FavoritePhotos />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
