import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
        <button onClick={
          () => window.open(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=145780615357-3qqh0fjm48r5t2af090fjdpqi7dl9s40.apps.googleusercontent.com&scope=openid%20email&redirect_uri=http://localhost:3000/callback`)}>Log in with Google</button>
        <Link to="/movies">Movies</Link>
        <Link to="/reviews">My reviews</Link>
    </div>
  )
}

export default Navbar