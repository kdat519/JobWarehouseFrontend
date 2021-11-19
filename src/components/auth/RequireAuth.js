import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "./AuthProvider";

const RequireAuth = (props) => {
  const authContext = useAuth();
  const location = useLocation();

  if (authContext.username && authContext.role === props.requireRole) {
    return props.children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default RequireAuth;
