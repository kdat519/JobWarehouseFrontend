import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";

export default function Register() {
  const auth = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Tên là bắt buộc"),
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mật khẩu không trùng nhau")
      .required("Xác nhận mật khẩu là bắt buộc"),
    address: yup.string().required("Địa chỉ là bắt buộc"),
    phonenumber: yup.string().required("Số điện thoại là bắt buộc"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => auth.register(data);

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)} className="card form-login">
        <h1 className="text-center h3">Đăng ký</h1>
        <p className="text-center fw-light mb-5">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-decoration-none">
            Đăng nhập
          </Link>
        </p>
        <div className="mb-3 text-center">
          <label className="mx-1">
            <input
              {...register("role")}
              type="radio"
              value="jobseeker"
              defaultChecked
            />
            Tìm việc
          </label>
          <label className="mx-1">
            <input {...register("role")} type="radio" value="employer" />
            Tuyển dụng
          </label>
        </div>
        <div className="mb-3 form-floating">
          <input
            id="name"
            name="name"
            type="text"
            {...register("name")}
            placeholder="Nhập tên"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <label htmlFor="name">Tên</label>
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="mb-3 form-floating">
          <input
            id="email"
            name="email"
            type="text"
            {...register("email")}
            placeholder="Nhập email"
            className={`form-control ${
              errors.email || auth.registerError === "Email đã tồn tại" ? "is-invalid" : ""
            }`}
          />
          <label htmlFor="email">Email</label>
          <div className="invalid-feedback">
            {!errors.email && auth.registerError === "Email đã tồn tại"
              ? auth.registerError
              : errors.email?.message}
          </div>
        </div>
        <div className="mb-3 form-floating">
          <input
            id="password"
            name="password"
            type="password"
            {...register("password")}
            placeholder="Nhập mật khẩu"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <label htmlFor="password">Mật khẩu</label>
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="mb-3 form-floating">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="Nhập lại mật khẩu"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>

        <div className="mb-3 form-floating">
          <input
            id="address"
            name="address"
            type="text"
            {...register("address")}
            placeholder="Nhập địa chỉ"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
          />
          <label htmlFor="address">Địa chỉ</label>
          <div className="invalid-feedback">{errors.address?.message}</div>
        </div>

        <div className="mb-3 form-floating">
          <input
            id="phonenumber"
            name="phonenumber"
            type="text"
            {...register("phonenumber")}
            placeholder="Nhập số điện thoại"
            className={`form-control ${errors.phonenumber || auth.registerError === "Số điện thoại đã được sử dụng"  ? "is-invalid" : ""}`}
          />
          <label htmlFor="phonenumber">Số điện thoại</label>
          <div className="invalid-feedback">{!errors.phonenumber && auth.registerError === "Số điện thoại đã được sử dụng"
              ? auth.registerError
              : errors.phonenumber?.message}</div>
        </div>
        <button id="submit" type="submit" className="mb-3 btn btn-primary">
          Đăng ký
        </button>
      </form>
    </div>
  );
}
