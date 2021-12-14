import React, { useState, useEffect } from "react";
import authApi from "../../api/authApi";
import AdminNavBar from "../../components/navbar/AdminNavBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function ProfileEmployer() {
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
      const response = await authApi.updateEmployerProfile(data);
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
    about_us: Yup.string(),
    num_employee: Yup.string(),
    category: Yup.string(),
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
  }

  return (
    <div className="card-body" style={divStyle}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group col mb-3">
          <label className=" ">Lĩnh vực</label>
          <input
            defaultValue={user.employer.category}
            name="category"
            type="text"
            {...register("category")}
            placeholder="Nhập lĩnh vực"
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.category?.message}</div>
        </div>

        <div className="form-group col mb-3">
          <label>Số lượng nhân viên</label>
          <input
            defaultValue={user.employer.num_employee}
            name="num_employee"
            type="text"
            {...register("num_employee")}
            placeholder="Nhập số lượng"
            className={`form-control ${
              errors.num_employee ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">{errors.num_employee?.message}</div>
        </div>

        <div className="form-group col mb-3">
          <label>Giới thiệu</label>
          <textarea
            defaultValue={user.employer.about_us}
            name="about_us"
            type="text"
            {...register("about_us")}
            placeholder="Nhập giới thiệu chung"
            className={`form-control ${errors.about_us ? "is-invalid" : ""}`}
            style={{height: 300}}
          />
          <div className="invalid-feedback">{errors.about_us?.message}</div>
        </div>
        <div>
          <div className="form-group mb-3">
            <button id="submit" type="submit" className="btn btn-primary">
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
      {user?.employer && (
        <div className="d-flex justify-content-between">
          <div>
            <p>
              <strong>Thông tin công ty</strong>
            </p>
            <p>Lĩnh vực: {user.employer.category}</p>
            <p>Số lượng nhân viên: {user.employer.num_employee}</p>
            <p>Giới thiệu: {user.employer.about_us}</p>
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
