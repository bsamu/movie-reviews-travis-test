import {React, useState, useEffect} from 'react';
import { useSearchParams } from "react-router-dom";

const axios = require('axios');

const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  
    const getToken = async () => {
      let code = searchParams.get("code");
      console.log(code);
      const response = await axios.post("http://localhost:4000/api/login", {
        code, //sending the authorization code to the backend
      });
      console.log(response); //the response should be a jwt token signed by our own backend, containing at least a userId
      sessionStorage.setItem("token", response.data); // saving the token to the sessionstorage
    };
  
    useEffect(() => {
      getToken();
    }, []);
  
    return <div>LOGIN FLOW COMPLETE</div>;
  };

export default Login