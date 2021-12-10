import React, { useState, useEffect } from "react";
import adminApi from "../../api/adminApi";
import AdminNavBar from "../../components/navbar/AdminNavBar";
import { useParams } from "react-router";


export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await adminApi.getUser(userId);
        if (!response.error) setUser(response[0]);
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    }

    fetchUser();
  }, [userId]);

  async function handleBanChange(id, status) {
    let response;

    if (status === "Active") response = await adminApi.banUser(id);
    else response = await adminApi.unbanUser(id);

    if (response.success) {
      let newUser = {...user};

      if (user.status === "active") newUser.status = "banned";
      else newUser.status = "active";
      setUser(newUser);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    handleBanChange(e.target.dataset.user, e.target.value);
  }

  return (
    <div>
      <header className="mb-5">
        <AdminNavBar />
      </header>
      <div className="container">
        <h6 className="display-6">Thông tin tài khoản</h6>
        <hr />
        {user && (
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <p>
                  Tài khoản:{" "}
                  {user.role === "jobseeker"
                    ? "Nguời tìm việc"
                    : "Nhà tuyển dụng"}
                </p>
                <p>Tên: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>SĐT: {user.phonenumber}</p>
                <p>Địa chỉ: {user.address}</p>
              </div>

              <div className="mr-auto">
                <input
                  type="button"
                  value={user.status === "active" ? "Active" : "Banned"}
                  data-user={user.user_id}
                  onClick={handleClick}
                  className={`px-2 btn mx-1 ${user.status === "active" ? 'btn-success' : 'btn-danger'}`}
                />
              </div>
            </div>
            <hr />
            <p>Giới tính: {user.gender === 'male' ? "Nam" : "Nữ"}</p>
            <p>Ngày sinh: {user.birthday}</p>
            <hr />
            <p>Bằng cấp: {user.qualification}</p>
            <p>Giáo dục: {user.education}</p>
            <p>Kĩ năng: {user.skill}</p>
            <p>Kinh nghiệp làm việc: {user.work_experience}</p>
            <hr />
            <p>Ngày tạo: {user.created_at}</p>
            <p>Cập nhật lần cuối: {user.updated_at}</p>
          </div>
        )}
      </div>
    </div>
  );
}
