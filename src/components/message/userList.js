import React from "react";
import styles from './styles.module.scss';
import PropTypes from "prop-types";

UserList.propTypes = {
  user: PropTypes.object,
  handleClickUserList: PropTypes.func,
};

UserList.defaultProps = {
  user: null,
  handleClickUserList: null,
};


function UserList(props) {
  const { user, handleClickUserList } = props;
  const { other_id, name, email } = user;

  function handleOnClick() {
    handleClickUserList(other_id, name);
  }

  return (
    <li className={`clearfix`} onClick={handleOnClick}>
      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
      <div className={`${styles['about']}`}>
        <div className={`${styles['name']}`}>{name}</div>
        <div className={`${styles['name']} text-muted h6`}>{email}</div>
      </div>
    </li>
  )
}

export default UserList;