import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Role, useAuth } from "../auth/AuthProvider";
import AuthUserNavLayout from "./AuthUserNavLayout";
import brandNameLogo from "./brandname.svg";
import GenericNavBar, { NavItem, ThemeContext } from "./GenericNavBar";

const BrandName = () => (
  <NavLink className="navbar-brand" to="/">
    <img src={brandNameLogo} alt="" height="30"></img>
  </NavLink>
);

const AuthUserNav = (props) => (
  <AuthUserNavLayout username={props.username} logout={props.logout}>
    <li>
      <Link className="dropdown-item" to="/account">
        Tài khoản
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/following">
        Tin tuyển dụng đang theo dõi
      </Link>
    </li>
  </AuthUserNavLayout>
);

const NavCollapse = () => {
  const authContext = useAuth();

  const GuestNav = () => (
    <>
      <NavItem to="/register">Tạo CV của bạn</NavItem>
      <NavItem to="/login" className="d-none d-lg-block fw-bold text-primary">
        Đăng nhập
      </NavItem>
    </>
  );

  const NavItems = () =>
    authContext.username && authContext.role === Role.JobSeeker ? (
      <AuthUserNav
        username={authContext.username}
        logout={authContext.logout}
      />
    ) : (
      <GuestNav />
    );

  return (
    <div className="collapse navbar-collapse" id="nav-collapse">
      <ul className="navbar-nav me-auto">
        <NavItem to="/">Tìm việc</NavItem>
        <NavItem to="/employers">Tìm nhà tuyển dụng</NavItem>
      </ul>
      <ul className="navbar-nav">
        <NavItems />
        <div className="vr text-dark d-none d-lg-block"></div>
        <NavItem to="/for-employers">Nhà tuyển dụng/Đăng việc làm</NavItem>
      </ul>
    </div>
  );
};

const NavBar = () => (
  <ThemeContext.Provider value={{ value: Role.JobSeeker }}>
    <GenericNavBar brandName={<BrandName />} navCollapse={<NavCollapse />} />
  </ThemeContext.Provider>
);

export default NavBar;
