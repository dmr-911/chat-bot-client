import "./App.css";
import React, { useEffect } from "react";
import ChatUi from "./components/ChatUi";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./components/SignUp";
import useLocalStorage from "./hooks/useLocalStorage";
import axios from "axios";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <div className="App">
      <main className="relative">
        <AuthProvider>
          <Navbar />

          <Routes>
            {/* <Route path="/" element={<ChatUi />}/> */}
          
            <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatUi />
            </PrivateRoute>
          }
        />
            <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
            <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
