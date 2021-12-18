import { useState, useEffect } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import authApi from "../../api/authApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./styles.css";

export default function Account() {
  const auth = useAuth();

  const [profile, setProfile] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await authApi.getProfile();
        if (!response.error) setProfile(response);
      } catch (error) {
        console.log("Failed to fetch profile: ", error);
      }
    }

    fetchProfile();
  }, [reload]);

  const schema = Yup.object().shape({
    new_password: Yup.string()
      .min(6, "Mật khẩu phải ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Mật khẩu không trùng nhau")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function handleChangePassword(data) {
    try {
        const response = await authApi.updatePassword(data);
        if (response.success) {
          setEditPassword(false);
          alert("Đổi mật khẩu thành công")
          console.log(data);
        }
        else {
            alert("Đổi mật khẩu thất bại")
        }
      } catch (error) {
        alert("Đổi mật khẩu thất bại")
      }
  }

  const [editPassword, setEditPassword] = useState(false);

  if (!auth.role) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mt-5">
      <div className="mb-4" id="account">
        <p className="h2 mb-2">
          <strong>Thông tin cá nhân</strong>
        </p>
        <p className="mb-5">
          <strong>{profile?.user?.name}, </strong>
          {profile?.user?.email} <span> &bull; </span>
          <Link
            to={`/profile/${profile?.user?.user_id}`}
            className="fw-bold text-dark"
          >
            Xem trang Profile
          </Link>
        </p>
        <div className="box mb-5">
          <div className="pe-3">
            {profile.user && (
              <div>
                <p className="fw-bold">Loại tài khoản</p>
                <p>
                  {profile.user.role === "jobseeker"
                    ? "Nguời tìm việc"
                    : profile.user.role === "admin"
                    ? "Admin"
                    : "Nhà tuyển dụng"}
                </p>
                <hr />
                <p className="fw-bold">Họ tên</p>
                <p>{profile.user.name}</p>
                <hr />
                <p className="fw-bold">Địa chỉ Email</p>
                <p>{profile.user.email}</p>
                <hr />
                <p className="fw-bold">Số điện thoại</p>
                <p>{profile.user.phonenumber}</p>
                <hr />
                <p className="fw-bold">Địa chỉ</p>
                <p>{profile.user.address}</p>
                <hr />
              </div>
            )}
            <JobseekerEdit
              setReload={setReload}
              reload={reload}
              profile={profile}
            />
            <EmployerEdit
              setReload={setReload}
              reload={reload}
              profile={profile}
            />
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <div className="">
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Mật khẩu</p>
                  <button
                    type="button"
                    className="btn btn-link shadow-none text-decoration-none"
                    onClick={() => {
                      setEditPassword(!editPassword);
                      setValue("new_password", "");
                      setValue("confirmPassword", "");
                      clearErrors("new_password");
                      clearErrors("confirmPassword");
                    }}
                  >
                    {editPassword ? "Hủy" : "Cập nhật"}
                  </button>
                </div>
                <div className={` ${editPassword ? "" : "hidden"}`}>
                  <input
                    name="new_password"
                    type="password"
                    {...register("new_password")}
                    placeholder="Mật khẩu mới"
                    className={`form-control mb-3 ${
                      errors.new_password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback mb-3">
                    {errors.new_password?.message}
                  </div>
                  <input
                    name="c"
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Xác nhận mật khẩu mới"
                    className={`form-control mb-3 ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback mb-3">
                    {errors.confirmPassword?.message}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                </div>
                <hr />
              </div>
            </form>
          </div>

          <div className="info">
            <div className="border border-1 rounded-3 p-4 ms-5">
              <h3 className="h2 fw-bold mb-2 mt-3">
                <i className="bi bi-lock-fill"></i>
              </h3>
              <p className="h5 fw-bold mb-3">
                Những chi tiết nào có thể chỉnh sửa?
              </p>
              <p className="mb-5">
                Không thể thay đổi những thông tin mà Job Warehouse sử dụng để
                xác minh danh tính của bạn. Bạn chỉ có thể thay đổi một số thông
                tin giới thiệu về bản thân.
              </p>
              <hr className="mb-5" />
              <h3 className="h2 fw-bold mb-2 mt-3">
                <i className="bi bi-person-badge-fill"></i>
              </h3>
              <p className="h5 fw-bold mb-3">
                Những thông tin nào sẽ được chia sẻ?
              </p>
              <p className="mb-4">
                Mọi thông tin sẽ được chia sẻ trên trang Profile cá nhân của
                bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobseekerEdit({ reload, setReload, profile }) {
  async function handleSave(data) {
    try {
      const response = await authApi.updateJobSeekerProfile(data);
      if (response.success) {
        setReload(!reload);
        setEditEducation(false);
        setEditSkill(false);
        setEditWorkExperience(false);
        setEditQualification(false);
      }
    } catch (error) {
      console.log("Failed to update profile: ", error);
    }
  }
  const validationSchema = Yup.object().shape({
    birthday: Yup.string().matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      "Ngày không hợp lệ: YYYY-MM-DD. Ví dụ: 1990-07-23"
    ),
    gender: Yup.string(),
    qualification: Yup.string().max(200, "Tối đa 200 ký tự"),
    work_experience: Yup.string().max(200, "Tối đa 200 ký tự"),
    skill: Yup.string().max(200, "Tối đa 200 ký tự"),
    education: Yup.string().max(200, "Tối đa 200 ký tự"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [editEducation, setEditEducation] = useState(false);
  const [editSkill, setEditSkill] = useState(false);
  const [editQualification, setEditQualification] = useState(false);
  const [editWorkExperience, setEditWorkExperience] = useState(false);
  return (
    <div>
      {profile?.jobseeker && (
        <div>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Giới thiệu</p>
                <button
                  type="button"
                  className="btn btn-link shadow-none text-decoration-none"
                  onClick={() => {
                    setEditSkill(!editSkill);
                    setValue("skill", profile.jobseeker.skill);
                    clearErrors("skill");
                  }}
                >
                  {editSkill ? "Hủy" : "Sửa"}
                </button>
              </div>
              <div className={` ${editSkill ? "" : "hidden"}`}>
                <textarea
                  defaultValue={profile.jobseeker.skill}
                  name="skill"
                  type="text"
                  {...register("skill")}
                  placeholder=""
                  className={`form-control mb-3 ${
                    errors.skill ? "is-invalid" : ""
                  }`}
                  style={{ height: 300 }}
                />
                <div className="invalid-feedback mb-3">
                  {errors.skill?.message}
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
              <div className={`me-5 ${!editSkill ? "" : "hidden"}`}>
                {profile.jobseeker.skill
                  ? profile.jobseeker.skill
                  : "Không có thông tin"}
              </div>
              <hr />
            </div>

            <div className="">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Giáo dục</p>
                <button
                  type="button"
                  className="btn btn-link shadow-none text-decoration-none"
                  onClick={() => {
                    setEditEducation(!editEducation);
                    setValue("education", profile.jobseeker.education);
                    clearErrors("education");
                  }}
                >
                  {editEducation ? "Hủy" : "Sửa"}
                </button>
              </div>
              <div className={`${editEducation ? "" : "hidden"}`}>
                <input
                  defaultValue={profile.jobseeker.education}
                  name="education"
                  type="text"
                  {...register("education")}
                  placeholder=""
                  className={`form-control mb-3 ${
                    errors.education ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback mb-3">
                  {errors.education?.message}
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
              <div className={`me-5 ${!editEducation ? "" : "hidden"}`}>
                {profile.jobseeker.education
                  ? profile.jobseeker.education
                  : "Không có thông tin"}
              </div>
              <hr />
            </div>

            <div className="">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Chứng chỉ</p>
                <button
                  type="button"
                  className="btn btn-link shadow-none text-decoration-none"
                  onClick={() => {
                    setEditQualification(!editQualification);
                    setValue("qualification", profile.jobseeker.qualification);
                    clearErrors("qualification");
                  }}
                >
                  {editQualification ? "Hủy" : "Sửa"}
                </button>
              </div>
              <div className={`${editQualification ? "" : "hidden"}`}>
                <input
                  defaultValue={profile.jobseeker.qualification}
                  name="qualification"
                  type="text"
                  {...register("qualification")}
                  placeholder=""
                  className={`form-control mb-3 ${
                    errors.qualification ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback mb-3">
                  {errors.qualification?.message}
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
              <div className={`me-5 ${!editQualification ? "" : "hidden"}`}>
                {profile.jobseeker.qualification
                  ? profile.jobseeker.qualification
                  : "Không có thông tin"}
              </div>
              <hr />
            </div>

            <div className="">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Kinh nghiệm làm việc</p>
                <button
                  type="button"
                  className="btn btn-link shadow-none text-decoration-none"
                  onClick={() => {
                    setEditWorkExperience(!editWorkExperience);
                    setValue(
                      "work_experience",
                      profile.jobseeker.work_experience
                    );
                    clearErrors("work_experience");
                  }}
                >
                  {editWorkExperience ? "Hủy" : "Sửa"}
                </button>
              </div>
              <div className={`${editWorkExperience ? "" : "hidden"}`}>
                <input
                  defaultValue={profile.jobseeker.work_experience}
                  name="work_experience"
                  type="text"
                  {...register("work_experience")}
                  placeholder=""
                  className={`form-control mb-3 ${
                    errors.work_experience ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback mb-3">
                  {errors.work_experience?.message}
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
              <div className={`me-5 ${!editWorkExperience ? "" : "hidden"}`}>
                {profile.jobseeker.work_experience
                  ? profile.jobseeker.work_experience
                  : "Không có thông tin"}
              </div>
              <hr />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function EmployerEdit({ reload, setReload, profile }) {
  async function handleSave(data) {
    try {
      const response = await authApi.updateEmployerProfile(data);
      if (response.success) {
        setReload(!reload);
        setEditCategory(false);
        setEditAboutUs(false);
        setEditNumEmployee(false);
      }
    } catch (error) {
      console.log("Failed to update profile: ", error);
    }
  }
  const validationSchema = Yup.object().shape({
    num_employee: Yup.number()
      .integer()
      .typeError("Số lượng phải là số nguyên"),
    about_us: Yup.string().max(200, "Tối đa 200 ký tự"),
    category: Yup.string().max(200, "Tối đa 200 ký tự"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [editCategory, setEditCategory] = useState(false);
  const [editAboutUs, setEditAboutUs] = useState(false);
  const [editNumEmployee, setEditNumEmployee] = useState(false);
  return (
    <div>
      {profile?.employer && (
        <div>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Giới thiệu</p>
                <button
                  type="button"
                  className="btn btn-link shadow-none text-decoration-none"
                  onClick={() => {
                    setEditAboutUs(!editAboutUs);
                    setValue("about_us", profile.employer.about_us);
                    clearErrors("about_us");
                  }}
                >
                  {editAboutUs ? "Hủy" : "Sửa"}
                </button>
              </div>
              <div className={` ${editAboutUs ? "" : "hidden"}`}>
                <textarea
                  defaultValue={profile.employer.about_us}
                  name="about_us"
                  type="text"
                  {...register("about_us")}
                  placeholder=""
                  className={`form-control mb-3 ${
                    errors.about_us ? "is-invalid" : ""
                  }`}
                  style={{ height: 300 }}
                />
                <div className="invalid-feedback mb-3">
                  {errors.about_us?.message}
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
              <div className={`me-5 ${!editAboutUs ? "" : "hidden"}`}>
                {profile.employer.about_us
                  ? profile.employer.about_us
                  : "Không có thông tin"}
              </div>
              <hr />
            </div>

            <div className="">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Lĩnh vực</p>
                <button
                  type="button"
                  className="btn btn-link shadow-none text-decoration-none"
                  onClick={() => {
                    setEditCategory(!editCategory);
                    setValue("category", profile.employer.category);
                    clearErrors("category");
                  }}
                >
                  {editCategory ? "Hủy" : "Sửa"}
                </button>
              </div>
              <div className={`${editCategory ? "" : "hidden"}`}>
                <input
                  defaultValue={profile.employer.category}
                  name="category"
                  type="text"
                  {...register("category")}
                  placeholder=""
                  className={`form-control mb-3 ${
                    errors.category ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback mb-3">
                  {errors.category?.message}
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
              <div className={`me-5 ${!editCategory ? "" : "hidden"}`}>
                {profile.employer.category
                  ? profile.employer.category
                  : "Không có thông tin"}
              </div>
              <hr />
            </div>

            <div className="">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Số lượng nhân viên</p>
                <button
                  type="button"
                  className="btn btn-link shadow-none text-decoration-none"
                  onClick={() => {
                    setEditNumEmployee(!editNumEmployee);
                    setValue("num_employee", profile.employer.num_employee);
                    clearErrors("num_employee");
                  }}
                >
                  {editNumEmployee ? "Hủy" : "Sửa"}
                </button>
              </div>
              <div className={`${editNumEmployee ? "" : "hidden"}`}>
                <input
                  defaultValue={profile.employer.num_employee}
                  name="num_employee"
                  type="text"
                  {...register("num_employee")}
                  placeholder=""
                  className={`form-control mb-3 ${
                    errors.num_employee ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback mb-3">
                  {errors.num_employee?.message}
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
              <div className={`me-5 ${!editNumEmployee ? "" : "hidden"}`}>
                {profile.employer.num_employee
                  ? profile.employer.num_employee
                  : "Không có thông tin"}
              </div>
              <hr />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
