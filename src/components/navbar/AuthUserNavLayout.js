import React, { useEffect, useRef, useState } from "react";
import MessageApi from "../../api/messageApi";
import notifiactionAPI from "../../api/notificationAPI";
import { useAuth } from "../auth/AuthProvider";
import { NavItem } from "./GenericNavBar";
import pusher from "../../api/pusher";

const AuthUserNavLayout = ({ logout, username, dropdownTheme, children }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  const [countUnseen, setCountUnseen] = useState(0);
  const [countUnseenNoti, setCountUnseenNoti] = useState(0);
  const countUnseenNotiRef = useRef(0);
  const authContext = useAuth();

  function getDisplay(id) {
    if (id === 0) {
      return "d-none";
    }
    return '';
  }

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

  useEffect(() => {
    async function getUnseenNoti() {
      try {
        const params = { status: "unseen" };
        const response = await notifiactionAPI.countNoti(params);
        if (response.success) {
          setCountUnseenNoti(response.data);
          countUnseenNotiRef.current = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUnseenNoti();
  }, [])

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let channel = pusher.subscribe('private-NotificationChannel.User.' + String(authContext.user_id));
      channel.bind('NotificationCreated', function (data) {
        if (data.model) {
          countUnseenNotiRef.current += 1;
          setCountUnseenNoti(countUnseenNotiRef.current);
        }
      })
    }
    return (() => {
      pusher.unsubscribe('private-NotificationChannel.User.' + String(authContext.user_id));
      mounted = false;
    })
  }, [])

  return (
    <>
      <NavItem to="/messages" className="position-relative">
        Tin nhắn
        <span class={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${getDisplay(countUnseen)}`}>
          {countUnseen}
        </span>
      </NavItem>
      <NavItem to="/notifications" className="position-relative">
        Thông báo
        <span class={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${getDisplay(countUnseenNoti)}`}>
          {countUnseenNoti}
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
