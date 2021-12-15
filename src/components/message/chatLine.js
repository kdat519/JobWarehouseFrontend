import React from "react";
import styles from './styles.module.scss';
import PropTypes from "prop-types";

ChatLine.propTypes = {
  content: PropTypes.string,
  belongs: PropTypes.string,
  time: PropTypes.string,
};

ChatLine.defaultProps = {
  content: "",
  belongs: "",
  time: "",
};

function getLeftRight(s) {
  if (s === "me") {
    return 'text-right';
  } else {
    return '';
  }
}

function getMessageCSS(s) {
  if (s === "me") {
    return 'other-message';
  } else {
    return 'my-message';
  }
}

function ChatLine(props) {
  const { content, belongs, time } = props;
  return (
    <li class="clearfix">
      <div class={`${styles['message-data']} ${styles[getLeftRight(belongs)]}`}>
        <span class={`${styles['message-data-time']}`}>{time}</span>
      </div>
      <div class={`${styles['message']} ${styles[getMessageCSS(belongs)]}`}> {content} </div>
    </li>
  )
}

export default ChatLine;