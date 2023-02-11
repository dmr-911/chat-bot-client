import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const useCredentials = () => {
  const [user, setUser] = useState();
  const name = user?.username.split("@")[0];
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useNavigate();

  // local storage
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [userMsgArr, setUserMsgArr] = useLocalStorage("userMsgArr", []);
  const [botMsgArr, setBotMsgArr] = useLocalStorage("botMsgArr", []);

  // const user data
  const userData = async (access) => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${access || accessToken}` },
    };
    // get user data
    try {
      const response = await axios.get("users/info/", config);
      if (response.data) {
        setLoading(false);
        setUser(response.data);
      }
    } catch (err) {
      setLoading(false);
      console.clear();
    }
  };

  // user chat history
  const chatHistory = async (access) => {
    const config = {
      headers: { Authorization: `Bearer ${access ? access : accessToken}` },
    };

    const response = await axios.get("chatbot/history/", config);

    setBotMsgArr(response.data.botMsgArr);
    setUserMsgArr(response.data.userMsgArr);
  };

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
    document.cookie = `${data.refresh}`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

    // set tokens in local storage
    setAccessToken(data.access);
    setRefreshToken(data.refresh);

    // retrive user data
    if (data.access) {
      const config = {
        headers: { Authorization: `Bearer ${data.access}` },
      };

      try {
        const response = await axios.get("users/info/", config);
        setUser(response.data);
        chatHistory(data.access);
      } catch (err) {
        console.clear();
      }
    }
  };

  // register method
  const signUp = async (data) => {
    console.log(data);
    axios
      .post("users/", data)
      .then((res) => {
        setErrors([]);
        // set tokens in local storage
        setAccessToken(res?.data?.tokens?.access);
        setRefreshToken(res?.data?.tokens?.refresh);

        if (res?.data?.tokens?.access) {
          // data retrive
          // userData(res.data.tokens.access);
          setUser({
            first_name: res.data.first_name,
            id: res.data.id,
            last_name: res.data.last_name,
            phone_number: res.data.phone_number,
            profile_picture: res.data.profile_picture,
            username: res.data.email,
          });
          if (user?.name) {
            setLoading(false);
            history.push("/");
          }
        }
      })
      .catch((err) => {
        setErrors(err.response.data.email);
        console.clear();
      });
  };

  // log out
  const logOut = () => {
    setAccessToken("");
    setRefreshToken("");
    setUser(null);
    setUserMsgArr([]);
    setBotMsgArr([]);
  };

  // delete user chat history
  const deleteChat = async () => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const response = await axios.get("chatbot/history/delete/", config);
    if (response.status === 200) {
      localStorage.removeItem("userMsgArr");
      localStorage.removeItem("botMsgArr");
      // setBotMsgArr([]);
    }
    console.clear();
  };

  console.log(errors);
  return {
    user,
    setUser,
    userData,
    login,
    signUp,
    chatHistory,
    errors,
    accessToken,
    refreshToken,
    userMsgArr,
    botMsgArr,
    name,
    logOut,
    deleteChat,
    loading,
    setLoading,
  };
};

export default useCredentials;
