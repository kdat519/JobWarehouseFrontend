import React from "react";
import { NavLink } from "react-router-dom";
import brandNameLogo from "./brandname.svg";

const BrandName = () => {
  // const brandNameClass = "border border-primary px-1";
  return (
    <NavLink className="navbar-brand fw-bold text-primary" to="/">
      <img src={brandNameLogo} alt="" height="30"></img>
    </NavLink>
  );
};

const NavItem = (props) => {
  const className = "nav-link " + (props.className || "");
  return (
    <li className="nav-item">
      <NavLink
        className={({ isActive }) =>
          className + " px-2" + (isActive ? " active" : "")
        }
        to={props.to}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

const CollapseButton = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#nav-collapse"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
);

const SmallScreenNav = () => (
  <div className="navbar-nav flex-row justify-content-end">
    <NavItem
      to="/"
      className="d-lg-none btn btn-primary fw-bold text-white mx-1"
    >
      Đăng nhập
    </NavItem>
    <CollapseButton />
  </div>
);

const NavCollapse = () => (
  <div className="collapse navbar-collapse" id="nav-collapse">
    <ul className="navbar-nav me-auto">
      <NavItem to="/">Tìm việc</NavItem>
      <NavItem to="/">Tìm nhà tuyển dụng</NavItem>
    </ul>
    <ul className="navbar-nav">
      <NavItem to="/">Tạo CV của bạn</NavItem>
      <NavItem
        to="/"
        className="d-none d-lg-block fw-bold text-primary border-end"
      >
        Đăng nhập
      </NavItem>
      <NavItem to="/">Nhà tuyển dụng/Đăng việc làm</NavItem>
    </ul>
  </div>
);

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <BrandName />
      <SmallScreenNav />
      <NavCollapse />
    </div>
  </nav>
);

export default NavBar;
