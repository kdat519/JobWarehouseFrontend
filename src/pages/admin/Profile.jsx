import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../components/auth/AuthProvider";

const Profile = () => {
  const authContext = useAuth();
  const location = useLocation();

  if (authContext?.role === 'employer') {
    return <Navigate to="/employers/profile" state={{ from: location }} />;
  }
  else if (authContext?.role === 'jobseeker') {
    return <Navigate to="/jobseekers/profile" state={{ from: location }} />;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default Profile;
