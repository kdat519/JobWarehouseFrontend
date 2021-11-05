import React from "react";
import { Link } from "react-router-dom";

const BrandName = () => {
  const brandNameClass = "border border-primary px-1";
  return (
    <Link className="navbar-brand fw-bold text-primary" to="/">
      <span className={brandNameClass}>Job</span>
      <span className={brandNameClass + " bg-primary text-light"}>
        Warehouse
      </span>
    </Link>
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

const NavItem = (props) => {
  const className = "nav-link " + props.className;
  return (
    <li className="nav-item">
      <Link className={className + " px-3"} to={props.to} style={props.style}>
        {props.children}
      </Link>
    </li>
  );
};

const NavCollapse = () => (
  <div
    className="collapse navbar-collapse justify-content-end"
    id="nav-collapse"
  >
    <ul className="navbar-nav">
      <NavItem to="/">Tạo CV của bạn</NavItem>
      <NavItem to="/" className="fw-bold text-primary">
        Đăng nhập
      </NavItem>
      <NavItem to="/" className="border-start">
        Nhà tuyển dụng/Đăng việc làm
      </NavItem>
    </ul>
  </div>
);

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <BrandName />
      <CollapseButton />
      <NavCollapse />
    </div>
  </nav>
);

export default NavBar;
