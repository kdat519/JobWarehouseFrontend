import React, { useEffect, useRef, useState } from "react";
import messageApi from "../../api/messageAPI";
import notificationApi from "../../api/notificationAPI";
import { useAuth } from "../auth/AuthProvider";
import { NavItem } from "./GenericNavBar";
import pusher from "../../api/pusher";
import styles from "./styles.module.scss";

const AuthUserNavLayout = ({ logout, username, dark = false, children }) => {
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
    return "";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      async function getUnseen() {
        const response = await messageApi.countUnseen();
        if (response.data) {
          setCountUnseen(response.data);
        }
      }

      getUnseen();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getUnseenNoti() {
      try {
        const params = { status: "unseen" };
        const response = await notificationApi.countNoti(params);
        if (response.success) {
          setCountUnseenNoti(response.data);
          countUnseenNotiRef.current = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUnseenNoti();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let channel = pusher.subscribe(
        "private-NotificationChannel.User." + String(authContext.user_id)
      );
      channel.bind("NotificationCreated", function (data) {
        if (data.model) {
          countUnseenNotiRef.current += 1;
          setCountUnseenNoti(countUnseenNotiRef.current);
        }
      });
    }
    return () => {
      pusher.unsubscribe(
        "private-NotificationChannel.User." + String(authContext.user_id)
      );
      mounted = false;
    };
  }, []);

  return (
    <>
      <NavItem to="/messages" className={`position-relative ${styles["mr-2"]}`}>
        Tin nhắn
        <span
          className={`position-absolute ${
            styles["top-5"]
          } start-100 translate-middle badge rounded-pill bg-danger ${getDisplay(
            countUnseen
          )}`}
        >
          {countUnseen}
        </span>
      </NavItem>
      <NavItem
        to="/notifications"
        className={`position-relative ${styles["mr-2"]}`}
      >
        Thông báo
        <span
          className={`position-absolute ${
            styles["top-5"]
          } start-100 translate-middle badge rounded-pill bg-danger ${getDisplay(
            countUnseenNoti
          )}`}
        >
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
          className={
            "dropdown-menu dropdown-menu-end " + (dark && "dropdown-menu-dark")
          }
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
