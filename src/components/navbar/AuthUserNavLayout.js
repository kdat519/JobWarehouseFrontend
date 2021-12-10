import React from "react";
import { NavItem } from "./GenericNavBar";

const AuthUserNavLayout = ({ logout, username, dropdownTheme, children }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logout();
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
          {username}
        </a>
        <ul
          className={"dropdown-menu dropdown-menu-end " + (dropdownTheme || "")}
        >
          {children}
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
