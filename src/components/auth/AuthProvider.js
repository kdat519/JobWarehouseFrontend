import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import authApi from "../../api/authApi";

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

export const Role = {
  Admin: "admin",
  JobSeeker: "jobSeeker",
  Employer: "employer",
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    (async function (email, password) {
      const response = await authApi.login(email, password);

      if (response.access_token) {
        localStorage.setItem("auth", JSON.stringify(response));
        setUser(response.user);
        navigate("/");
      }
    })(email, password);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    navigate("/");
  };

  const register = (name, email, password, role) => {
    
  };

  const context = { ...user, login: login, logout: logout, register: register };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
