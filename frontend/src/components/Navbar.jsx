import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <button
        className="google-btn"
        onClick={() =>
          window.open(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=97294605994-q0nsjfmme8dn208jkaeu3u8t3ik4am1b.apps.googleusercontent.com&scope=openid%20email&redirect_uri=http://localhost:3000/callback`
          )
        }
      >
        Log in with Google
      </button>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            fontWeight: isActive ? "400" : "300",
            borderBottom: isActive ? "2px solid" : "none",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          style={({ isActive }) => ({
            fontWeight: isActive ? "400" : "300",
            borderBottom: isActive ? "2px solid" : "none",
          })}
        >
          Movies
        </NavLink>
        <NavLink
          to="/reviews"
          style={({ isActive }) => ({
            fontWeight: isActive ? "400" : "300",
            borderBottom: isActive ? "2px solid" : "none",
          })}
        >
          My reviews
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
