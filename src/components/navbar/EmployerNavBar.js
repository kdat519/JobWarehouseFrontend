import React from "react";
import { NavLink } from "react-router-dom";
import brandNameLogo from "./brandname-white.svg";
import { GenericNavBar, NavItem } from "./NavBar";

const BrandName = () => (
  <NavLink className="navbar-brand" to="/for-employers">
    <img src={brandNameLogo} alt="" height="30"></img>
    <span className="text-muted fs-6 fw-light d-none d-lg-inline">
      {" "}
      dành cho Nhà tuyển dụng
    </span>
  </NavLink>
);

const NavCollapse = () => (
  <div className="collapse navbar-collapse" id="nav-collapse">
    <ul className="navbar-nav ms-auto">
      <NavItem to="/for-employers">Đăng việc làm</NavItem>
      <NavItem to="/for-employers">Tìm ứng viên</NavItem>
      <NavItem
        to="/for-employers"
        className="d-none d-lg-block fw-bold text-white border-end"
      >
        Đăng nhập
      </NavItem>
      <NavItem to="/">Tìm việc</NavItem>
    </ul>
  </div>
);

const EmployerNavBar = () => (
  <GenericNavBar
    theme="dark"
    brandName={<BrandName />}
    navCollapse={<NavCollapse />}
  />
);

export default EmployerNavBar;
