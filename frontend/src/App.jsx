import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Review from "./components/Review";
import Login from "./components/Login";
import Movies from "./components/Movies";
import ReactPaginate from "react-paginate";

const axios = require("axios");

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if ((sessionStorage.getItem('token')) && !loggedIn) setLoggedIn(true);
  })

  return (
    <div className="App">
      {loggedIn && <p>logged in!</p>}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/callback" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
