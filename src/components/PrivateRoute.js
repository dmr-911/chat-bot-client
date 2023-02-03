import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { ChatContext } from "../context/AuthProvider";
import useLocalStorage from "../hooks/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const { user, setUser } = useContext(ChatContext);
  const history = useNavigate();

  // const access token
  const [access, setAccess] = useLocalStorage("accessToken", "");

  useEffect(()=>{
    ( async() =>{
      const config = {
        headers: { Authorization: `Bearer ${access}`},
      };
      const response = await axios.get("users/info/", config);
      setUser(response.data)
    })()
  },[])

  if (!user?.username) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
