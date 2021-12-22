import React from "react";
import { NavLink } from "react-router-dom";
import brandNameLogo from "./brandname.svg";

export default function AdminNavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container container-fluid">
          <NavLink className="navbar-brand " to="/">
            <img src={brandNameLogo} alt="" height="30" />
          </NavLink>
          <NavLink
            to="/logout"
            id="logout2"

            className=" ms-auto px-2 btn fw-bold mx-2 btn-primary text-white"
          >
            Đăng xuất
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink className="nav-link px-2" to="/admin/users">
                  Tài khoản
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link px-2" to="/admin/reports">
                  Nhận xét
                </NavLink>
              </li>
              {/* <li class="nav-item">
                <NavLink className="nav-link px-2" to="/account">
                  Cài đặt
                </NavLink>
              </li> */}
            </ul>
          </div>

          <NavLink
            to="/logout"
            className=" ms-auto px-2 btn fw-bold mx-2 btn-primary text-white"
            id="logout1"
          >
            Đăng xuất
          </NavLink>
         
        </div>
      </nav>
    </div>
  );
}
