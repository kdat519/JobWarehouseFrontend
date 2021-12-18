import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

Notification.propTypes = {
  noti: PropTypes.object,
};

Notification.defaultProps = {
  noti: [],
};

function getTime(t) {
  const date = new Date();
  if (Number(t.slice(0, 4)) === date.getFullYear()) {
    if (Number(t.slice(5, 7)) === date.getMonth() + 1) {
      if (Number(t.slice(8, 10)) === date.getDate()) {
        if (Number(t.slice(11, 13)) === date.getHours()) {
          if (Number(t.slice(14, 16)) === date.getMinutes()) {
            return "0 phút trước";
          } else {
            return String(date.getMinutes() - Number(t.slice(14, 16))) + ' phút trước';
          }
        } else {
          return String(date.getHours() - Number(t.slice(11, 13))) + ' giờ trước';
        }
      } else {
        return String(date.getDate() - Number(t.slice(8, 10))) + ' ngày trước';
      }
    } else {
      return String(date.getMonth() + 1 - Number(t.slice(5, 7))) + ' tháng trước';
    }
  } else {
    return String(date.getFullYear() - Number(t.slice(0, 4))) + ' năm trước';
  }
}

function Notification(props) {
  const { noti } = props;
  const { created_at, detail, title } = noti;
  const time = getTime(created_at);
  const Title = title.toUpperCase();
  return (
    <div className={`toast show ${styles[`w-20`]}`}>
      <div className="toast-header">
        <span className={`rounded ${styles[`mr-1`]} ${styles[`square`]} bg-primary`} />
        <strong className={`${styles[`mr-auto`]}`}>{Title} NOTIFICATION</strong>
        <small>{time}</small>
      </div>
      <div className="toast-body bg-secondary text-white">
        {detail}
      </div>
    </div>
  )
}

export default Notification;