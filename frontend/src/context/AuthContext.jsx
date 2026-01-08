import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
    }
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem('userToken', userData.token);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  const isAdmin = () => user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};