import React, { useEffect, useState } from "react";
import MessageApi from "../../api/messageApi";
import { NavItem } from "./GenericNavBar";

const AuthUserNavLayout = ({ logout, username, dropdownTheme, children }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  const [countUnseen, setCountUnseen] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      async function getUnseen() {
        const response = await MessageApi.countUnseen();
        if (response.data) {
          setCountUnseen(response.data);
        }
      }

      getUnseen();
    }, 3000);
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <NavItem to="/messages" className="position-relative">
        Tin nhắn
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {countUnseen}
        </span>
      </NavItem>
      <NavItem to="/notifications" className="position-relative">
        Thông báo
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          99+
        </span>
      </NavItem>
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
