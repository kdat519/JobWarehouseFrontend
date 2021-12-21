import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";

export default function Login() {
  const auth = useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .min(8, "Mật khẩu phải ít nhất 8 ký tự"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";
  const onSubmit = (data) => auth.login(data, from);

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} onChange={() => auth.setLoginError("")} className="card form-login">
        <h1 className="text-center h3">Đăng nhập</h1>
        <p className="text-center fw-light mb-5">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-decoration-none">
            Đăng ký
          </Link>
        </p>
        <div className="mb-3 form-floating">
          <input
            id="email"
            name="email"
            type="text"
            {...register("email")}
            placeholder="Nhập email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <label htmlFor="email">Email</label>
          <div className="invalid-feedback">{errors.email?.message}</div>
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

        <button type="submit" className="mb-3 btn btn-primary">
          Đăng nhập
        </button>
        <div className="text-danger">{auth.loginError}</div>
      </form>
    </div>
  );
}
