import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { ChatContext } from "../context/AuthProvider";
import useCredentials from "../hooks/useCredentials";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(ChatContext);
  const history = useNavigate();

  if (!user?.username) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
