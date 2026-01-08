// useAuth.js (unchanged from last fix)
import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const initialized = useRef(false);

//   useEffect(() => {
//     if (initialized.current) return;
//     initialized.current = true;

//     const adminToken = localStorage.getItem('adminToken');
//     const userToken = localStorage.getItem('userToken') || localStorage.getItem('token');
//     const activeToken = adminToken || userToken;

//     if (activeToken) {
//       try {
//         const decoded = jwtDecode(activeToken);
//         setUser(decoded);
//         setToken(activeToken);
//       } catch (err) {
//         console.error('Invalid token:', err);
//         localStorage.clear();
//       }
//     }
//   }, []);



// useAuth.js (unchanged — already good)
useEffect(() => {
  if (initialized.current) return;
  initialized.current = true;

  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    try {
      const decoded = jwtDecode(adminToken);
      setUser(decoded);  // This is sync — but React batches
      setToken(adminToken);
    } catch (err) {
      localStorage.removeItem('adminToken');
    }
  }
}, []);


const setUserAndToken = (data) => {
    const { token, role } = data;
    const key = role === 'admin' ? 'adminToken' : 'userToken';
    localStorage.setItem(key, token);
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setToken(token);
    } catch (err) {
      console.error('Failed to decode login token');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const isAdmin = () => !!user && user.role === 'admin';

  return { user, token, setUserAndToken, logout, isAdmin };
};

export default useAuth;