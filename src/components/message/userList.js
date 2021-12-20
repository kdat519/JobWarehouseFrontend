import React, { useState, useEffect } from "react";
import styles from './styles.module.scss';
import PropTypes from "prop-types";
import messageAPI from '../../api/messageAPI';

UserList.propTypes = {
  user: PropTypes.object,
  handleClickUserList: PropTypes.func,
};

UserList.defaultProps = {
  user: null,
  handleClickUserList: null,
};

function getStatus(s) {
  if (s === 'unseen') return s;
  return '';
}

function UserList(props) {
  const { user, handleClickUserList } = props;
  const { other_id, name, email, user_id, image_link } = user;
  const params = { other_id: other_id, status: 'unseen' };
  const [unSeen, setUnSeen] = useState('seen');

  useEffect(() => {
    async function CountUnseen() {
      if (other_id) {
        console.log(1);
        try {
          const response = await messageAPI.checkUnseen(params);
          if (response.data > 0) {
            setUnSeen('unseen');
          } else {
            setUnSeen('seen');
          }
        } catch (error) {
          console.log("Failed to fetch user list: ", error);
        }
      }
    }

    CountUnseen();
  }, [user]);

  function handleOnClick() {
    if (other_id) {
      handleClickUserList(other_id, name);
      setUnSeen('seen');
    }
    else handleClickUserList(user_id, name);
  }

  return (
    <li className={`clearfix ${styles[getStatus(unSeen)]}`} onClick={handleOnClick}>
      <img src={image_link} alt="avatar" />
      <div className={`${styles['about']}`}>
        <div className={`${styles['name']}`}>{name}</div>
        <div className={`${styles['name']} text-muted h6`}>{email}</div>
      </div>
    </li>
  )
}

export default UserList;