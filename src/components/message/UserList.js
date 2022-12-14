import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import authApi from "../../api/authApi";
import messageAPI from "../../api/messageAPI";

UserList.propTypes = {
  user: PropTypes.object,
  handleClickUserList: PropTypes.func,
};

UserList.defaultProps = {
  user: null,
  handleClickUserList: null,
};

function UserList(props) {
  const { user, active, handleClickUserList } = props;
  const { other_id, name, email, user_id } = user;
  const [unSeen, setUnSeen] = useState("seen");

  useEffect(() => {
    async function CountUnseen() {
      const params = { other_id: other_id, status: "unseen" };
      if (other_id) {
        try {
          const response = await messageAPI.checkUnseen(params);
          if (response.data > 0) {
            setUnSeen("unseen");
          } else {
            setUnSeen("seen");
          }
        } catch (error) {}
      }
    }

    CountUnseen();
  }, [other_id, user]);

  function getImage() {
    if (other_id) return authApi.imageURL(other_id);
    else return authApi.imageURL(user_id);
  }

  function handleOnClick() {
    if (other_id) {
      handleClickUserList(other_id, name, email);
      setUnSeen("seen");
    } else handleClickUserList(user_id, name, email);
  }

  return (
    <div
      className={`row ${active && "bg-light-darker rounded-start "} ${
        unSeen === "unseen" && "bg-primary text-light"
      }
       py-3 align-items-center`}
      onClick={handleOnClick}
      style={{ cursor: "pointer" }}
    >
      <div className="col-10 col-md-2 pe-0">
        <img className="rounded-circle w-100" src={getImage()} alt="avatar" />
      </div>
      <div className="d-none d-md-block col-10">
        <div className="text-truncate">{name}</div>
        <div
          className={
            "text-truncate text-" + (unSeen === "unseen" ? "light" : "muted")
          }
        >
          {email}
        </div>
      </div>
    </div>
  );
}

export default UserList;
