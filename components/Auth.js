import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentMac, setCurrentMac] = useState(null);


  const login = (userData, macData) => {
    setCurrentUser(userData);
    setCurrentMac(macData);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, currentMac, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};