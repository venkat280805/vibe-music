import React, { useContext } from "react";
import { AuthContext } from "../components/context/AuthContextApi";
import { Navigate } from "react-router-dom";

//! This is for Authenticated Users
const ProtectedRoutes = ({ children }) => {
  let { authUser } = useContext(AuthContext || {});
  if (
    (authUser && authUser?.accessToken) ||
    window.localStorage.getItem("TOKEN")
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default ProtectedRoutes;
