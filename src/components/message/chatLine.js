import React from "react";
import styles from './styles.module.scss';
import PropTypes from "prop-types";
import { useAuth } from "../../components/auth/AuthProvider";


ChatLine.propTypes = {
  message: PropTypes.object
};

ChatLine.defaultProps = {
  message: null
};

function getLeftRight(s, id) {
  if (s === id) {
    return 'text-right';
  } else {
    return '';
  }
}

function getMessageCSS(s, id) {
  if (s === id) {
    return 'other-message';
  } else {
    return 'my-message';
  }
}

function getTime(ss) {
  const s = String(new Date(Date.parse(ss)));
  return s.slice(0, 24);
}

function ChatLine(props) {
  const { message } = props;
  const { created_at, sender_id, receiver_id, detail } = message;
  const authContext = useAuth();
  const id = authContext.user_id;
  return (
    <li class="clearfix">
      <div class={`${styles['message-data']} ${styles[getLeftRight(sender_id, id)]}`}>
        <span class={`${styles['message-data-time']}`}>{getTime(created_at)}</span>
      </div>
      <div class={`${styles['message']} ${styles[getMessageCSS(sender_id, id)]}`}> {detail} </div>
    </li>
  )
}

export default ChatLine;