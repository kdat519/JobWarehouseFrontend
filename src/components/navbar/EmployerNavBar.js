import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Role, useAuth } from "../auth/AuthProvider";
import AuthUserNavLayout from "./AuthUserNavLayout";
import brandNameLogo from "./brandname-white.svg";
import GenericNavBar, { NavItem, ThemeContext } from "./GenericNavBar";

const BrandName = () => (
  <NavLink className="navbar-brand" to="/for-employers" end>
    <img src={brandNameLogo} alt="" height="30" />
    <span className="text-muted fs-6 fw-light d-none d-lg-inline">
      {" "}
      dành cho Nhà tuyển dụng
    </span>
  </NavLink>
);

const AuthUserNav = ({ username, logout }) => (
  <AuthUserNavLayout username={username} logout={logout} dark>
    <li>
      <Link className="dropdown-item" to="/account">
        Tài khoản
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/for-employers/jobs">
        Quản lý tin tuyển dụng
      </Link>
    </li>
  </AuthUserNavLayout>
);

const GuestNav = () => (
  <NavItem to="/login" className="d-none d-lg-block fw-bold text-white">
    Đăng nhập
  </NavItem>
);

const NavItems = () => {
  const authContext = useAuth();
  return authContext.name && authContext.role === Role.Employer ? (
    <AuthUserNav username={authContext.name} logout={authContext.logout} />
  ) : (
    <GuestNav />
  );
};

const NavCollapse = () => (
  <div className="collapse navbar-collapse" id="nav-collapse">
    <ul className="navbar-nav ms-auto">
      <NavItem to="/for-employers/post-job">Đăng việc làm</NavItem>
      <NavItems />
      <div className="vr text-light d-none d-lg-block" />
      <NavItem to="/">Tìm việc</NavItem>
    </ul>
  </div>
);

const EmployerNavBar = () => (
  <ThemeContext.Provider value={{ value: Role.Employer }}>
    <GenericNavBar brandName={<BrandName />} navCollapse={<NavCollapse />} />
  </ThemeContext.Provider>
);

export default EmployerNavBar;
