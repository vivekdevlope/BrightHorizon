// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// const AdminProtectedRoute = ({ children }) => {
//   const [isChecking, setIsChecking] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     setIsAuthenticated(!!token);
//     setIsChecking(false);
//   }, []);

//   if (isChecking) return null; // prevent blink while checking

//   return isAuthenticated ? children : <Navigate to="/admin" replace />;
// };

// export default AdminProtectedRoute;
