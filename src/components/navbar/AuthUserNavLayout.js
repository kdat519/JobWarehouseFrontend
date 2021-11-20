import React from "react";
import { NavItem } from "./GenericNavBar";

const AuthUserNavLayout = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    props.logout();
  };
  return (
    <>
      <NavItem to="/messages">Tin nhắn</NavItem>
      <li className="nav-item dropdown">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className="nav-link px-2 dropdown-toggle"
          href="#"
          data-bs-toggle="dropdown"
        >
          {props.username}
        </a>
        <ul
          className={
            "dropdown-menu dropdown-menu-end " + (props.dropdownTheme || "")
          }
        >
          {props.children}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="dropdown-item" href="#" onClick={handleLogout}>
              Đăng xuất
            </a>
          </li>
        </ul>
      </li>
    </>
  );
};

export default AuthUserNavLayout;
