import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

UserList.propTypes = {
  users: PropTypes.array,
  onBanChange: PropTypes.func,
};

UserList.defaultProps = {
  users: [],
  onBanChange: null,
};

function UserList(props) {
  const { users, onBanChange } = props;

  function handleClick(e) {
    e.preventDefault();
    if (onBanChange) onBanChange(e.target.dataset.user, e.target.value);
  }

  return (
    <ul className="container">
      {users.map((user) => (
        <div key={user.user_id}>
          <div className="d-flex justify-content-between">
            <UserInfo user={user} />
            <div className="mr-auto">
              <input
                type="button"
                value={user.status === "active" ? "Active" : "Banned"}
                data-user={user.user_id}
                onClick={handleClick}
                className="px-2 btn mx-1 btn-primary"
              />
            </div>
          </div>
          <hr />
        </div>
      ))}
    </ul>
  );
}

function UserInfo(props) {
  const { user } = props;

  return (
    <div>
      <p>
        Tài khoản:{" "}
        {user.role === "jobseeker"
          ? "Nguời tìm việc"
          : user.role === "admin"
          ? "Admin"
          : "Nhà tuyển dụng"}
      </p>
      <p>Tên: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>SĐT: {user.phonenumber}</p>
      <p>Đại chỉ: {user.address}</p>
      <p>
        {user.role !== "admin" && (
          <Link
            className="text-decoration-none"
            to={`/admin/user/${user.user_id}`}
          >
            Xem chi tiết
          </Link>
        )}
      </p>
    </div>
  );
}

export default UserList;
