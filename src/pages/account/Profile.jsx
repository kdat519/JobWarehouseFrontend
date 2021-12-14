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
    detail: yup.string().required("Nhập báo cáo").max(200, "Tối đa 200 ký tự"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const auth = useAuth();
  const navigate = useNavigate();
  function handleReport(e) {
    e.preventDefault();
    if (!auth.role || auth.role === "admin") navigate("/login");
    else setWriteReport(!writeReport);
  }
  function handleCancel() {
    setWriteReport(false);
  }

  async function onSubmit(data) {
    try {
      data.receiver_id = userId;
      const response = await adminReportApi.creatReport(data);
      if (response.success) {
        setWriteReport(false);
        setReload(!reload);
      }
    } catch (error) {
      console.log("Failed to update profile: ", error);
    }
  }

  return (
    <div className="container mt-5">
      <div id="profile">
        <div>
          <div className="box border border-1 rounded-3 py-4 px-4 mb-5">
            <img
              className="rounded-circle mb-5 profile-avatar"
              src={`https://i.pravatar.cc/150?img=${user.user_id}`}
              alt="avatar"
            />
            <p className="h5 fw-bold mb-3">
              {user.role === "jobseeker"
                ? "Người tìm việc"
                : user.role === "admin"
                ? "Admin"
                : "Nhà tuyển dụng"}
            </p>
            <p className="h5 fw-bold mb-4">{total} báo cáo</p>
            <hr />
            <p className="h4 fw-bold mb-4">Thông tin liên hệ</p>
            <p className="h6  mb-4">{user.email}</p>
            <p className="h6 mb-4">{user.phonenumber}</p>
          </div>
        </div>

        <div className="info px-5">
          <p className="h2 fw-bold">{user.name}</p>
          <p className="mb-5">
            Tham gia năm {new Date(user.created_at).getFullYear()}
          </p>

          <div>
            {user.role === "employer" && (
              <div>
                <p className="h4 fw-bold">Giới thiệu</p>
                <p className="mb-4">{user.about_us}</p>
                <div className="mb-4">
                  <i className="bi bi-house-door-fill mx-1"></i>
                  {user.address}
                </div>
                <hr />
              </div>
            )}
          </div>

          <div>
            {user.role === "jobseeker" && (
              <div>
                <p className="h4 fw-bold">Giới thiệu</p>
                <p className="mb-4">{user.skill}</p>
                <div className="mb-3">
                  <i className="bi bi-book-fill mx-1"></i>
                  {user.education}
                </div>
                <div className="mb-3">
                  <i className="bi bi-person-badge-fill mx-1"></i>
                  {user.qualification}
                </div>
                <div className="mb-4">
                  <i className="bi bi-briefcase-fill mx-1"></i>
                  {user.work_experience}
                </div>
                <hr />
              </div>
            )}
          </div>

          <p className="fw-bold mb-4">
            <a href="" className="text-dark me-2" onClick={handleReport}>
              Báo cáo tài khoản
            </a>
            {total}
          </p>

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
                  style={{ height: 300 }}
                />
                <div className="invalid-feedback">{errors.detail?.message}</div>
              </div>
              <div>
                <button className="btn btn-primary mt-2 me-2" type="submit">
                  Báo cáo
                </button>
                <button className="btn btn-secondary mt-2" type="button" onClick={handleCancel}>
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
                <Link
                  className="text-decoration-none text-dark "
                  to={`/profile/${report.sender_id}`}
                >
                  <img
                    className="rounded-circle mb-5 report-avatar"
                    src={`https://i.pravatar.cc/150?img=${report.sender_id}`}
                    alt="avatar"
                  />
                </Link>
                <div className="mx-3">
                  <div className="fw-bold">{report.sender_name}</div>
                  <div className="fw-light text-muted">
                    {report.sender_email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserListItem({ user }) {
  return (
    <div id="profile">
      <div className="box border border-1 rounded-3 py-4 px-4 mb-5">
        <img
          className="rounded-circle mb-5"
          src="https://i.pravatar.cc/300"
          alt="avatar"
        />
        <p className="h5 fw-bold mb-3">
          {user.role === "jobseeker"
            ? "Người tìm việc"
            : user.role === "admin"
            ? "Admin"
            : "Nhà tuyển dụng"}
        </p>
        <p className="h5 fw-bold mb-4">100 báo cáo</p>
        <hr />
        <p className="h4 fw-bold mb-4">Thông tin liên hệ</p>
        <p className="h6  mb-4">{user.email}</p>
        <p className="h6 mb-4">{user.phonenumber}</p>
      </div>
      <div className="info px-5">
        <p className="h2 fw-bold">{user.name}</p>
        <p className="mb-5">
          Tham gia năm {new Date(Date.parse(user.created_at)).getFullYear()}
        </p>

        <div>
          {user.role === "employer" && (
            <div>
              <p className="h4 fw-bold">Giới thiệu</p>
              <p className="mb-4">{user.about_us}</p>
              <div className="mb-4">
                <i className="bi bi-house-door-fill mx-1"></i>
                {user.address}
              </div>
              <hr />
            </div>
          )}
        </div>

        <div>
          {user.role === "jobseeker" && (
            <div>
              <p className="h4 fw-bold">Giới thiệu</p>
              <p className="mb-4">{user.skill}</p>
              <div className="mb-3">
                <i className="bi bi-book-fill mx-1"></i>
                {user.education}
              </div>
              <div className="mb-3">
                <i className="bi bi-person-badge-fill mx-1"></i>
                {user.qualification}
              </div>
              <div className="mb-4">
                <i className="bi bi-briefcase-fill mx-1"></i>
                {user.work_experience}
              </div>
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
