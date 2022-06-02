import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Review from "./components/Review";

const axios = require("axios");

//openID flow
const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getToken = async () => {
    let code = searchParams.get("code");
    console.log(code);
    const response = await axios.post("http://localhost:4000/api/login", {
      code, //sending the authorization code to the backend
    });
    console.log(response);
    sessionStorage.setItem("token", response.data);
  };

  useEffect(() => {
    getToken();
  }, []);

  return <div>LOGIN</div>;
};

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
      </Routes>
    </div>
  );
}

export default App;
