import React, { useEffect, useRef, useState } from "react";
import messageApi from "../../api/messageAPI";
import notificationApi from "../../api/notificationAPI";
import pusher from "../../api/pusher";
import { useAuth } from "../auth/AuthProvider";
import { NavItem } from "./GenericNavBar";
import styles from "./styles.module.scss";

const AuthUserNavLayout = ({ logout, username, dark = false, children }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  const [countUnseen, setCountUnseen] = useState(0);
  const [countUnseenNoti, setCountUnseenNoti] = useState(0);
  const countUnseenRef = useRef(0);
  const countUnseenNotiRef = useRef(0);
  const authContext = useAuth();

  function getDisplay(id) {
    if (id === 0) {
      return "d-none";
    }
    return "d-inline-block";
  }

  function getwidth(id) {
    if (id === 0) {
      return "";
    }
    return "w-23";
  }

  function getheight(id) {
    if (id === 0) {
      return "";
    }
    return "h-20";
  }

  function getmargin(id) {
    if (id === 0) {
      return "";
    }
    return "mr-2";
  }

  useEffect(() => {
    async function getUnseen() {
      try {
        const response = await messageApi.countUnseen();
        if (response.success) {
          countUnseenRef.current = response.data;
          setCountUnseen(response.data);
        }
      } catch (error) {}
    }

    getUnseen();
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
      } catch (error) {}
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
  }, [authContext.user_id]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let channel = pusher.subscribe(
        "private-MessageChannel.User." + String(authContext.user_id)
      );
      channel.bind("MessageCreated", function (data) {
        if (data.model) {
          countUnseenRef.current = 1;

          setCountUnseen(countUnseenRef.current);
        }
      });
    }
    return () => {
      pusher.unsubscribe(
        "private-MessageChannel.User." + String(authContext.user_id)
      );
      mounted = false;
    };
  }, [authContext.user_id]);

  return (
    <>
      <NavItem
        to="/messages"
        className={`position-relative ${styles[getmargin(countUnseen)]}`}
      >
        Tin nh???n
        <span
          className={`position-absolute ${styles["top-5"]} ${
            styles[getwidth(countUnseen)]
          } ${
            styles[getheight(countUnseen)]
          } start-100 translate-middle badge rounded-pill bg-danger ${getDisplay(
            countUnseen
          )}`}
        ></span>
      </NavItem>
      <NavItem
        to="/notifications"
        className={`position-relative ${styles[getmargin(countUnseenNoti)]}`}
      >
        Th??ng b??o
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
            "dropdown-menu dropdown-menu-end " +
            (dark ? "dropdown-menu-dark" : "")
          }
        >
          {children}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="dropdown-item" href="#" onClick={handleLogout}>
              ????ng xu???t
            </a>
          </li>
        </ul>
      </li>
    </>
  );
};

export default AuthUserNavLayout;
