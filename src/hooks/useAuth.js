import { useContext } from "react";
import { ChatContext } from "../context/AuthProvider";

const useAuth = () =>{
    return useContext(ChatContext);
};

export default useAuth;