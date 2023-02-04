import axios from "axios";
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useCredentials = () => {
  const [user, setUser] = useState();
  const name = user?.username.split('@')[0];

  // local storage
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");


  // const user data 
  const userData = async (access) =>{
    const config = {
      headers: { Authorization: `Bearer ${access}` },
    };

    const response = await axios.get("users/info/", config);
    setUser(response.data);
  }

  // login user
  const login = async (email, password) => {
    const { data } = await axios.post(
      "auth/login/",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    // set tokens in local storage
    setAccessToken(data.access);
    setRefreshToken(data.refresh);

    document.cookie = `${data.refresh}`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

    // retrive user data 
    if (data.access) {
      const config = {
        headers: { Authorization: `Bearer ${data.access}` },
      };

      const response = await axios.get("users/info/", config);
      setUser(response.data);
    }
  };


  // register method
  const signUp = async (data) =>{
    axios.post('users/', data)
    .then(res => {

      console.log(res)
      // set tokens in local storage
      setAccessToken(res.tokens.access);
      setRefreshToken(res.tokens.refresh);

      if(res.tokens.access){
        console.log(res.tokens)
        // data retrive
        userData(res.tokens.access)
      }
    }).catch(err =>{
      console.log(err.response);
    })
  };

  // log out 
  const logOut = () =>{
    setAccessToken("");
    setRefreshToken("");
    setUser(null);
  }

  return { user, setUser, login, signUp, accessToken, refreshToken, name , logOut };
};

export default useCredentials;
