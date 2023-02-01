import axios from "axios";
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useCredentials = () => {
  const [user, setUser] = useState();

  // local storage
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

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

  return { user, setUser, login };
};

export default useCredentials;
