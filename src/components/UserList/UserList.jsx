import React from "react";
import PropTypes from "prop-types";

UserList.propTypes = {
  users: PropTypes.array,
};

UserList.defaultProps = {
  users: [],
};

function UserList(props) {
  const { users } = props;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.user_id}>{user.email}</li>
      ))}
    </ul>
  );
}

export default UserList;
