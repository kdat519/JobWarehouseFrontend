import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.scss";

Notification.propTypes = {
  noti: PropTypes.object,
};

Notification.defaultProps = {
  noti: [],
};

function getTime(t) {
  const date = new Date();
  const time = new Date(Date.parse(t));
  var year = date.getFullYear() - time.getFullYear();
  var month = date.getMonth() - time.getMonth();
  var day = date.getDate() - time.getDate();
  var hour = date.getHours() - time.getHours();
  var minute = date.getMinutes() - time.getMinutes();
  var second = date.getSeconds() - time.getSeconds();
  if (
    year === 0 &&
    month === 0 &&
    day === 0 &&
    hour === 0 &&
    minute > 1 &&
    second < 0
  )
    return String(minute - 1) + " phút trước";
  if (
    year === 0 &&
    month === 0 &&
    day === 0 &&
    hour === 0 &&
    minute >= 1 &&
    second >= 0
  )
    return String(minute) + " phút trước";
  if (year === 0 && month === 0 && day === 0 && hour >= 1 && minute >= 0)
    return String(hour) + " giờ trước";
  if (year === 0 && month === 0 && day === 0 && hour > 1 && minute < 0)
    return String(hour - 1) + " giờ trước";
  if (year === 0 && month === 0 && day === 0 && hour === 1 && minute < 0)
    return String(60 - Math.abs(minute)) + " phút trước";
  if (year === 0 && month === 0 && day >= 1 && hour >= 0)
    return String(day) + " ngày trước";
  if (year === 0 && month === 0 && day > 1 && hour < 0)
    return String(day - 1) + " ngày trước";
  if (year === 0 && month === 0 && day === 1 && hour < 0)
    return String(24 - Math.abs(hour)) + " giờ trước";
  if (year === 0 && month >= 1 && day >= 0)
    return String(month) + " tháng trước";
  if (year === 0 && month > 1 && day < 0)
    return String(month - 1) + " tháng trước";
  if (year === 0 && month === 1 && day < 0)
    return (
      String((Date.parse(date) - Date.parse(time)) / (1000 * 3600 * 24)) +
      " ngày trước"
    );
  if (year >= 1 && month >= 0) return String(year) + " năm trước";
  if (year > 1 && month < 0) return String(year - 1) + " năm trước";
  if (year === 1 && month < 0)
    return String(12 - Math.abs(month)) + " tháng trước";
  return "0 phút trước";
}

function Notification(props) {
  const { noti } = props;
  const { created_at, detail, title } = noti;
  const time = getTime(created_at);
  const Title = title.toUpperCase();
  return (
    <div className={`toast show ${styles["notification-w"]}`}>
      <div className="toast-header">
        <span
          className={`rounded ${styles[`mr-1`]} ${styles[`square`]} bg-primary`}
        />
        <strong className={`${styles[`mr-auto`]}`}>{Title}</strong>
        <small>{time}</small>
      </div>
      <div className="toast-body bg-light text-dark">{detail}</div>
    </div>
  );
}

export default Notification;
