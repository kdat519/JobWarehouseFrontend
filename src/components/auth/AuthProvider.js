import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

export const Role = {
  Admin: "admin",
  JobSeeker: "jobSeeker",
  Employer: "employer",
};

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const login = (username, role, callback) => {
    setUsername(username);
    setRole(role);
    callback();
  };

  const logout = () => {
    setUsername(null);
    setRole(null);
    navigate("/");
  };

  const context = { username, role, login: login, logout: logout };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
