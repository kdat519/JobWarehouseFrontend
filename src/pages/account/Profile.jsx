import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as yup from "yup";
import adminApi from "../../api/adminApi";
import adminReportApi from "../../api/adminReportApi";
import authApi from "../../api/authApi";
import { readJobsGuest } from "../../api/jobApi";
import { Role, useAuth } from "../../components/auth/AuthProvider";
import CardRecruit from "../../components/CardRecruitment";
import AdminNavBar from "../../components/navbar/AdminNavBar";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import NavBar from "../../components/navbar/NavBar";
import { fireErrorMessage } from "../../components/swal-error-message";
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
    <>
      <header className="mb-5">
        {(() => {
          switch (auth.role) {
            case Role.Employer:
              return <EmployerNavBar />;
            case Role.Admin:
              return <AdminNavBar />;
            default:
              return <NavBar />;
          }
        })()}
      </header>
      <main className="container mt-5">
        {user?.role && user?.role !== "admin" && (
          <div id="profile">
            <div>
              <div className="box border rounded-3 py-4 px-4 mb-5">
                <div className="rounded-circle mb-5 profile-avatar border">
                  <img src={authApi.imageURL(user.user_id)} alt="avatar" />
                </div>
                <p className="h2" id="name-in-block">{user.name}</p>
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
                <p className="h6  mb-4 text-nowrap">
                  <i className="bi bi-envelope"> </i>
                  {user.email}
                </p>
                <p className="h6 mb-4 text-nowrap">
                  <i className="bi bi-telephone"> </i>
                  {user.phonenumber}
                </p>
              </div>
            </div>

            <div className="info px-5">
              <p className="h2 attr-not-in-block">{user.name}</p>
              <p className="mb-5 attr-not-in-block">
                Tham gia năm {new Date(user.created_at).getFullYear()}
              </p>

              <div>
                {user.role === "employer" && (
                  <div>
                    <p className="h4 ">Giới thiệu</p>
                    <p className="mb-4 pre-line">{user.about_us}</p>

                    {user.num_employee && (
                      <div className="mb-4">
                        <span>
                          <i className="bi bi-person-fill mx-2"></i>
                          Số lượng nhân viên: {user.num_employee}
                        </span>
                      </div>
                    )}

                    {user.category && (
                      <div className="mb-4">
                        <span>
                          <i className="bi bi-tag-fill mx-2"></i>
                          Lĩnh vực: {user.category}
                        </span>
                      </div>
                    )}
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
                    <p className="mb-4 pre-line">{user.skill}</p>

                    {user.birthday && user.birthday !== "0000-00-00" && (
                      <div className="mb-4">
                        <i className="bi bi-server me-3"></i>
                        Ngày sinh:{" "}
                        {new Intl.DateTimeFormat("vi-VN").format(
                          new Date(user.birthday)
                        )}
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
                    {user.address && (
                      <div className="mb-4">
                        <span>
                          <i className="bi bi-house-door-fill me-3"></i>
                          Địa chỉ: {user.address}
                        </span>
                      </div>
                    )}
                    <hr />
                  </div>
                )}
              </div>

              {user.role === Role.Employer ? (
                <>
                  <ul className="nav nav-tabs" id="myTab">
                    <li className="nav-item">
                      <button
                        className="nav-link text-dark active"
                        id="reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#reviews"
                      >
                        Nhận xét
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link text-dark"
                        id="jobs-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#jobs"
                      >
                        Tin tuyển dụng
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active mt-2"
                      id="reviews"
                    >
                      <Reviews
                        auth={auth}
                        user={user}
                        handleReport={handleReport}
                        total={total}
                        writeReport={writeReport}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        register={register}
                        onSubmit={onSubmit}
                        handleCancel={handleCancel}
                        reports={reports}
                      />
                    </div>
                    <div className="tab-pane fade mt-2" id="jobs">
                      <Jobs employerId={user.employer_id} />
                    </div>
                  </div>
                </>
              ) : (
                <Reviews
                  auth={auth}
                  user={user}
                  handleReport={handleReport}
                  total={total}
                  writeReport={writeReport}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  register={register}
                  onSubmit={onSubmit}
                  handleCancel={handleCancel}
                  reports={reports}
                />
              )}
              {/* {auth.role !== "admin" && auth?.user_id !== user?.user_id && (
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
                        new Date(report?.updated_at)
                      )}
                    </span>
                  </div>
                  <p className="pre-line">{report.detail} </p>
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
              ))} */}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function Reviews({
  auth,
  user,
  handleReport,
  total,
  writeReport,
  handleSubmit,
  errors,
  register,
  onSubmit,
  handleCancel,
  reports,
}) {
  return (
    <>
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
              className={`form-control ${errors.detail ? "is-invalid" : ""}`}
              id="detail"
              name="detail"
              type="text"
              {...register("detail")}
              style={{ height: 200 }}
            />
            <div className="invalid-feedback">{errors.detail?.message}</div>
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
                new Date(report?.updated_at)
              )}
            </span>
          </div>
          <p className="pre-line">{report.detail} </p>
          <div className="fw-light h6 d-flex">
            <div className="rounded-circle mb-5 report-avatar border">
              <Link
                className="text-decoration-none text-dark "
                to={`/profile/${report.sender_id}`}
              >
                <img src={authApi.imageURL(report.sender_id)} alt="avatar" />
              </Link>
            </div>

            <div className="mx-3">
              <div className="">{report.sender_name}</div>
              <div className="fw-light text-muted">{report.sender_email}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function Jobs({ employerId }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    readJobsGuest(employerId)
      .then((response) =>
        Array.isArray(response) ? response : Promise.reject()
      )
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
      .catch(fireErrorMessage);
  }, [employerId]);

  const navigate = useNavigate();
  const handleChooseJob = (recruit) =>
    navigate(`/jobs/${recruit.recruitment.recruitment_id}`);

  return jobs.length ? (
    <>
      {jobs.map((job) => (
        <div key={job.recruitment_id} className="d-flex justify-content-center">
          <CardRecruit
            recruit={{ recruitment: job }}
            onClick={handleChooseJob}
          />
        </div>
      ))}
    </>
  ) : (
    <h6>Không có bài đăng nào</h6>
  );
}
