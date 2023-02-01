import React from 'react';
import useCredentials from '../hooks/useCredentials';

export const ChatContext = React.createContext();
const AuthProvider = ({children}) => {
    const allContext = useCredentials();
    return (
        <ChatContext.Provider value={allContext}>
            {children}
        </ChatContext.Provider>
    );
};

export default AuthProvider