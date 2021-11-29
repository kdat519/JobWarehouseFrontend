import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth"))?.user) {
      setUser(JSON.parse(localStorage.getItem("auth"))?.user);
    }
  }, []);

  const login = (data) => {
    (async function (data) {
      const response = await authApi.login(data);

      if (response.access_token) {
        localStorage.setItem("auth", JSON.stringify(response));
        setUser(response.user);
        navigate("/");
      }
    })(data);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    navigate("/");
  };

  const register = (data) => {
    (async function (data) {
      const response = await authApi.register(data);

      if (response.success) {
        navigate("/login");
      }
      else {
        console.log("error");
      }
    })(data);
  };

  const context = { ...user, login: login, logout: logout, register: register };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
