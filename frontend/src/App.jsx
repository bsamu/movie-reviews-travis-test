import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Review from "./components/Review";
import Login from "./components/Login";
import Movies from "./components/Movies";
import ReactPaginate from "react-paginate";

const axios = require("axios");

const Home = () => {
  return (
    <div>
      <h2>HOME</h2>
      <p>Welcome to the Home section!</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/callback" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/reviews" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
