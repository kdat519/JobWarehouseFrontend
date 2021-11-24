import React, { createContext, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Role, useAuth } from "../auth/AuthProvider";

export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export const NavItem = ({ className, to, children }) => (
  <li className="nav-item">
    <NavLink className={"nav-link px-2 " + (className || "")} to={to} end>
      {children}
    </NavLink>
  </li>
);

const CollapseButton = () => (
  <button
    className="navbar-toggler"
    type="submit"
    data-bs-toggle="collapse"
    data-bs-target="#nav-collapse"
  >
    <span className="navbar-toggler-icon" />
  </button>
);

const SmallScreenNav = () => {
  const themeContext = useTheme();
  const authContext = useAuth();

  const loginBtnClassName =
    "d-lg-none btn fw-bold mx-1 " +
    (themeContext.value === Role.JobSeeker
      ? "btn-primary text-white"
      : "btn-light text-dark") +
    (authContext.username ? " d-none" : "");

  return (
    <div className="navbar-nav flex-row justify-content-end">
      <NavItem to="/login" className={loginBtnClassName}>
        Đăng nhập
      </NavItem>
      <CollapseButton />
    </div>
  );
};

const GenericNavBar = ({ brandName, navCollapse }) => {
  const themeContext = useTheme();
  const navClassName =
    "navbar navbar-expand-lg " +
    (themeContext.value === Role.JobSeeker
      ? "navbar-light bg-light"
      : "navbar-dark bg-dark");

  return (
    <nav className={navClassName}>
      <div className="container">
        {brandName}
        <SmallScreenNav />
        {navCollapse}
      </div>
    </nav>
  );
};

export default GenericNavBar;
