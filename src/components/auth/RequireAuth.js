import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "./AuthProvider";

const RequireAuth = ({ requireRole, children }) => {
  const authContext = useAuth();
  const location = useLocation();

  if (authContext.email && authContext.role === requireRole) {
    return children;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default RequireAuth;
