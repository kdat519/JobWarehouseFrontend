import React from "react";
import { NavLink } from "react-router-dom";
import brandNameLogo from "./brandname.svg";

export const NavItem = (props) => {
  const className = "nav-link " + (props.className || "");
  return (
    <li className="nav-item">
      <NavLink
        className={({ isActive }) =>
          className + " px-2" + (isActive ? " active" : "")
        }
        to={props.to}
        end
      >
        {props.children}
      </NavLink>
    </li>
  );
};

const CollapseButton = () => (
  <button
    className="navbar-toggler"
    type="submit"
    data-bs-toggle="collapse"
    data-bs-target="#nav-collapse"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
);

const SmallScreenNav = (props) => {
  const loginBtnClassName =
    "d-lg-none btn fw-bold mx-1 " +
    (props.theme === "light"
      ? "btn-primary text-white"
      : "btn-light text-dark");
  return (
    <div className="navbar-nav flex-row justify-content-end">
      <NavItem to="/" className={loginBtnClassName}>
        Đăng nhập
      </NavItem>
      <CollapseButton />
    </div>
  );
};

export const GenericNavBar = (props) => {
  const navClassName =
    "navbar navbar-expand-lg " +
    (props.theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark");
  return (
    <nav className={navClassName}>
      <div className="container">
        {props.brandName}
        <SmallScreenNav theme={props.theme} />
        {props.navCollapse}
      </div>
    </nav>
  );
};

const BrandName = () => (
  <NavLink className="navbar-brand" to="/" end>
    <img src={brandNameLogo} alt="" height="30"></img>
  </NavLink>
);

const NavCollapse = () => (
  <div className="collapse navbar-collapse" id="nav-collapse">
    <ul className="navbar-nav me-auto">
      <NavItem to="/">Tìm việc</NavItem>
      <NavItem to="/employers">Tìm nhà tuyển dụng</NavItem>
    </ul>
    <ul className="navbar-nav">
      <NavItem to="/">Tạo CV của bạn</NavItem>
      <NavItem
        to="/"
        className="d-none d-lg-block fw-bold text-primary border-end"
      >
        Đăng nhập
      </NavItem>
      <NavItem to="/for-employers">Nhà tuyển dụng/Đăng việc làm</NavItem>
    </ul>
  </div>
);

const NavBar = () => (
  <GenericNavBar
    theme="light"
    brandName={<BrandName />}
    navCollapse={<NavCollapse />}
  />
);

export default NavBar;
