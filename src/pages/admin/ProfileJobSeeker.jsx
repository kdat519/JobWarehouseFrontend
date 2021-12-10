import React, { useState, useEffect } from "react";
import authApi from "../../api/authApi";
import AdminNavBar from "../../components/navbar/AdminNavBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function ProfileJobSeeker() {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await authApi.getProfile();
        if (!response.error) setUser(response);
      } catch (error) {
        console.log("Failed to fetch profile: ", error);
      }
    }

    fetchUser();
  }, [isEdit]);

  function handleEdit() {
    setIsEdit(true);
  }

  function handleCancel() {
    setIsEdit(false);
  }

  async function handleSave(data) {
    try {
      const response = await authApi.updateJobSeekerProfile(data);
      if (response.success) {
        setIsEdit(false);
      }
    } catch (error) {
      console.log("Failed to update profile: ", error);
    }
  }

  return (
    <div>
      <header className="mb-5">
        <AdminNavBar />
      </header>
      <div className="container">
        <h6 className="display-6">Tài khoản của tôi</h6>
        <hr />
        {!isEdit && (
          <div>
            <ViewProfile user={user} handleClick={handleEdit} />
          </div>
        )}
        {isEdit && (
          <div>
            <EditProfile
              user={user}
              handleCancel={handleCancel}
              handleSave={handleSave}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function EditProfile({ user, handleCancel, handleSave }) {
  const validationSchema = Yup.object().shape({
    birthday: Yup.string().matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      "Ngày không hợp lệ: YYYY-MM-DD. Ví dụ: 1990-07-23"
    ),
    gender: Yup.string(),
    qualification: Yup.string(),
    work_experience: Yup.string(),
    skill: Yup.string(),
    education: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    handleSave(data);
  };

  const divStyle = {
    width: " 100%",
    maxWidth: "800px",
  };

  return (
    <div className="card-body" style={divStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group col mb-3">
          <label className=" ">Ngày sinh</label>
          <input
            defaultValue={user.jobseeker.birthday}
            name="birthday"
            type="text"
            {...register("birthday")}
            placeholder="Nhập ngày sinh YYYY-MM-DD"
            className={`form-control ${errors.birthday ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.birthday?.message}</div>
        </div>

        <div className="form-group col mb-3">
          <label>Giới tính </label>
          {user.jobseeker.gender === "female" && (
            <select {...register("gender")} class="form-control">
              <option value="female">Nữ</option>
              <option value="male">Nam</option>
            </select>
          )}
          {user.jobseeker.gender === "male" && (
            <select {...register("gender")} class="form-control">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          )}
          {!user.jobseeker.gender && (
            <select {...register("gender")} class="form-control">
              <option value="" hidden>
                Chọn giới tính
              </option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          )}

          <div className="invalid-feedback">{errors.gender?.message}</div>
        </div>

        <div className="form-group col mb-3">
          <label className=" ">Chứng chỉ</label>
          <input
            defaultValue={user.jobseeker.qualification}
            name="qualification"
            type="text"
            {...register("qualification")}
            placeholder="Nhập chứng chỉ"
            className={`form-control ${
              errors.qualification ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.qualification?.message}
          </div>
        </div>

        <div className="form-group col mb-3">
          <label>Giáo dục</label>
          <input
            defaultValue={user.jobseeker.education}
            name="education"
            type="text"
            {...register("education")}
            placeholder="Mô tả kinh nghiệm làm việc"
            className={`form-control ${errors.education ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.education?.message}</div>
        </div>

        <div className="form-group col mb-3">
          <label>Kinh nghiệm làm việc</label>
          <input
            defaultValue={user.jobseeker.work_experience}
            name="work_experience"
            type="text"
            {...register("work_experience")}
            placeholder="Mô tả kinh nghiệm làm việc"
            className={`form-control ${
              errors.work_experience ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.work_experience?.message}
          </div>
        </div>

        <div className="form-group col mb-3">
          <label>Kĩ năng</label>
          <textarea
            defaultValue={user.jobseeker.skill}
            name="skill"
            type="text"
            {...register("skill")}
            placeholder="Mô tả kỹ năng"
            className={`form-control ${errors.skill ? "is-invalid" : ""}`}
            style={{ height: 150 }}
          />
          <div className="invalid-feedback">{errors.skill?.message}</div>
        </div>

        <div>
          <div className="form-group mb-3">
            <button id="submit" type="submit" className="btn btn-primary mr-1">
              Cập nhật
            </button>
          </div>
          <div className="form-group">
            <button
              id="cancel"
              type="button"
              className="btn btn-secondary mr-1"
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ViewProfile({ user, handleClick }) {
  return (
    <div>
      {user?.jobseeker && (
        <div className="d-flex justify-content-between">
          <div>
            <p>
              <strong>Thông tin cá nhân</strong>
            </p>
            <p>
              Giới tính:{" "}
              {!user.jobseeker.gender
                ? ""
                : user.jobseeker.gender === "male"
                ? "Nam"
                : "Nữ"}
            </p>
            <p>Ngày sinh: {user.jobseeker.birthday}</p>
            <p>Bằng cấp: {user.jobseeker.qualification}</p>
            <p>Giáo dục: {user.jobseeker.education}</p>
            <p>Kinh nghiệp làm việc: {user.jobseeker.work_experience}</p>
            <p>Kĩ năng: {user.jobseeker.skill}</p>
          </div>
          <div className="mr-auto">
            <input
              type="button"
              value="Chỉnh sửa"
              onClick={handleClick}
              className="px-2 btn mx-1 btn-primary"
            />
          </div>
        </div>
      )}
      {user?.user && (
        <div>
          <div>
            <hr />
            <div>
              <p>
                <strong>Thông tin tài khoản</strong>
              </p>
              <p>
                Tài khoản:{" "}
                {user.user.role === "jobseeker"
                  ? "Nguời tìm việc"
                  : user.user.role === "admin"
                  ? "Admin"
                  : "Nhà tuyển dụng"}
              </p>
              <p>Tên: {user.user.name}</p>
              <p>Email: {user.user.email}</p>
              <p>SĐT: {user.user.phonenumber}</p>
              <p>Địa chỉ: {user.user.address}</p>
              <hr />
              <p>Ngày tạo: {user.user.created_at}</p>
              <p>Cập nhật lần cuối: {user.user.updated_at}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
