// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";


// const isAuthenticated = () => {
//   const accessToken = localStorage.getItem("accessToken"); 

//   // Example: Check if the token exists and is not expired
//   if (!accessToken) return false;

//   try {
//     const decodedToken = JSON.parse(atob(accessToken.split('.')[1])); // Decode the JWT payload
//     const currentTime = Math.floor(Date.now() / 1000); 
//     return decodedToken.exp > currentTime; 
//   } catch (err) {
//     return false; 
//   }
// };

// // ProtectedRoute Component
// const ProtectedRoute = () => {
//   const auth = isAuthenticated();

//   return auth ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { refreshToken } from "../utils/UseRefreshToken";

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return false;

  try {
    const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT payload
    const currentTime = Math.floor(Date.now() / 1000); 
    return decodedToken.exp > currentTime;
  } catch (err) {
    return false;
  }
};

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleTokenRefresh = async () => {
      if (!auth) {
        try {
          await refreshToken(); 
          setAuth(isAuthenticated()); 
        } catch (error) {
          console.error("Token refresh failed:", error);
          setAuth(false);
        }
      }
    };

    handleTokenRefresh();
  }, [auth]);

  return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
