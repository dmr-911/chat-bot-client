import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ChatContext } from "../context/AuthProvider";
import useLocalStorage from "../hooks/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const { user, userData, setUser, loading, setLoading } =
    useContext(ChatContext);
  const history = useNavigate();

  // const access token
  const [access, setAccess] = useLocalStorage("accessToken", "");

  // effect for user load
  useEffect(() => {
    userData();
  }, []);

  if (loading)
    return (
      <p className="text-center h-[50vh] w-full flex justify-center items-center text-2xl font-bold">
        Please wait...
      </p>
    );

  if (!user?.username && !loading) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  } else {
    // authorized so return child components
    return children;
  }
};

export default PrivateRoute;
