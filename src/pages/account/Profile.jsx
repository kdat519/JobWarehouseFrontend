import { useState, useEffect } from "react";
import { useParams } from "react-router";
import adminApi from "../../api/adminApi";
import adminReportApi from "../../api/adminReportApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../components/auth/AuthProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";
import authApi from "../../api/authApi";

import AdminNavBar from "../../components/navbar/AdminNavBar";

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await adminApi.getUser(userId);
        if (response.success) setUser(response.data[0]);
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    }
    fetchUser();
  }, [userId]);

  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await adminReportApi.getReportsTo(userId);
        setReports(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        console.log("Failed to fetch report list: ", error);
      }
    }
    fetchReports();
  }, [userId, reload]);

  const [writeReport, setWriteReport] = useState(false);
  const schema = yup.object().shape({
    detail: yup.string().required("Nhập nhận xét").max(200, "Tối đa 200 ký tự"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const auth = useAuth();
  const navigate = useNavigate();
  function handleReport(e) {
    e.preventDefault();
    if (!auth.role) navigate("/login");
    else setWriteReport(!writeReport);
  }
  function handleCancel() {
    setWriteReport(false);
    setValue("detail", "");
    clearErrors("detail");
  }

  async function onSubmit(data) {
    try {
      data.receiver_id = userId;
      const response = await adminReportApi.creatReport(data);
      if (response.success) {
        setWriteReport(false);
        setReload(!reload);
        setValue("detail", "");
      }
    } catch (error) {
      console.log("Failed to update profile: ", error);
    }
  }
  return (
    <div>
      <AdminNavBar />
      <div className="container mt-5">
        {user?.role && user?.role !== "admin" && (
          <div id="profile">
            <div>
              <div className="box border rounded-3 py-4 px-4 mb-5">
                <div className="rounded-circle mb-5 profile-avatar border">
                  <img src={authApi.imageURL(user.user_id)} alt="avatar" />
                </div>
                <p className="h5  mb-3 ">
                  {user.role === "jobseeker"
                    ? "Người tìm việc"
                    : user.role === "admin"
                    ? "Admin"
                    : "Nhà tuyển dụng"}
                </p>
                <p className="h6  mb-3">
                  <i className="bi bi-star"></i> {total} nhận xét
                </p>
                {auth.role === "admin" && (
                  <p className="mb-4 h6">
                    <Link
                      className="text-dark "
                      to={`/admin/users/${user.user_id}`}
                    >
                      Xem trong Admin
                    </Link>
                  </p>
                )}
                <hr />
                <p className="h5  mb-4">Thông tin liên hệ</p>
                <p className="h6  mb-4 text-nowrap"><i className="bi bi-envelope"> </i>{user.email}</p>
                <p className="h6 mb-4 text-nowrap">
                  <i className="bi bi-telephone"> </i>
                  {user.phonenumber}
                </p>
              </div>
            </div>

            <div className="info px-5">
              <p className="h2 ">{user.name}</p>
              <p className="mb-5">
                Tham gia năm {new Date(user.created_at).getFullYear()}
              </p>

              <div>
                {user.role === "employer" && (
                  <div>
                    <p className="h4 ">Giới thiệu</p>
                    <p className="mb-4">{user.about_us}</p>

                    {user.address && (
                      <div className="mb-4">
                        <span>
                          <i className="bi bi-house-door-fill mx-2"></i>
                          Địa chỉ: {user.address}
                        </span>
                      </div>
                    )}

                    <hr />
                  </div>
                )}
              </div>

              <div>
                {user.role === "jobseeker" && (
                  <div>
                    <p className="h4 ">Giới thiệu</p>
                    <p className="mb-4">{user.skill}</p>

                    {user.birthday && user.birthday !== "0000-00-00" && (
                      <div className="mb-4">
                        <i className="bi bi-server me-3"></i>
                        Ngày sinh:{" "}
                        {new Intl.DateTimeFormat("vi-VN").format(
                          new Date(user.birthday)
                        )}
                      </div>
                    )}

                    {user.address && (
                      <div className="mb-4">
                        <span>
                          <i className="bi bi-house-door-fill me-3"></i>
                          Địa chỉ: {user.address}
                        </span>
                      </div>
                    )}

                    {user.education && (
                      <div className="mb-3">
                        <i className="bi bi-book-fill me-3"></i>
                        Giáo dục: {user.education}
                      </div>
                    )}

                    {user.qualification && (
                      <div className="mb-3">
                        <i className="bi bi-person-badge-fill me-3"></i>
                        Chứng chỉ: {user.qualification}
                      </div>
                    )}

                    {user.work_experience && (
                      <div className="mb-4">
                        <i className="bi bi-briefcase-fill me-3"></i>
                        Kinh nghiệm làm việc: {user.work_experience}
                      </div>
                    )}
                    <hr />
                  </div>
                )}
              </div>

              {auth.role !== "admin" && auth?.user_id !== user?.user_id && (
                <div>
                  <p className=" mb-4 d-flex align-items-center">
                    <button
                      className="p-0 text-dark me-2 shadow-none btn btn-link "
                      onClick={handleReport}
                    >
                      Nhận xét về tài khoản
                    </button>
                    <span className="">{total}</span>
                  </p>
                </div>
              )}

              {auth.role === "admin" && auth?.user_id !== user?.user_id && (
                <p className=" mb-4">
                  <span className="text-dark me-2">Nhận xét về tài khoản</span>
                  <span className="">{total}</span>
                </p>
              )}

              {writeReport && (
                <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="">
                    <textarea
                      className={`form-control ${
                        errors.detail ? "is-invalid" : ""
                      }`}
                      id="detail"
                      name="detail"
                      type="text"
                      {...register("detail")}
                      style={{ height: 200 }}
                    />
                    <div className="invalid-feedback">
                      {errors.detail?.message}
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary mt-2 me-2" type="submit">
                      Nhận xét
                    </button>
                    <button
                      className="btn btn-secondary mt-2"
                      type="button"
                      onClick={handleCancel}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </form>
              )}

              {reports.map((report, index) => (
                <div key={index} className="mb-1">
                  <div className="mb-2">
                    <span>
                      {new Intl.DateTimeFormat("vi-VN").format(
                        new Date(report.created_at)
                      )}
                    </span>
                  </div>
                  <p className="">{report.detail} </p>
                  <div className="fw-light h6 d-flex">
                    <div className="rounded-circle mb-5 report-avatar border">
                      <Link
                        className="text-decoration-none text-dark "
                        to={`/profile/${report.sender_id}`}
                      >
                        <img
                          src={authApi.imageURL(report.sender_id)}
                          alt="avatar"
                        />
                      </Link>
                    </div>

                    <div className="mx-3">
                      <div className="">{report.sender_name}</div>
                      <div className="fw-light text-muted">
                        {report.sender_email}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
