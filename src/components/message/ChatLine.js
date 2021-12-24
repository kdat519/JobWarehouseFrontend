import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../auth/AuthProvider";

ChatLine.propTypes = {
  message: PropTypes.object,
};

ChatLine.defaultProps = {
  message: null,
};

function getTime(ss) {
  const s = new Date(Date.parse(ss));
  return Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(s);
}

function ChatLine(props) {
  const { message } = props;
  const { created_at, sender_id, detail } = message;
  const authContext = useAuth();
  const id = authContext.user_id;
  return (
    <div className="row my-3 mx-0">
      {sender_id === id && <div className="col-2"></div>}
      <div className="col-10">
        <div className="row">
          <div
            className={
              "col-auto fs-6 " + (sender_id === id ? "ms-auto" : "me-auto")
            }
          >
            <small>{getTime(created_at)}</small>
          </div>
        </div>
        <div className="row">
          <div
            className={"col-auto " + (sender_id === id ? "ms-auto" : "me-auto")}
          >
            <div
              className={
                "rounded py-2 px-3 " +
                (sender_id === id ? "bg-primary text-light" : "bg-light-darker")
              }
            >
              {detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLine;
