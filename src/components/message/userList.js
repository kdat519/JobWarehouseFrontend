import React from "react";
import styles from './styles.module.scss';
import PropTypes from "prop-types";

UserList.propTypes = {
  name: PropTypes.string,
  active: PropTypes.string
};

UserList.defaultProps = {
  name: "",
  active: "",
};

function UserList(props) {
  const { name, active } = props;
  return (
    <li class={`clearfix ${styles[active]}`}>
      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
      <div class={`${styles['about']}`}>
        <div class={`${styles['name']}`}>{name}</div>
      </div>
    </li>
  )
}

export default UserList;