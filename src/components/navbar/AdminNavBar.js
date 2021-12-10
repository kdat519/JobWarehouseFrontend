import React from "react";
import { NavLink } from "react-router-dom";
import brandNameLogo from "./brandname.svg";

const AdminNavBar = () => (
  <nav className="navbar-light bg-light navbar navbar-expand-lg">
    <div className="container">
      <div>
        <NavLink className="navbar-brand" to="/">
          <img src={brandNameLogo} alt="" height="30" />
        </NavLink>
        <NavLink className="text-decoration-none text-dark" to="/admin">Tài khoản</NavLink>
      </div>
      <div className="navbar-nav flex-row justify-content-end">
        <NavLink
          to="/logout"
          className="px-2 btn fw-bold mx-1 btn-primary text-white"
        >
          Đăng xuất
        </NavLink>
      </div>
    </div>
  </nav>
);

export default AdminNavBar;
