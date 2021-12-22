import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import authApi from "../../api/authApi";

const AuthContext = React.createContext(null);

export const Role = {
  Admin: "admin",
  JobSeeker: "jobseeker",
  Employer: "employer",
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("auth"))?.user
  );
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState();
  const [loginError, setLoginError] = useState();

  const login = (data, from) => {
    (async function (data, from) {
      const response = await authApi.login(data);

      if (response.access_token) {
        localStorage.setItem("auth", JSON.stringify(response));
        setUser(response.user);
        setLoginError(undefined);
        if (response?.user?.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          if (
            response?.user?.role === Role.Employer &&
            /^(?!\/for-employers)/gm.test(from)
          )
            navigate("/for-employers", { replace: true });
          else if (
            response?.user?.role === Role.JobSeeker &&
            /^\/(for-employers|admin)/gm.test(from)
          )
            navigate("/", { replace: true });
          else navigate(from, { replace: true });
        }
      } else {
        setRegisterError(undefined);
        setLoginError(response.message);
      }
    })(data, from);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(undefined);
    setRegisterError(undefined);
    setLoginError(undefined);
    navigate("/");
  };

  const register = (data) => {
    (async function (data) {
      const response = await authApi.register(data);

      if (response.success) {
        setRegisterError(undefined);
        setLoginError(undefined);
        navigate("/login");
      } else {
        setRegisterError(response.message);
      }
    })(data);
  };

  const context = {
    ...user,
    registerError,
    setRegisterError,
    loginError,
    setLoginError,
    login,
    logout,
    register,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
