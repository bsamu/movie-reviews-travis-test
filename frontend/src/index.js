import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Movies from "./components/Movies";
import Review from "./components/Review";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="movies" element={<Movies />} />
      <Route path="reviews" element={<Review />} />
    </Routes>
  </BrowserRouter>
);
