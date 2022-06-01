import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <button
        onClick={() =>
          window.open(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=97294605994-q0nsjfmme8dn208jkaeu3u8t3ik4am1b.apps.googleusercontent.com&scope=openid%20email&redirect_uri=http://localhost:3000/callback`
          )
        }
      >
        Log in with Google
      </button>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/reviews">My reviews</Link>
    </div>
  );
};

export default Navbar;
