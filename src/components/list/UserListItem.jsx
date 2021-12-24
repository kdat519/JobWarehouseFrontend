import { Link } from "react-router-dom";

export default function UserListItem({ user, handleBanChange }) {
  return (
    <div className="d-flex justify-content-between my-3 p-3 border border-1 rounded-3">
      <div>
        <p className="fw-bolder">
          {user.role === "jobseeker"
            ? "Người tìm việc"
            : user.role === "admin"
            ? "Admin"
            : "Nhà tuyển dụng"}
        </p>
        <p>Tên: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>SĐT: {user.phonenumber}</p>
        <p>
          {user.role !== "admin" && (
            <Link
              className="text-decoration-none"
              to={`/admin/users/${user.user_id}`}
            >
              Xem chi tiết
            </Link>
          )}
        </p>
      </div>

      <div className="mr-auto">
        {user.role !== "admin" && (
          <input
            type="button"
            value={user.status === "active" ? "Active" : "Banned"}
            data-user={user.user_id}
            onClick={(e) =>
              handleBanChange(e.target.dataset.user, e.target.value)
            }
            className={`px-2 btn mx-1 ${
              user.status === "active" ? "btn-success" : "btn-danger"
            }`}
          />
        )}
      </div>
    </div>
  );
}
